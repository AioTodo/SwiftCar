import React from 'react';

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
  const inputClass = [
    'input__field',
    error && 'input__field--error',
    disabled && 'input__field--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`input ${fullWidth ? 'input--full-width' : ''} ${className}`}>
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        required={required}
      />
      
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};

export default Input;
