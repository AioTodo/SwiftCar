import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AgencySidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="agency-sidebar">
      <nav className="agency-sidebar__nav">
        <div className="agency-sidebar__section-title">Agency Navigation</div>
        <Link
          to="/agency/dashboard"
          className={`agency-sidebar__link ${
            isActive('/agency/dashboard') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/agency/verification"
          className={`agency-sidebar__link ${
            isActive('/agency/verification') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Verification Status
        </Link>
        <Link
          to="/agency/add-car"
          className={`agency-sidebar__link ${
            isActive('/agency/add-car') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Add Car
        </Link>
        <Link
          to="/agency/manage-cars"
          className={`agency-sidebar__link ${
            isActive('/agency/manage-cars') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Manage Cars
        </Link>
        <Link
          to="/agency/booking-requests"
          className={`agency-sidebar__link ${
            isActive('/agency/booking-requests') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Booking Requests
        </Link>
        <Link
          to="/agency/bookings"
          className={`agency-sidebar__link ${
            isActive('/agency/bookings') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Bookings
        </Link>
        <Link
          to="/agency/earnings"
          className={`agency-sidebar__link ${
            isActive('/agency/earnings') ? 'agency-sidebar__link--active' : ''
          }`}
        >
          Earnings
        </Link>
      </nav>
    </aside>
  );
};

export default AgencySidebar;
