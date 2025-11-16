import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingRequestsPage from './BookingRequestsPage';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

const setAgencyUser = (id = 'user-2') => {
  // ownerId user-2 corresponds to agency-1 in agencies.json
  localStorage.setItem('swiftcar_auth_user', JSON.stringify({ id, role: 'agency', email: 'a@example.com' }));
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotificationProvider>
        <AuthProvider>
          <BookingRequestsPage />
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>
  );

describe('Agency BookingRequestsPage', () => {
  beforeEach(() => {
    localStorage.clear();
    setAgencyUser();
  });

  test('lists only pending requests for the agency and approves one', async () => {
    const bookings = [
      { id: 'r-1', agencyId: 'agency-1', userId: 'u1', carId: 'car-1', pickup: '2025-01-10', dropoff: '2025-01-12', status: 'pending', totalPrice: 260 },
      { id: 'r-2', agencyId: 'agency-1', userId: 'u2', carId: 'car-2', pickup: '2025-02-01', dropoff: '2025-02-03', status: 'pending', totalPrice: 160 },
      { id: 'r-3', agencyId: 'agency-2', userId: 'u3', carId: 'car-3', pickup: '2025-03-01', dropoff: '2025-03-05', status: 'pending', totalPrice: 300 },
      { id: 'r-4', agencyId: 'agency-1', userId: 'u4', carId: 'car-1', pickup: '2025-01-15', dropoff: '2025-01-16', status: 'confirmed', totalPrice: 100 },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));

    renderPage();

    // Only r-1 and r-2 should be listed
    await waitFor(() => {
      expect(screen.getByText(/request #r-1/i)).toBeInTheDocument();
      expect(screen.getByText(/request #r-2/i)).toBeInTheDocument();
      expect(screen.queryByText(/request #r-3/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/request #r-4/i)).not.toBeInTheDocument();
    });

    // Approve r-1
    const approveBtns = screen.getAllByRole('button', { name: /approve/i });
    fireEvent.click(approveBtns[0]);

    // Status updated and removed from pending list
    await waitFor(() => {
      const updated = JSON.parse(localStorage.getItem('bookings'));
      expect(updated.find(b => b.id === 'r-1').status).toBe('confirmed');
      expect(screen.queryByText(/request #r-1/i)).not.toBeInTheDocument();
    });
  });

  test('decline a request and see empty state when none left', async () => {
    const bookings = [
      { id: 'r-10', agencyId: 'agency-1', userId: 'u1', carId: 'car-1', pickup: '2025-01-10', dropoff: '2025-01-12', status: 'pending', totalPrice: 260 },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));

    renderPage();

    await waitFor(() => screen.getByText(/request #r-10/i));

    fireEvent.click(screen.getByRole('button', { name: /decline/i }));

    await waitFor(() => {
      const updated = JSON.parse(localStorage.getItem('bookings'));
      expect(updated.find(b => b.id === 'r-10').status).toBe('declined');
      expect(screen.getByText(/no pending requests/i)).toBeInTheDocument();
    });
  });
});
