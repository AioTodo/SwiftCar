import { render, screen } from '@testing-library/react';
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
  expect(screen.getByRole('heading', { name: /swiftcar/i })).toBeInTheDocument();
});
