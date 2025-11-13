import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingSummary from './BookingSummary';

describe('BookingSummary', () => {
  test('computes and displays totals', () => {
    render(
      <BookingSummary
        pricePerDay={100}
        pickup="2025-01-10"
        dropoff="2025-01-15"
        extras={{ insurance: true, gps: true }}
      />
    );

    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Base')).toBeInTheDocument();
    expect(screen.getByText('Extras')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();

    // Days: 5, Base: 500, Extras: 20, Total: 520
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('520')).toBeInTheDocument();
  });
});
