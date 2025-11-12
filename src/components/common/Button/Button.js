import React from 'react';

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
  const buttonClass = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth && 'button--full-width',
    isDisabled && 'button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Strip non-DOM props from being spread to the button element

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  );
};

export default Button;
