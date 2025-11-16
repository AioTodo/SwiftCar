import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquareMore,
  Settings,
  BarChart3,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Agencies', path: '/admin/agencies', icon: Building2 },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Reviews & Content', path: '/admin/content', icon: MessageSquareMore },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="admin-dashboard__sidebar">
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__logo">
            {/* Simple text logo; replace with real logo if needed */}
            <span className="sidebar__logo-mark">SC</span>
            <span className="sidebar__logo-text">Admin</span>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                className={`sidebar__item ${active ? 'sidebar__item--active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="sidebar__item-icon">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="sidebar__item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <span className="sidebar__footer-text">© 2025 SwiftCar</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;