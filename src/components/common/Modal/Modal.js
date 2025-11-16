import React from 'react';
import { Modal as MantineModal } from '@mantine/core';

// Mantine-based Modal wrapper that keeps the existing prop names
// (isOpen, onClose, title, size, etc.) but uses Mantine for layout
// and accessibility.
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
}) => {
  const mantineSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';

  return (
    <MantineModal
      opened={Boolean(isOpen)}
      onClose={onClose}
      title={title}
      size={mantineSize}
      withCloseButton={showCloseButton}
      closeOnClickOutside={closeOnBackdropClick}
      centered
      className={className}
    >
      {children}
    </MantineModal>
  );
};

export default Modal;
