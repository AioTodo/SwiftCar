import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import carsData from '../../../data/cars.json';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const returnDate = searchParams.get('returnDate') || '';

  useEffect(() => {
    let results = [...carsData];

    // Filter by location
    if (location) {
      results = results.filter((car) =>
        car.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      results = results.filter((car) => car.category === filters.category);
    }

    // Filter by price
    if (filters.minPrice) {
      results = results.filter((car) => car.pricePerDay >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      results = results.filter((car) => car.pricePerDay <= parseFloat(filters.maxPrice));
    }

    setFilteredCars(results);
  }, [location, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-results__header">
          <h1 className="search-results__title">Available Cars</h1>
          {location && (
            <p className="search-results__subtitle">
              Showing results for <strong>{location}</strong>
              {pickupDate && returnDate && (
                <span> from {pickupDate} to {returnDate}</span>
              )}
            </p>
          )}
          <p className="search-results__count">{filteredCars.length} cars found</p>
        </div>

        <div className="search-results__layout">
          {/* Filters Sidebar */}
          <aside className="search-filters">
            <Card>
              <Card.Header>
                <h3>Filters</h3>
              </Card.Header>
              <Card.Body>
                <div className="filter-group">
                  <label className="filter-label">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="">All Categories</option>
                    <option value="economy">Economy</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Price Range (MAD/day)</label>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                </div>

                <Button
                  variant="text"
                  size="small"
                  fullWidth
                  onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '' })}
                >
                  Clear Filters
                </Button>
              </Card.Body>
            </Card>
          </aside>

          {/* Results Grid */}
          <div className="search-results__grid">
            {filteredCars.length === 0 ? (
              <Card className="search-results__empty">
                <p>No cars found matching your criteria.</p>
                <Button variant="primary" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              </Card>
            ) : (
              filteredCars.map((car) => (
                <Card key={car.id} hoverable className="car-card">
                  <div className="car-card__image-wrapper">
                    <div className="car-card__image-placeholder">🚗</div>
                  </div>

                  <Card.Body>
                    <h3 className="car-card__title">
                      {car.brand} {car.model}
                    </h3>
                    <p className="car-card__subtitle">
                      {car.year} • {car.category}
                    </p>
                    <p className="car-card__location">📍 {car.location}</p>

                    <div className="car-card__features">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="car-card__feature">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="car-card__footer">
                      <div className="car-card__price">
                        <span className="car-card__price-amount">{car.pricePerDay} MAD</span>
                        <span className="car-card__price-label">/ day</span>
                      </div>

                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => navigate(`/car/${car.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
