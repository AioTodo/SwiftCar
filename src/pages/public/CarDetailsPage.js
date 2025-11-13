import React from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../../data/cars.json';

const CarDetailsPage = () => {
  const { carId } = useParams();
  const car = cars.find((c) => String(c.carId) === String(carId));

  if (!car) {
    return (
      <div className="container">
        <p className="text--muted">Car not found.</p>
        <Link to="/search" className="button button--outline mt-1">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="page page--car-details">
      <div className="container">
        <h1 className="heading heading--h2">{car.brand} {car.model} ({car.year})</h1>
        <p className="text--body mb-1">{car.description}</p>
        <div className="card p-2">
          <p><strong>Location:</strong> {car.location}</p>
          <p><strong>Category:</strong> {car.category}</p>
          <p><strong>Price/day:</strong> ${car.pricePerDay}</p>
          <p><strong>Features:</strong> {car.features.join(', ')}</p>
        </div>
        <Link to="/customer/booking-process" className="button button--primary mt-2">Book Now</Link>
      </div>
    </div>
  );
};

export default CarDetailsPage;