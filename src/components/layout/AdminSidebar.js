import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Overview', path: '/admin/dashboard' },
  { label: 'Agencies', path: '/admin/agencies' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Reviews & Content', path: '/admin/content' },
  { label: 'Settings', path: '/admin/settings' },
  { label: 'Analytics', path: '/admin/analytics' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-dashboard__sidebar">
      <nav className="admin-nav">
        <div className="admin-nav__section-title">Admin Navigation</div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`admin-nav__item ${
              isActive(item.path) ? 'admin-nav__item--active' : ''
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
