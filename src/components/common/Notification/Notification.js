import React from 'react';
import { useNotification } from '../../../context/NotificationContext';

const Notification = () => {
  const { notifications, hideNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification--${notification.type}`}
        >
          <div className="notification__content">
            <span className="notification__icon">
              {notification.type === 'success' && '✓'}
              {notification.type === 'error' && '✕'}
              {notification.type === 'warning' && '⚠'}
              {notification.type === 'info' && 'ℹ'}
            </span>
            <p className="notification__message">{notification.message}</p>
          </div>
          <button
            className="notification__close"
            onClick={() => hideNotification(notification.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
