import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminAgencyVerificationPage from './AdminAgencyVerificationPage';

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
      <AdminAgencyVerificationPage />
    </MemoryRouter>
  );

describe('AdminAgencyVerificationPage', () => {
  const agencies = [
    {
      id: 'agency-1',
      agencyName: 'Pending Agency',
      city: 'City',
      country: 'Country',
      email: 'pending@example.com',
      phone: '123',
      address: 'Street 1',
      businessLicense: 'LIC-1',
      registrationDate: '2025-01-01',
      verificationStatus: 'pending',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    entityStore.getAll.mockResolvedValue(agencies);
    entityStore.update.mockResolvedValue(null);
  });

  test('approves an agency and calls entityStore.update with verified status', async () => {
    renderPage();

    // Wait for agency to appear in the list
    await waitFor(() => {
      expect(screen.getAllByText(/pending agency/i).length).toBeGreaterThan(0);
    });

    const approveButton = screen.getByRole('button', { name: /approve/i });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledTimes(1);
    });

    expect(entityStore.update).toHaveBeenCalledWith('agencies', 'agency-1', {
      verificationStatus: 'verified',
      rejectionReason: null,
      adminNotes: null,
    });
  });

  test('rejects an agency and stores rejection reason', async () => {
    window.prompt = jest.fn().mockReturnValue('Incomplete documents');

    renderPage();

    await waitFor(() => {
      expect(screen.getAllByText(/pending agency/i).length).toBeGreaterThan(0);
    });

    const rejectButton = screen.getByRole('button', { name: /reject/i });
    fireEvent.click(rejectButton);

    await waitFor(() => {
      expect(entityStore.update).toHaveBeenCalledTimes(1);
    });

    expect(window.prompt).toHaveBeenCalled();
    expect(entityStore.update).toHaveBeenCalledWith('agencies', 'agency-1', {
      verificationStatus: 'rejected',
      rejectionReason: 'Incomplete documents',
      adminNotes: null,
    });
  });
});
