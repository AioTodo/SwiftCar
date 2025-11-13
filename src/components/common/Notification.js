import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const Notification = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <div className="notification-container" aria-live="polite" aria-atomic="true">
      {notifications.map((n) => (
        <div key={n.id} className={`notification notification--${n.type}`} role="status">
          <div className="notification__message">{n.message}</div>
          <button
            type="button"
            className="notification__close"
            aria-label="Close notification"
            onClick={() => hideNotification(n.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;