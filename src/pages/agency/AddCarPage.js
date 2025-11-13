import React, { useState } from 'react';
import { entityStore } from '../../services/entityStore';

const emptyCar = {
  brand: '',
  model: '',
  year: 2024,
  category: 'economy',
  licensePlate: '',
  pricePerDay: 50,
  location: '',
  available: true,
  features: [],
  photos: [],
  status: 'active',
  description: '',
  transmission: 'automatic',
  fuelType: 'petrol',
  seats: 5,
};

const AddCarPage = () => {
  const [car, setCar] = useState(emptyCar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: name === 'year' || name === 'pricePerDay' || name === 'seats' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await entityStore.create('cars', car);
    setCar(emptyCar);
    alert('Car created (mock).');
  };

  return (
    <div className="container">
      <h2 className="heading heading--h2">Add New Car</h2>
      <form onSubmit={onSubmit} className="form">
        <input className="input mb-1" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} />
        <input className="input mb-1" name="model" placeholder="Model" value={car.model} onChange={handleChange} />
        <input className="input mb-1" name="year" type="number" placeholder="Year" value={car.year} onChange={handleChange} />
        <input className="input mb-1" name="pricePerDay" type="number" placeholder="Price per day" value={car.pricePerDay} onChange={handleChange} />
        <input className="input mb-1" name="location" placeholder="Location" value={car.location} onChange={handleChange} />
        <button className="button button--primary" type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddCarPage;