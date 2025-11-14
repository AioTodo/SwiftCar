import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

jest.mock('../../../services/entityStore', () => {
  return {
    entityStore: {
      getAll: jest.fn(),
      update: jest.fn(),
    },
  };
});

const { entityStore } = require('../../../services/entityStore');

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotificationProvider>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>
  );

describe('LoginPage account status handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('prevents login for suspended accounts', async () => {
    entityStore.getAll.mockResolvedValue([
      {
        id: 'user-1',
        firstName: 'Sam',
        lastName: 'Suspended',
        email: 'sam@example.com',
        password: 'password123',
        role: 'customer',
        accountStatus: 'suspended',
      },
    ]);

    renderPage();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { name: 'email', value: 'sam@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { name: 'password', value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/account suspended/i)).toBeInTheDocument();
    });
  });

  test('prevents login for deleted accounts', async () => {
    entityStore.getAll.mockResolvedValue([
      {
        id: 'user-2',
        firstName: 'Dan',
        lastName: 'Deleted',
        email: 'dan@example.com',
        password: 'password123',
        role: 'customer',
        accountStatus: 'deleted',
      },
    ]);

    renderPage();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { name: 'email', value: 'dan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { name: 'password', value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/account deactivated/i)).toBeInTheDocument();
    });
  });
});
