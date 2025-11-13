import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyBookingsPage from './MyBookingsPage';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

const setUser = (id = 'user-1') => {
  localStorage.setItem('swiftcar_auth_user', JSON.stringify({ id, role: 'customer', email: 'c@example.com' }));
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotificationProvider>
        <AuthProvider>
          <MyBookingsPage />
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>
  );

describe('MyBookingsPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('lists current user bookings and allows cancel on confirmed', async () => {
    setUser('user-1');
    const bookings = [
      {
        id: 'bk-1', userId: 'user-1', agencyId: 'a1', carId: 'car-1',
        pickup: '2025-01-10', dropoff: '2025-01-12', status: 'confirmed', totalPrice: 260,
      },
      {
        id: 'bk-2', userId: 'user-1', agencyId: 'a1', carId: 'car-2',
        pickup: '2025-02-01', dropoff: '2025-02-03', status: 'completed', totalPrice: 160,
      },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));

    renderPage();

    expect(screen.getByText(/my bookings/i)).toBeInTheDocument();
    // Both bookings visible (wait for async load)
    await waitFor(() => {
      expect(screen.getByText(/booking #bk-1/i)).toBeInTheDocument();
      expect(screen.getByText(/booking #bk-2/i)).toBeInTheDocument();
    });

    // Cancel confirmed booking
    fireEvent.click(screen.getByRole('button', { name: /cancel booking/i }));

    await waitFor(() => {
      // Should reflect cancelled status in UI
      expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
    });

    // Storage reflects cancellation
    const after = JSON.parse(localStorage.getItem('bookings'));
    expect(after.find(b => b.id === 'bk-1').status).toBe('cancelled');
  });

  test('shows empty state when no bookings', () => {
    setUser('user-9');
    renderPage();
    expect(screen.getByText(/no bookings found/i)).toBeInTheDocument();
  });
});
