import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgencyEarningsPage from './AgencyEarningsPage';
import { AuthProvider } from '../../../context/AuthContext';

const setAgencyUser = (id = 'user-2') => {
  // ownerId user-2 corresponds to agency-1 in agencies.json
  localStorage.setItem('swiftcar_auth_user', JSON.stringify({ id, role: 'agency', email: 'agency@example.com' }));
};

const renderPage = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AgencyEarningsPage />
      </AuthProvider>
    </MemoryRouter>
  );

describe('AgencyEarningsPage', () => {
  beforeEach(() => {
    localStorage.clear();
    setAgencyUser();
  });

  test('shows empty state when there are no bookings', async () => {
    // Use agency-2 (ownerId user-4) which has no bookings in bookings.json
    setAgencyUser('user-4');
    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/no earnings yet/i)).toBeInTheDocument();
      // We only need to verify that at least one Net Earnings label is present; there are
      // multiple matches (summary card label and descriptive text), so use getAllByText.
      const netEarningsMatches = screen.getAllByText(/net earnings/i);
      expect(netEarningsMatches.length).toBeGreaterThan(0);
    });
  });

  test('computes and displays earnings summary from seeded bookings', async () => {
    // With the default agency user (ownerId user-2 → agency-1), AgencyEarningsPage
    // uses the seeded bookings.json file which currently contains two bookings
    // for agency-1:
    //  - booking-1: totalPrice 1150, commissionAmount 69
    //  - booking-2: totalPrice 2700, commissionAmount 162
    // So we expect:
    //  totalGross = 1150 + 2700 = 3850 MAD
    //  totalCommission = 69 + 162 = 231 MAD
    //  totalNet = 3850 - 231 = 3619 MAD
    //  totalBookings = 2
    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/gross revenue/i)).toBeInTheDocument();
    });

    // Summary cards - scope by label inside the stat-card elements to avoid
    // matching the descriptive text in the page header.
    const statCards = screen.getAllByClassName
      ? screen.getAllByClassName('stat-card') // fallback if a helper exists
      : Array.from(document.querySelectorAll('.stat-card'));

    const findCardByLabel = (labelRegex) =>
      statCards.find((card) =>
        Array.from(card.querySelectorAll('.stat-card__label')).some((el) =>
          labelRegex.test(el.textContent || '')
        )
      );

    const netCard = findCardByLabel(/net earnings/i);
    const grossCard = findCardByLabel(/gross revenue/i);
    const commissionCard = findCardByLabel(/commission paid/i);
    const totalBookingsCard = findCardByLabel(/total bookings/i);

    expect(netCard).toHaveTextContent('3619 MAD');
    expect(grossCard).toHaveTextContent('3850 MAD');
    expect(commissionCard).toHaveTextContent('231 MAD');
    expect(totalBookingsCard).toHaveTextContent('2');

    // Earnings table is rendered with at least one row for the agency bookings
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
