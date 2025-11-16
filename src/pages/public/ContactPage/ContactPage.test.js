import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../../routes/AppRoutes';
import { NotificationProvider } from '../../../context/NotificationContext';

const fillAndSubmit = () => {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { name: 'name', value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { name: 'email', value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: 'Hello about a booking' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
};

describe('ContactPage route', () => {
  beforeEach(() => localStorage.clear());

  test('validates and persists contact message', async () => {
    render(
      <NotificationProvider>
        <MemoryRouter initialEntries={["/contact"]}>
          <AppRoutes />
        </MemoryRouter>
      </NotificationProvider>
    );

    // Invalid email shows validation
    fireEvent.change(screen.getByLabelText(/email/i), { target: { name: 'email', value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();

    // Fill valid and submit
    fillAndSubmit();

    await waitFor(() => {
      const list = JSON.parse(localStorage.getItem('contact_messages')) || [];
      expect(list.length).toBeGreaterThan(0);
      expect(list[0].email).toBe('jane@example.com');
    });
  });
});
