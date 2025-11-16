import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usersAPI } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'customer',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      setError('Please fill out all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,
      };
      await usersAPI.create(payload);

      // Automatically log the user in with the chosen role so protected routes work immediately
      login({
        email: payload.email,
        role: payload.role,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
      });

      if (form.role === 'agency') {
        // Agency owners go straight to the agency registration flow
        navigate('/agency/register');
      } else {
        // Customers go directly to their dashboard after sign-up
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--auth">
      <div className="container">
        <div className="card auth-card">
          <h1 className="page__title">Create your account</h1>
          {error && <div className="alert alert--error">{error}</div>}
          <form onSubmit={handleSubmit} className="form grid grid--2">
            <Input label="First name" name="firstName" value={form.firstName} onChange={onChange} required />
            <Input label="Last name" name="lastName" value={form.lastName} onChange={onChange} required />
            <Input type="email" label="Email" name="email" value={form.email} onChange={onChange} required fullWidth />
            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} fullWidth />
            <Input type="password" label="Password" name="password" value={form.password} onChange={onChange} required />
            <Input type="password" label="Confirm password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required />

            <div className="form__group form__group--full">
              <label className="form__label">I am a</label>
              <div className="radio-group">
                <label className="radio">
                  <input type="radio" name="role" value="customer" checked={form.role === 'customer'} onChange={onChange} />
                  <span>Customer</span>
                </label>
                <label className="radio">
                  <input type="radio" name="role" value="agency" checked={form.role === 'agency'} onChange={onChange} />
                  <span>Agency Owner</span>
                </label>
              </div>
            </div>

            <div className="form__actions form__group--full">
              <Button type="submit" variant="primary" loading={loading} fullWidth>
                Create Account
              </Button>
            </div>
          </form>
          <p className="auth-card__switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
