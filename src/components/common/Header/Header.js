import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1 className="header__brand">SwiftCar</h1>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/search" className="header__link">Search Cars</Link>
          
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="header__link">Login</Link>
            </>
          ) : (
            <>
              {user?.role === 'customer' && (
                <Link to="/customer/dashboard" className="header__link">Dashboard</Link>
              )}
              {user?.role === 'agency' && (
                <Link to="/agency/dashboard" className="header__link">Dashboard</Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard" className="header__link">Admin</Link>
              )}
              <button onClick={logout} className="header__link header__link--button">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
