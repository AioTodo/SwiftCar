import React from 'react';

const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  ...props
}) => {
  const cardClass = [
    'card',
    `card--${variant}`,
    hoverable && 'card--hoverable',
    onClick && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`card__header ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`card__body ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`card__footer ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
