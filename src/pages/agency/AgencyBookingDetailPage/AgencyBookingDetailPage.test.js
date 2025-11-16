import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AgencyBookingDetailPage from './AgencyBookingDetailPage';
import { NotificationProvider } from '../../../context/NotificationContext';

const renderWithRoute = (bookingId) => {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[`/agency/booking/${bookingId}`]}>
      <NotificationProvider>
        <Routes>
          <Route path="/agency/booking/:bookingId" element={<AgencyBookingDetailPage />} />
        </Routes>
      </NotificationProvider>
    </MemoryRouter>
  );
};

describe('AgencyBookingDetailPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows booking, car, and customer details', async () => {
    const bookings = [
      {
        id: 'b-100',
        agencyId: 'agency-1',
        userId: 'user-1',
        carId: 'car-1',
        pickupDate: '2025-01-10',
        returnDate: '2025-01-12',
        status: 'confirmed',
        totalPrice: 260,
      },
    ];
    const cars = [
      { id: 'car-1', brand: 'Toyota', model: 'Corolla', year: 2022, licensePlate: 'ABC-123' },
    ];
    const users = [
      {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+212 600 123456',
      },
    ];

    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('cars', JSON.stringify(cars));
    localStorage.setItem('users', JSON.stringify(users));

    renderWithRoute('b-100');

    await waitFor(() => {
      expect(screen.getByText(/booking #b-100/i)).toBeInTheDocument();
      expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText('260 MAD')).toBeInTheDocument();
    });
  });

  test('allows changing status from confirmed to completed', async () => {
    const bookings = [
      {
        id: 'b-200',
        agencyId: 'agency-1',
        userId: 'user-1',
        carId: 'car-1',
        pickupDate: '2025-01-10',
        returnDate: '2025-01-12',
        status: 'confirmed',
        totalPrice: 260,
      },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('cars', JSON.stringify([]));
    localStorage.setItem('users', JSON.stringify([]));

    renderWithRoute('b-200');

    await waitFor(() => screen.getByText(/booking #b-200/i));

    fireEvent.click(screen.getByRole('button', { name: /mark as completed/i }));

    await waitFor(() => {
      const updated = JSON.parse(localStorage.getItem('bookings'));
      expect(updated.find((b) => b.id === 'b-200').status).toBe('completed');
    });
  });
});
