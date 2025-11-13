import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__brand">
          <h1 className="header__logo">
            <Link to="/">SwiftCar</Link>
          </h1>
        </div>
        <nav className="header__nav">
          <Link to="/search" className="header__link">Search Cars</Link>
          {!isAuthenticated && (
            <Link to="/login" className="header__link">Login</Link>
          )}
          {isAuthenticated && user?.role === 'customer' && (
            <Link to="/customer/dashboard" className="header__link">Dashboard</Link>
          )}
          {isAuthenticated && user?.role === 'agency' && (
            <Link to="/agency/dashboard" className="header__link">Agency</Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="header__link">Admin</Link>
          )}
          {isAuthenticated && (
            <button type="button" className="header__link header__logout" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;