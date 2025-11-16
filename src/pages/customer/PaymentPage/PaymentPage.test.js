import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import { BookingProvider, useBooking } from '../../../context/BookingContext';
import { NotificationProvider } from '../../../context/NotificationContext';
import { AuthProvider } from '../../../context/AuthContext';

// Mock navigate to assert redirects
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const StartBooking = ({ car }) => {
  const { startBooking } = useBooking();
  React.useEffect(() => {
    startBooking(car);
  }, [car, startBooking]);
  return null;
};

const Wrapper = ({ children, car }) => (
  <NotificationProvider>
    <AuthProvider>
      <BookingProvider>
        <StartBooking car={car} />
        {children}
      </BookingProvider>
    </AuthProvider>
  </NotificationProvider>
);

describe('PaymentPage integration (mock)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('submits payment and navigates to booking confirmation', async () => {
    const car = { id: 'car-1', brand: 'Toyota', model: 'Corolla', year: 2024, category: 'Economy', pricePerDay: 100 };

    render(
      <MemoryRouter>
        <Wrapper car={car}>
          <PaymentPage />
        </Wrapper>
      </MemoryRouter>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText(/card number/i), { target: { name: 'cardNumber', value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { name: 'cardName', value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { name: 'expiryDate', value: '12/30' } });
fireEvent.change(screen.getByLabelText(/cvv/i), { target: { name: 'cvv', value: '123' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    // Simulate processing delay
    await waitFor(() => {
      expect(screen.getByText(/processing your payment/i)).toBeInTheDocument();
    });
    act(() => {
      jest.advanceTimersByTime(2600);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/^\/booking\/confirmation\/booking-/)
      );
    });
  });
});
