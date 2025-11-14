import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { BookingProvider } from './context/BookingContext';
import { mantineTheme } from './theme/mantineTheme';

test('renders header brand', () => {
  render(
    <MantineProvider theme={mantineTheme}>
      <NotificationProvider>
        <AuthProvider>
          <BookingProvider>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </BookingProvider>
        </AuthProvider>
      </NotificationProvider>
    </MantineProvider>
  );
  const banner = screen.getByRole('banner');
  expect(within(banner).getByRole('heading', { name: /swiftcar/i })).toBeInTheDocument();
});
