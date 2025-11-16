import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookingProcessPage from './BookingProcessPage';
import { BookingProvider, useBooking } from '../../../context/BookingContext';
import { NotificationProvider } from '../../../context/NotificationContext';
import { priceCalculator } from '../../../utils/priceCalculator';

const StartBooking = ({ car }) => {
  const { startBooking } = useBooking();
  React.useEffect(() => {
    startBooking(car);
  }, [car, startBooking]);
  return null;
};

const Wrapper = ({ children }) => (
  <NotificationProvider>
    <BookingProvider>{children}</BookingProvider>
  </NotificationProvider>
);

describe('BookingProcessPage integration', () => {
  test('shows guard when no selected car', async () => {
    render(
      <MemoryRouter>
        <Wrapper>
          <BookingProcessPage />
        </Wrapper>
      </MemoryRouter>
    );
    expect(screen.getByText(/no car selected/i)).toBeInTheDocument();
  });

  test('walks through steps and navigates to payment with correct total', async () => {
    const car = { id: 'car-1', brand: 'Toyota', model: 'Corolla', year: 2024, category: 'Economy', pricePerDay: 100 };

    render(
      <MemoryRouter initialEntries={["/customer/booking-process"]}>
        <Routes>
          <Route
            path="/customer/booking-process"
            element={
              <Wrapper>
                <StartBooking car={car} />
                <BookingProcessPage />
              </Wrapper>
            }
          />
          <Route path="/customer/payment" element={<div>Payment Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Step 1 - fill locations and dates
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { name: 'pickupLocation', value: 'NYC' } });
    fireEvent.change(screen.getByLabelText(/return location/i), { target: { name: 'returnLocation', value: 'NYC' } });
    fireEvent.change(screen.getByLabelText(/pickup date/i), { target: { name: 'pickupDate', value: '2025-01-10' } });
    fireEvent.change(screen.getByLabelText(/return date/i), { target: { name: 'returnDate', value: '2025-01-13' } });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    // Step 2 - select extras
    fireEvent.click(screen.getByRole('checkbox', { name: /full insurance coverage/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /gps navigation/i }));

    const nextBtn = screen.queryByRole('button', { name: /next/i });
    if (nextBtn) {
      fireEvent.click(nextBtn);
    }

    // Step 3 - verify summary total
    const expectedTotal = priceCalculator.totalPrice(100, '2025-01-10', '2025-01-13', { insurance: true, gps: true });
    expect(screen.getByText(String(expectedTotal))).toBeInTheDocument();

    // Navigate to payment
    fireEvent.click(screen.getByRole('button', { name: /proceed to payment/i }));
    await waitFor(() => {
      expect(screen.getByText(/payment page/i)).toBeInTheDocument();
    });
  });
});
