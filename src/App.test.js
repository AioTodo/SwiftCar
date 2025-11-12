import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { BookingProvider } from './context/BookingContext';

test('renders header brand', () => {
  render(
    <NotificationProvider>
      <AuthProvider>
        <BookingProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </BookingProvider>
      </AuthProvider>
    </NotificationProvider>
  );
  const banner = screen.getByRole('banner');
  expect(within(banner).getByRole('heading', { name: /swiftcar/i })).toBeInTheDocument();
});
