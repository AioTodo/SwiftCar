import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import { usersAPI } from '../../../services/api';

// Mock the API
jest.mock('../../../services/api', () => ({
  usersAPI: {
    create: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUpPage = () => {
    return render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
  };

  const fillForm = (overrides = {}) => {
    const defaults = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'Password123',
      confirmPassword: 'Password123',
    };

    const values = { ...defaults, ...overrides };

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { name: 'firstName', value: values.firstName },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { name: 'lastName', value: values.lastName },
    });
    fireEvent.change(screen.getByLabelText(/^email/i), {
      target: { name: 'email', value: values.email },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { name: 'phone', value: values.phone },
    });
    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { name: 'password', value: values.password },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { name: 'confirmPassword', value: values.confirmPassword },
    });
  };

  describe('Registration and redirection', () => {
    test('should successfully register a new customer and redirect to /login', async () => {
      usersAPI.create.mockResolvedValueOnce({ success: true });
      renderSignUpPage();

      fillForm();

      // Ensure customer role is selected (default)
      const customerRadio = screen.getByLabelText(/customer/i);
      expect(customerRadio).toBeChecked();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(usersAPI.create).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          password: 'Password123',
          role: 'customer',
        });
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });

    test('should successfully register a new agency and redirect to /agency/register', async () => {
      usersAPI.create.mockResolvedValueOnce({ success: true });
      renderSignUpPage();

      fillForm();

      // Select agency role
      const agencyRadio = screen.getByLabelText(/agency owner/i);
      fireEvent.click(agencyRadio);

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(usersAPI.create).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          password: 'Password123',
          role: 'agency',
        });
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/agency/register');
      });
    });

    test('should trim whitespace from form fields before submitting', async () => {
      usersAPI.create.mockResolvedValueOnce({ success: true });
      renderSignUpPage();

      fillForm({
        firstName: '  John  ',
        lastName: '  Doe  ',
        email: '  john.doe@example.com  ',
        phone: '  1234567890  ',
      });

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(usersAPI.create).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          password: 'Password123',
          role: 'customer',
        });
      });
    });
  });

  describe('Validation', () => {
    test('should show error when required fields are missing', async () => {
      renderSignUpPage();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please fill out all required fields/i)).toBeInTheDocument();
      });

      expect(usersAPI.create).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('should show error when passwords do not match', async () => {
      renderSignUpPage();

      fillForm({
        password: 'Password123',
        confirmPassword: 'DifferentPassword',
      });

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });

      expect(usersAPI.create).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    test('should display error message when API call fails', async () => {
      const errorMessage = 'Email already exists';
      usersAPI.create.mockRejectedValueOnce({ message: errorMessage });
      renderSignUpPage();

      fillForm();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('should display default error message when API error has no message', async () => {
      usersAPI.create.mockRejectedValueOnce({});
      renderSignUpPage();

      fillForm();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to create account/i)).toBeInTheDocument();
      });
    });
  });

  describe('Loading state', () => {
    test('should show loading state during submission', async () => {
      usersAPI.create.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));
      renderSignUpPage();

      fillForm();

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      // Button should show loading state
      await waitFor(() => {
        expect(submitButton).toHaveAttribute('disabled');
      });
    });
  });
});
