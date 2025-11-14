import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgencyVerificationStatusPage from './AgencyVerificationStatusPage';
import { AuthProvider } from '../../../context/AuthContext';

jest.mock('../../../data/agencies.json', () => [
  { id: 'agency-pending', ownerId: 'user-pending', agencyName: 'Pending Cars', status: 'pending' },
  { id: 'agency-approved', ownerId: 'user-approved', agencyName: 'Approved Cars', status: 'approved' },
  { id: 'agency-rejected', ownerId: 'user-rejected', agencyName: 'Rejected Cars', status: 'rejected', rejectionReason: 'Blurry documents' },
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

  test('shows pending status message', () => {
    renderWithUser('user-pending');

    expect(screen.getByText(/verification status/i)).toBeInTheDocument();
    expect(screen.getByText(/pending review/i)).toBeInTheDocument();
    expect(screen.getByText(/under review/i)).toBeInTheDocument();
  });

  test('shows approved/verified status message and dashboard button', () => {
    renderWithUser('user-approved');

    expect(screen.getByText(/your agency is verified/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to dashboard/i })).toBeInTheDocument();
  });

  test('shows rejected status and notes', () => {
    renderWithUser('user-rejected');

    expect(screen.getByText(/your verification was rejected/i)).toBeInTheDocument();
    expect(screen.getByText(/review notes/i)).toBeInTheDocument();
    expect(screen.getByText(/blurry documents/i)).toBeInTheDocument();
  });
});
