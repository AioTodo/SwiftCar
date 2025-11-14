import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgencyBookingsPage from './AgencyBookingsPage';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

const setAgencyUser = (id = 'user-2') => {
  // ownerId user-2 corresponds to agency-1 in agencies.json
  localStorage.setItem('swiftcar_auth_user', JSON.stringify({ id, role: 'agency', email: 'agency@example.com' }));
};

const renderPage = (initialEntries = ['/agency/bookings']) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={initialEntries}>
      <NotificationProvider>
        <AuthProvider>
          <AgencyBookingsPage />
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>
  );

describe('AgencyBookingsPage', () => {
  beforeEach(() => {
    localStorage.clear();
    setAgencyUser();
  });

  test('lists bookings for the current agency and filters by status', async () => {
    const bookings = [
      { id: 'b-1', agencyId: 'agency-1', userId: 'u1', carId: 'car-1', pickup: '2025-01-10', dropoff: '2025-01-12', status: 'confirmed', totalPrice: 260 },
      { id: 'b-2', agencyId: 'agency-1', userId: 'u2', carId: 'car-2', pickup: '2025-02-01', dropoff: '2025-02-03', status: 'pending', totalPrice: 160 },
      { id: 'b-3', agencyId: 'agency-2', userId: 'u3', carId: 'car-3', pickup: '2025-03-01', dropoff: '2025-03-05', status: 'completed', totalPrice: 300 },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));

    renderPage();

    // Wait for bookings to load (only agency-1 ones)
    await waitFor(() => {
      expect(screen.getByText(/booking #b-1/i)).toBeInTheDocument();
      expect(screen.getByText(/booking #b-2/i)).toBeInTheDocument();
      expect(screen.queryByText(/booking #b-3/i)).not.toBeInTheDocument();
    });

    // Filter by pending
    fireEvent.click(screen.getByRole('button', { name: /pending/i }));

    await waitFor(() => {
      expect(screen.queryByText(/booking #b-1/i)).not.toBeInTheDocument();
      expect(screen.getByText(/booking #b-2/i)).toBeInTheDocument();
    });
  });

  test('cancels a confirmed booking and updates status', async () => {
    const bookings = [
      { id: 'b-10', agencyId: 'agency-1', userId: 'u1', carId: 'car-1', pickup: '2025-01-10', dropoff: '2025-01-12', status: 'confirmed', totalPrice: 260 },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));

    renderPage();

    await waitFor(() => screen.getByText(/booking #b-10/i));

    // There are multiple "Cancel"-like buttons (filter and action), so scope to the booking row
    const bookingRow = screen.getByText(/booking #b-10/i).closest('.booking-row');
    const cancelButton = within(bookingRow).getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      const updated = JSON.parse(localStorage.getItem('bookings'));
      expect(updated.find((b) => b.id === 'b-10').status).toBe('cancelled');
    });
  });
});
