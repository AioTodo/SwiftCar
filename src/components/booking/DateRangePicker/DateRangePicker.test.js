import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRangePicker from './DateRangePicker';

describe('DateRangePicker', () => {
  test('renders inputs and triggers onChange', () => {
    const onChange = jest.fn();
    render(
      <DateRangePicker pickupDate="2025-01-10" returnDate="2025-01-12" onChange={onChange} />
    );

    const pickup = screen.getByLabelText(/pickup date/i);
    fireEvent.change(pickup, { target: { name: 'pickupDate', value: '2025-01-11' } });
    expect(onChange).toHaveBeenCalled();

    const drop = screen.getByLabelText(/return date/i);
    fireEvent.change(drop, { target: { name: 'returnDate', value: '2025-01-13' } });
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
