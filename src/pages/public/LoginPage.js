import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, role });
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'agency') navigate('/agency/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="page page--login">
      <div className="container">
        <h2 className="heading heading--h2 mb-2">Login</h2>
        <form onSubmit={onSubmit} className="form">
          <input className="input mb-1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="input mb-1" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="agency">Agency</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="button button--primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;