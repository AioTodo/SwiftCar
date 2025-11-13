import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManageCarsPage from './ManageCarsPage';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../context/NotificationContext';

// Helper to set logged-in agency owner
const setAgencyUser = () => {
  const agencyUser = {
    id: 'user-2', // ownerId for agency-1 in agencies.json
    firstName: 'Agency',
    lastName: 'Owner',
    email: 'agency@example.com',
    role: 'agency',
  };
  localStorage.setItem('swiftcar_auth_user', JSON.stringify(agencyUser));
};

const renderPage = () => {
  return render(
    <MemoryRouter>
      <NotificationProvider>
        <AuthProvider>
          <ManageCarsPage />
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>
  );
};

describe('ManageCarsPage (integration)', () => {
  beforeEach(() => {
    localStorage.clear();
    setAgencyUser();
  });

  test('create a car via modal and see it in the list', async () => {
    renderPage();

    // Open create modal
    fireEvent.click(screen.getByRole('button', { name: /add new car/i }));

    // Fill CarForm fields
    fireEvent.change(screen.getByLabelText(/title/i), { target: { name: 'title', value: 'Economy Sedan' } });
    fireEvent.change(screen.getByLabelText(/brand/i), { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText(/price per day/i), { target: { name: 'pricePerDay', value: '45' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { name: 'location', value: 'Agadir' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // New car card should appear with brand + model
    await waitFor(() => {
      expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();
    });
  });

  test('edit a car updates it in the list', async () => {
    renderPage();
    // Create first
    fireEvent.click(screen.getByRole('button', { name: /add new car/i }));
    fireEvent.change(screen.getByLabelText(/title/i), { target: { name: 'title', value: 'Economy Sedan' } });
    fireEvent.change(screen.getByLabelText(/brand/i), { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText(/price per day/i), { target: { name: 'pricePerDay', value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => screen.getByText(/toyota corolla/i));

    // Click Edit to open modal
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Change price
    const priceInput = screen.getByLabelText(/price per day/i);
    fireEvent.change(priceInput, { target: { name: 'pricePerDay', value: '50' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Assert updated price in card
    await waitFor(() => {
      expect(screen.getByText(/50 MAD\/day/i)).toBeInTheDocument();
    });
  });

  test('delete a car removes it from the list', async () => {
    // Seed by creating one via UI first
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /add new car/i }));
    fireEvent.change(screen.getByLabelText(/title/i), { target: { name: 'title', value: 'Economy Sedan' } });
    fireEvent.change(screen.getByLabelText(/brand/i), { target: { name: 'brand', value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { name: 'model', value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText(/price per day/i), { target: { name: 'pricePerDay', value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => screen.getByText(/toyota corolla/i));

    // Confirm dialog should pass
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    // Click Delete on the card
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);

    // Removed
    await waitFor(() => {
      expect(screen.queryByText(/toyota corolla/i)).not.toBeInTheDocument();
    });
  });
});
