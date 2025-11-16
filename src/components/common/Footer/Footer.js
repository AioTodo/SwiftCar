import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">SwiftCar</h3>
          <p className="footer__text">Empowering Local Car Rental Businesses</p>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Quick Links</h4>
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/search" className="footer__link">Search Cars</Link>
          <Link to="/about" className="footer__link">About Us</Link>
          <Link to="/help" className="footer__link">Help Center</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">For Agencies</h4>
          <Link to="/agency/register" className="footer__link">Become a Provider</Link>
          <Link to="/agency/dashboard" className="footer__link">Agency Dashboard</Link>
        </div>

        <div className="footer__section">
          <p className="footer__copyright">
            © {new Date().getFullYear()} SwiftCar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
