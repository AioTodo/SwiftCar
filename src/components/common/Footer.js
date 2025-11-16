import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__overlay" />

      <div className="footer__container">
        {/* Contact */}
        <div className="footer__column footer__column--contact">
          <h3 className="footer__title">Contact</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              <span className="footer__contact-text">+212-000-000-000</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              <span className="footer__contact-text">
                11022 South 51st Street Suite 105
                <br />
                Casablanca, Morocco
              </span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon">✉️</span>
              <span className="footer__contact-text">support@swiftcar.app</span>
            </li>
          </ul>
        </div>

        {/* Navigate */}
        <div className="footer__column">
          <h4 className="footer__heading">Navigate</h4>
          <Link to="/search" className="footer__link">Services</Link>
          <Link to="/about" className="footer__link">Success Stories</Link>
          <Link to="/about" className="footer__link">Discover</Link>
          <Link to="/help" className="footer__link">Care</Link>
          <Link to="/contact" className="footer__link">Download App</Link>
        </div>

        {/* Solution */}
        <div className="footer__column">
          <h4 className="footer__heading">Solution</h4>
          <Link to="/contact" className="footer__link">Get in Touch</Link>
          <Link to="/about" className="footer__link">Technology</Link>
          <Link to="/about" className="footer__link">Who’re We?</Link>
          <Link to="/help" className="footer__link">Expertise</Link>
        </div>

        {/* Discover */}
        <div className="footer__column">
          <h4 className="footer__heading">Discover</h4>
          <Link to="/search" className="footer__link">Latest News</Link>
          <Link to="/search" className="footer__link">New Arrivals</Link>
          <Link to="/about" className="footer__link">Solution</Link>
          <Link to="/help" className="footer__link">Gain Profession</Link>
          <Link to="/about" className="footer__link">Career</Link>
        </div>

        {/* Follow Us */}
        <div className="footer__column">
          <h4 className="footer__heading">Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__link">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__link">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__link">
            LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer__link">
            Twitter
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__bottom-text">
          © Copyright <span className="footer__brand">SwiftCar</span>. All rights reserved. {year}
        </p>
        <div className="footer__bottom-links">
          <button type="button" className="footer__bottom-link">
            Privacy &amp; Policy
          </button>
          <button type="button" className="footer__bottom-link">
            Terms &amp; Condition
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;