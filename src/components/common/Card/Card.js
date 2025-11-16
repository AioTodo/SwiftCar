import React from 'react';
import { Card as MantineCard } from '@mantine/core';

// Mantine-based Card wrapper. Keeps the existing Card.Header / Card.Body /
// Card.Footer API while delegating visuals to Mantine.
const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  ...props
}) => {
  const shadow = hoverable ? 'md' : 'sm';
  const withBorder = variant !== 'ghost';

  return (
    <MantineCard
      shadow={shadow}
      withBorder={withBorder}
      radius="md"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </MantineCard>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`card__header ${className}`.trim()}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`card__body ${className}`.trim()}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`card__footer ${className}`.trim()}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
