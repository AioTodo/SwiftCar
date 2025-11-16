import React from 'react';
import { Button as MantineButton } from '@mantine/core';

// Mantine-based Button wrapper that preserves the existing Button API
// while delegating visual styling to the Mantine theme.
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || loading;

  // Map legacy variants to Mantine variants/colors
  let mantineVariant = 'filled';
  let color = 'brand';

  if (variant === 'outline') {
    mantineVariant = 'outline';
  } else if (variant === 'text') {
    mantineVariant = 'subtle';
  } else if (variant === 'danger') {
    color = 'red';
  } else if (variant === 'accent') {
    mantineVariant = 'light';
  }

  const mantineSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';

  return (
    <MantineButton
      type={type}
      variant={mantineVariant}
      size={mantineSize}
      color={color}
      fullWidth={fullWidth}
      disabled={isDisabled}
      loading={loading}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
