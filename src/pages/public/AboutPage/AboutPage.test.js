import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../../routes/AppRoutes';

describe('AboutPage route', () => {
  test('renders About content', () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/about swiftcar/i)).toBeInTheDocument();
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
  });
});
