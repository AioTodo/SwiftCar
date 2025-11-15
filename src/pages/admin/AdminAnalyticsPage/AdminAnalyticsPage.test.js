import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminAnalyticsPage from './AdminAnalyticsPage';

describe('AdminAnalyticsPage', () => {
  test('renders analytics heading and key panels without crashing', () => {
    render(
      <MemoryRouter initialEntries={["/admin/analytics"]}>
        <AdminAnalyticsPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /bookings by status/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /top agencies by bookings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /fleet size by agency/i })).toBeInTheDocument();
  });
});
