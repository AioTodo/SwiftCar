import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../../routes/AppRoutes';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

describe('NotFoundPage route fallback', () => {
  test('renders for unknown paths and provides CTAs', () => {
    render(
      <MemoryRouter initialEntries={["/unknown/path"]}>
        <NotificationProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </NotificationProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse cars/i })).toBeInTheDocument();
  });
});
