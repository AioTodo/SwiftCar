import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminUsersPage from './AdminUsersPage';

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
      <AdminUsersPage />
    </MemoryRouter>
  );

describe('AdminUsersPage', () => {
  const users = [
    {
      id: 'u-1',
      firstName: 'Alice',
      lastName: 'Active',
      email: 'alice@example.com',
      role: 'customer',
      accountStatus: 'active',
      registrationDate: '2025-01-01',
    },
    {
      id: 'u-2',
      firstName: 'Bob',
      lastName: 'Suspended',
      email: 'bob@example.com',
      role: 'customer',
      accountStatus: 'suspended',
      registrationDate: '2025-01-02',
    },
    {
      id: 'u-3',
      firstName: 'Charlie',
      lastName: 'ToDelete',
      email: 'charlie@example.com',
      role: 'customer',
      accountStatus: 'active',
      registrationDate: '2025-01-03',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    entityStore.getAll.mockResolvedValue(users);
    entityStore.update.mockResolvedValue(null);
    window.confirm = jest.fn().mockReturnValue(true);
  });

  test('suspends an active user', async () => {
    renderPage();

    const aliceEmail = await screen.findByText('alice@example.com');
    const row = aliceEmail.closest('tr');
    const suspendButton = within(row).getByRole('button', { name: /suspend/i });

    fireEvent.click(suspendButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('users', 'u-1', {
        accountStatus: 'suspended',
      });
    });
  });

  test('activates a suspended user', async () => {
    renderPage();

    const bobEmail = await screen.findByText('bob@example.com');
    const row = bobEmail.closest('tr');
    const activateButton = within(row).getByRole('button', { name: /activate/i });

    fireEvent.click(activateButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('users', 'u-2', {
        accountStatus: 'active',
      });
    });
  });

  test('marks a user as deleted after confirmation', async () => {
    renderPage();

    const charlieEmail = await screen.findByText('charlie@example.com');
    const row = charlieEmail.closest('tr');
    const deleteButton = within(row).getByRole('button', { name: /mark deleted/i });

    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('users', 'u-3', {
        accountStatus: 'deleted',
      });
    });
  });
});
