import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExtrasSelector from './ExtrasSelector';

describe('ExtrasSelector', () => {
  test('renders extra options and toggles values', () => {
    const onToggle = jest.fn();
    render(<ExtrasSelector extras={{ insurance: false }} onToggle={onToggle} />);

    const insurance = screen.getByRole('checkbox', { name: /full insurance coverage/i });
    fireEvent.click(insurance);
    expect(onToggle).toHaveBeenCalledWith('insurance', true);

    const gps = screen.getByRole('checkbox', { name: /gps navigation/i });
    fireEvent.click(gps);
    expect(onToggle).toHaveBeenCalledWith('gps', true);
  });
});
