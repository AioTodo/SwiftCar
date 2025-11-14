import React from 'react';
import { TextInput } from '@mantine/core';

// Mantine-based Input wrapper. Uses TextInput for all field types and
// keeps the existing prop signature used across the project.
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  fullWidth = false,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      w={fullWidth ? '100%' : undefined}
      {...props}
    />
  );
};

export default Input;
