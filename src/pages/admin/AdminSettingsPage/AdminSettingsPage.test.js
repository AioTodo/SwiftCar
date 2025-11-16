import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminSettingsPage from './AdminSettingsPage';
import { settingsService } from '../../../services/settingsService';

jest.mock('../../../services/settingsService', () => {
  const actual = jest.requireActual('../../../services/settingsService');
  return {
    ...actual,
    settingsService: {
      ...actual.settingsService,
      getSettings: jest.fn(),
      updateSettings: jest.fn(),
    },
  };
});

const { settingsService: mockedSettingsService } = require('../../../services/settingsService');

const renderPage = () =>
  render(
    <MemoryRouter>
      <AdminSettingsPage />
    </MemoryRouter>
  );

describe('AdminSettingsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedSettingsService.getSettings.mockReturnValue({
      commissionRate: 0.06,
      maintenanceMode: false,
      maintenanceMessage: 'Default maintenance message',
      termsUrl: '',
      privacyUrl: '',
    });
    mockedSettingsService.updateSettings.mockImplementation((next) => next);
    localStorage.clear();
  });

  test('updates commission rate and persists as decimal', async () => {
    renderPage();

    // Wait for form to render
    await waitFor(() => {
      expect(screen.getByText(/platform settings/i)).toBeInTheDocument();
    });

    const commissionInput = screen.getByLabelText(/default commission rate/i);
    fireEvent.change(commissionInput, { target: { value: '10.5', name: 'commissionRate' } });

    const saveButton = screen.getByRole('button', { name: /save settings/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedSettingsService.updateSettings).toHaveBeenCalledTimes(1);
    });

    const updatedArg = mockedSettingsService.updateSettings.mock.calls[0][0];
    expect(updatedArg.commissionRate).toBeCloseTo(0.105);
  });

  test('toggles maintenance mode and message and persists', async () => {
    renderPage();

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', { name: /enable maintenance mode/i })
      ).toBeInTheDocument();
    });

    const maintenanceCheckbox = screen.getByRole('checkbox', { name: /enable maintenance mode/i });
    fireEvent.click(maintenanceCheckbox);

    const messageTextarea = screen.getByLabelText(/maintenance message/i);
    fireEvent.change(messageTextarea, {
      target: { name: 'maintenanceMessage', value: 'We are down for maintenance.' },
    });

    const saveButton = screen.getByRole('button', { name: /save settings/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedSettingsService.updateSettings).toHaveBeenCalledTimes(1);
    });

    const updatedArg = mockedSettingsService.updateSettings.mock.calls[0][0];
    expect(updatedArg.maintenanceMode).toBe(true);
    expect(updatedArg.maintenanceMessage).toBe('We are down for maintenance.');
  });
});
