import React, { useMemo, useState } from 'react';
import carsData from '../../data/cars.json';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.toLowerCase();
    return carsData.filter(
      (c) => c.brand.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="page page--search">
      <div className="container">
        <h2 className="heading heading--h2 mb-2">Search Cars</h2>
        <input
          className="input"
          placeholder="Search by brand, model or location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grid mt-2">
          {results.map((car) => (
            <div key={car.carId} className="card">
              <div className="card__body">
                <h3 className="heading heading--h3">{car.brand} {car.model}</h3>
                <p className="text--muted">{car.location} • ${car.pricePerDay}/day</p>
                <Link to={`/car/${car.carId}`} className="button button--outline mt-1">View Details</Link>
              </div>
            </div>
          ))}
          {!results.length && <p className="text--muted">No cars match your search.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;