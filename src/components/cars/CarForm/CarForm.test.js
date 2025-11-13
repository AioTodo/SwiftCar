import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarForm from './CarForm';

describe('CarForm', () => {
  test('validates required fields and calls onSubmit with normalized payload', () => {
    const onSubmit = jest.fn();
    render(<CarForm onSubmit={onSubmit} />);

    // Try submit empty -> should show errors and not call onSubmit
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/brand is required/i)).toBeInTheDocument();
    expect(screen.getByText(/model is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price per day is required/i)).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByLabelText(/title/i), { target: { name: 'title', value: '  Economy Sedan  ' } });
    fireEvent.change(screen.getByLabelText(/brand/i), { target: { name: 'brand', value: ' Toyota ' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { name: 'model', value: ' Corolla ' } });
    fireEvent.change(screen.getByLabelText(/price per day/i), { target: { name: 'pricePerDay', value: '45' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { name: 'location', value: 'NYC' } });
    fireEvent.change(screen.getByLabelText(/features \(comma-separated\)/i), { target: { name: 'features', value: 'GPS, Automatic, A/C,' } });
    fireEvent.change(screen.getByLabelText(/image urls \(comma-separated\)/i), { target: { name: 'images', value: 'http://a.jpg, http://b.jpg' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Economy Sedan',
      brand: 'Toyota',
      model: 'Corolla',
      pricePerDay: 45,
      location: 'NYC',
      features: ['GPS', 'Automatic', 'A/C'],
      images: ['http://a.jpg', 'http://b.jpg'],
      available: true,
    });
  });
});
