import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">© {new Date().getFullYear()} SwiftCar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;