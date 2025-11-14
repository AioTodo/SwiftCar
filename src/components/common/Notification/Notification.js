import React from 'react';
import { Alert, Stack } from '@mantine/core';
import { useNotification } from '../../../context/NotificationContext';

// Mantine-based notification stack rendered in the top-right corner.
const Notification = () => {
  const { notifications, hideNotification } = useNotification();

  if (notifications.length === 0) return null;

  const typeToColor = (type) => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'warning':
        return 'yellow';
      case 'info':
      default:
        return 'blue';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 2000,
        maxWidth: '360px',
      }}
    >
      <Stack gap="sm">
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            color={typeToColor(notification.type)}
            variant="filled"
            withCloseButton
            onClose={() => hideNotification(notification.id)}
          >
            {notification.message}
          </Alert>
        ))}
      </Stack>
    </div>
  );
};

export default Notification;
