import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import usersData from '../../../data/users.json';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find user in mock data
      const user = usersData.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        login({ email: user.email, role: user.role });
        
        showNotification({
          type: 'success',
          message: `Welcome back, ${user.firstName}!`,
        });
        
        // Redirect based on role
        switch (user.role) {
          case 'customer':
            navigate('/customer/dashboard');
            break;
          case 'agency':
            navigate('/agency/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        showNotification({
          type: 'error',
          message: 'Invalid email or password',
        });
        setErrors({ password: 'Invalid credentials' });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="page page--login-page">
      <div className="page__container container--narrow">
        <Card className="login-card">
          <Card.Header>
            <h1 className="login-card__title">Welcome Back</h1>
            <p className="login-card__subtitle">Log in to your SwiftCar account</p>
          </Card.Header>
          
          <Card.Body>
            <form onSubmit={handleSubmit} className="login-form">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                error={errors.email}
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
                required
              />
              
              <div className="login-form__demo">
                <p className="text-small text-muted">Demo Credentials:</p>
                <ul className="login-form__demo-list">
                  <li><strong>Customer:</strong> customer@example.com / password123</li>
                  <li><strong>Agency:</strong> agency@example.com / password123</li>
                  <li><strong>Admin:</strong> admin@swiftcar.com / admin123</li>
                </ul>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </Card.Body>
          
          <Card.Footer>
            <p className="login-card__footer-text">
              Don't have an account?{' '}
              <a href="/signup" className="login-card__link">Sign up</a>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
