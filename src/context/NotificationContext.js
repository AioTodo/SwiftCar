import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((notification) => {
    const id = notification.id || `notification-${Date.now()}`;

    setNotifications((prev) => [
      ...prev,
      {
        id,
        type: notification.type || 'info',
        message: notification.message,
        duration: notification.duration || 4000,
      },
    ]);

    if (!notification.persist) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
      }, notification.duration || 4000);
    }
  }, []);

  const hideNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      showNotification,
      hideNotification,
    }),
    [notifications, showNotification, hideNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
