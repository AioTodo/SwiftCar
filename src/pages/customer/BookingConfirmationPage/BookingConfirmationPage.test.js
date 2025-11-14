import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from '../../../theme/mantineTheme';
import BookingConfirmationPage from './BookingConfirmationPage';

const renderWithBooking = () => {
  const bookings = [
    {
      id: 'booking-123',
      userId: 'user-1',
      agencyId: 'agency-1',
      carId: 'car-1',
      pickup: '2025-01-10',
      dropoff: '2025-01-13',
      extras: {},
      pricePerDay: 100,
      totalPrice: 320,
      status: 'confirmed',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  ];
  const cars = [
    {
      id: 'car-1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2024,
      category: 'Economy',
    },
  ];
  localStorage.setItem('bookings', JSON.stringify(bookings));
  localStorage.setItem('cars', JSON.stringify(cars));

  return render(
    <MantineProvider theme={mantineTheme}>
      <MemoryRouter initialEntries={["/booking/confirmation/booking-123"]}>
        <Routes>
          <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>
  );
};

describe('BookingConfirmationPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders confirmation details when booking exists', async () => {
    renderWithBooking();

    await waitFor(() => {
      expect(screen.getByText(/thank you for your booking/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/booking-123/i)).toBeInTheDocument();
    expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-01-10/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-01-13/i)).toBeInTheDocument();
    expect(screen.getByText(/320 MAD/)).toBeInTheDocument();
  });

  test('shows not-found message when booking is missing', async () => {
    render(
      <MantineProvider theme={mantineTheme}>
        <MemoryRouter initialEntries={["/booking/confirmation/missing-id"]}>
          <Routes>
            <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/booking not found/i)).toBeInTheDocument();
    });
  });
});
