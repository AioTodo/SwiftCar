import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgencyVerificationStatusPage from './AgencyVerificationStatusPage';
import { AuthProvider } from '../../../context/AuthContext';

jest.mock('../../../data/agencies.json', () => [
  {
    id: 'agency-pending',
    ownerId: 'user-pending',
    agencyName: 'Pending Cars',
    verificationStatus: 'pending',
  },
  {
    id: 'agency-approved',
    ownerId: 'user-approved',
    agencyName: 'Approved Cars',
    verificationStatus: 'verified',
  },
  {
    id: 'agency-rejected',
    ownerId: 'user-rejected',
    agencyName: 'Rejected Cars',
    verificationStatus: 'rejected',
    rejectionReason: 'Blurry documents',
  },
]);

const renderWithUser = (userId) => {
  localStorage.setItem('swiftcar_auth_user', JSON.stringify({ id: userId, role: 'agency', email: 'agency@example.com' }));

  return render(
    <MemoryRouter>
      <AuthProvider>
        <AgencyVerificationStatusPage />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('AgencyVerificationStatusPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows pending status message', async () => {
    renderWithUser('user-pending');

    await screen.findByText(/pending review/i);

    expect(screen.getAllByText(/verification status/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/under review/i)).toBeInTheDocument();
  });

  test('shows approved/verified status message and dashboard button', async () => {
    renderWithUser('user-approved');

    await screen.findByText(/your agency is verified/i);

    expect(screen.getByText(/your agency is verified/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to dashboard/i })).toBeInTheDocument();
  });

  test('shows rejected status and notes', async () => {
    renderWithUser('user-rejected');

    await screen.findByText(/your verification was rejected/i);

    expect(screen.getByText(/your verification was rejected/i)).toBeInTheDocument();
    expect(screen.getByText(/review notes/i)).toBeInTheDocument();
    expect(screen.getByText(/blurry documents/i)).toBeInTheDocument();
  });
});
