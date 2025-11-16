import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { settingsService } from '../../../services/settingsService';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const settings = settingsService.getSettings();
  const showMaintenance = settings?.maintenanceMode;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1 className="header__brand">SwiftCar</h1>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/search" className="header__link">Search Cars</Link>
          <Link to="/about" className="header__link">About</Link>
          <Link to="/faq" className="header__link">FAQ</Link>
          <Link to="/help" className="header__link">Help Center</Link>
          <Link to="/contact" className="header__link">Contact</Link>
          <Link to="/agency/register" className="header__link">Become a Provider</Link>
          
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
                <Link to="/agency/dashboard" className="header__link">Agency Dashboard</Link>
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

      {showMaintenance && (
        <div className="header__maintenance-banner">
          <div className="header__maintenance-inner">
            <span className="header__maintenance-label">Maintenance</span>
            <span className="header__maintenance-text">
              {settings.maintenanceMessage}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
