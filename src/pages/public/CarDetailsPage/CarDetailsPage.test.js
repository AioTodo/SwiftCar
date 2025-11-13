import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CarDetailsPage from './CarDetailsPage';
import { AuthProvider } from '../../../context/AuthContext';
import { BookingProvider } from '../../../context/BookingContext';
import { NotificationProvider } from '../../../context/NotificationContext';

// Seed helpers
const seed = () => {
  const bookings = [
    { id: 'booking-123', carId: 'car-1', userId: 'u1', agencyId: 'a1', pickup: '2025-01-10', dropoff: '2025-01-12' },
    { id: 'booking-999', carId: 'car-2', userId: 'u2', agencyId: 'a1', pickup: '2025-02-01', dropoff: '2025-02-03' },
  ];
  const reviews = [
    { id: 'r1', bookingId: 'booking-123', rating: 5, title: 'Great ride', comment: 'Very clean car', reviewDate: '2025-01-15', verified: true },
    { id: 'r2', bookingId: 'booking-123', rating: 4, title: 'Good value', comment: 'Smooth process', reviewDate: '2025-01-16', verified: true },
    { id: 'r3', bookingId: 'booking-999', rating: 2, title: 'Bad for other car', comment: 'Irrelevant', reviewDate: '2025-01-17', verified: true },
  ];
  localStorage.setItem('bookings', JSON.stringify(bookings));
  localStorage.setItem('reviews', JSON.stringify(reviews));
};

describe('CarDetailsPage reviews integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows filtered reviews for car and computed average', () => {
    seed();

    render(
      <MemoryRouter initialEntries={["/car/car-1"]}>
        <AuthProvider>
          <NotificationProvider>
            <BookingProvider>
              <Routes>
                <Route path="/car/:carId" element={<CarDetailsPage />} />
              </Routes>
            </BookingProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Reviews for car-1 are r1 and r2 only (ratings 5 and 4 -> average 4.5)
    // Reviews section header is present (choose the first match)
    expect(screen.getAllByText(/customer reviews/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/average rating/i)).toBeInTheDocument();
    // Average rating in reviews summary is present (scope within reviews block)
    // Check count reflects only car-1 reviews
    expect(screen.getByText(/\(2 reviews\)/i)).toBeInTheDocument();

    // Review items content
    expect(screen.getByText(/great ride/i)).toBeInTheDocument();
    expect(screen.getByText(/very clean car/i)).toBeInTheDocument();
    expect(screen.getByText(/good value/i)).toBeInTheDocument();
    expect(screen.getByText(/smooth process/i)).toBeInTheDocument();

    // Should not include review from other car
    expect(screen.queryByText(/bad for other car/i)).not.toBeInTheDocument();
  });
});
