import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminContentModerationPage from './AdminContentModerationPage';

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
      <AdminContentModerationPage />
    </MemoryRouter>
  );

describe('AdminContentModerationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    entityStore.getAll.mockImplementation((entity) => {
      if (entity === 'reviews') {
        return Promise.resolve([
          {
            id: 'rev-1',
            rating: 4,
            comment: 'Needs review',
            moderationStatus: 'pending',
            adminReason: '',
          },
        ]);
      }
      if (entity === 'cars') {
        return Promise.resolve([
          {
            id: 'car-1',
            brand: 'Toyota',
            model: 'Corolla',
            licensePlate: 'ABC-123',
            location: 'City',
            status: 'active',
            moderationStatus: 'pending',
            moderationReason: '',
          },
        ]);
      }
      return Promise.resolve([]);
    });
    entityStore.update.mockResolvedValue(null);
  });

  test('approves a review', async () => {
    renderPage();

    const row = await screen.findByText(/needs review/i);
    const reviewRow = row.closest('tr');
    const approveButton = within(reviewRow).getByRole('button', { name: /approve/i });

    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('reviews', 'rev-1', {
        moderationStatus: 'approved',
        adminReason: '',
        flagged: false,
      });
    });
  });

  test('removes a review with reason', async () => {
    window.prompt = jest.fn().mockReturnValue('Offensive language');

    renderPage();

    const row = await screen.findByText(/needs review/i);
    const reviewRow = row.closest('tr');
    const removeButton = within(reviewRow).getByRole('button', { name: /remove/i });

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('reviews', 'rev-1', {
        moderationStatus: 'removed',
        adminReason: 'Offensive language',
        flagged: false,
      });
    });
  });

  test('flags a review with reason', async () => {
    window.prompt = jest.fn().mockReturnValue('Offensive language');

    renderPage();

    const row = await screen.findByText(/needs review/i);
    const reviewRow = row.closest('tr');
    const flagButton = within(reviewRow).getByRole('button', { name: /flag/i });

    fireEvent.click(flagButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('reviews', 'rev-1', {
        moderationStatus: 'flagged',
        adminReason: 'Offensive language',
        flagged: true,
      });
    });
  });

  test('approves a listing', async () => {
    renderPage();

    const listingsTab = screen.getByRole('button', { name: /listings/i });
    fireEvent.click(listingsTab);

    const carCell = await screen.findByText(/toyota corolla/i);
    const listingRow = carCell.closest('tr');
    const approveButton = within(listingRow).getByRole('button', { name: /approve/i });

    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('cars', 'car-1', {
        moderationStatus: 'approved',
        moderationReason: '',
        flagged: false,
      });
    });
  });

  test('removes a listing with reason', async () => {
    window.prompt = jest.fn().mockReturnValue('Suspicious listing');

    renderPage();

    const listingsTab = screen.getByRole('button', { name: /listings/i });
    fireEvent.click(listingsTab);

    const carCell = await screen.findByText(/toyota corolla/i);
    const listingRow = carCell.closest('tr');
    const removeButton = within(listingRow).getByRole('button', { name: /remove/i });

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('cars', 'car-1', {
        moderationStatus: 'removed',
        moderationReason: 'Suspicious listing',
        flagged: false,
      });
    });
  });

  test('flags a listing with reason', async () => {
    window.prompt = jest.fn().mockReturnValue('Suspicious listing');

    renderPage();

    const listingsTab = screen.getByRole('button', { name: /listings/i });
    fireEvent.click(listingsTab);

    const carCell = await screen.findByText(/toyota corolla/i);
    const listingRow = carCell.closest('tr');
    const flagButton = within(listingRow).getByRole('button', { name: /flag/i });

    fireEvent.click(flagButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledWith('cars', 'car-1', {
        moderationStatus: 'flagged',
        moderationReason: 'Suspicious listing',
        flagged: true,
      });
    });
  });
});
