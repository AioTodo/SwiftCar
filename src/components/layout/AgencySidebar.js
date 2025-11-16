import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BadgeCheck,
  CarFront,
  Wrench,
  ClipboardList,
  CalendarRange,
  WalletCards,
} from 'lucide-react';

const AgencySidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="agency-sidebar">
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <span className="sidebar__logo-mark">SC</span>
            <span className="sidebar__logo-text">Agency</span>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Agency navigation">
          <Link
            to="/agency/dashboard"
            className={`sidebar__item ${isActive('/agency/dashboard') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <LayoutDashboard size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Dashboard</span>
          </Link>

          <Link
            to="/agency/verification"
            className={`sidebar__item ${isActive('/agency/verification') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <BadgeCheck size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Verification Status</span>
          </Link>

          <Link
            to="/agency/add-car"
            className={`sidebar__item ${isActive('/agency/add-car') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <CarFront size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Add Car</span>
          </Link>

          <Link
            to="/agency/manage-cars"
            className={`sidebar__item ${isActive('/agency/manage-cars') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <Wrench size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Manage Cars</span>
          </Link>

          <Link
            to="/agency/booking-requests"
            className={`sidebar__item ${isActive('/agency/booking-requests') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <ClipboardList size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Booking Requests</span>
          </Link>

          <Link
            to="/agency/bookings"
            className={`sidebar__item ${isActive('/agency/bookings') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <CalendarRange size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Bookings</span>
          </Link>

          <Link
            to="/agency/earnings"
            className={`sidebar__item ${isActive('/agency/earnings') ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">
              <WalletCards size={18} strokeWidth={1.8} />
            </span>
            <span className="sidebar__item-label">Earnings</span>
          </Link>
        </nav>

        <div className="sidebar__footer">
          <span className="sidebar__footer-text">© 2025 SwiftCar</span>
        </div>
      </div>
    </aside>
  );
};

export default AgencySidebar;