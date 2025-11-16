import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import { dataService } from '../../../services/dataService';
import { DashboardIcon, DrawingPinIcon } from '@radix-ui/react-icons';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuelType: '',
    minSeats: '',
    features: [],
    sortBy: '',
  });

  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const returnDate = searchParams.get('returnDate') || '';

  useEffect(() => {
    const allCars = dataService.getAll('cars');

    let results = [...allCars];

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

    // Filter by transmission (if present on car or in features)
    if (filters.transmission) {
      const t = filters.transmission.toLowerCase();
      results = results.filter((car) => {
        if (car.transmission) {
          return String(car.transmission).toLowerCase() === t;
        }
        const feats = (car.features || []).map((f) => String(f).toLowerCase());
        return feats.includes(t);
      });
    }

    // Filter by fuel type
    if (filters.fuelType) {
      const f = filters.fuelType.toLowerCase();
      results = results.filter((car) =>
        String(car.fuelType || '').toLowerCase() === f
      );
    }

    // Filter by minimum seats
    if (filters.minSeats) {
      const minSeats = Number(filters.minSeats) || 0;
      results = results.filter((car) => (car.seats || 0) >= minSeats);
    }

    // Filter by features (require all selected features)
    if (filters.features && filters.features.length) {
      results = results.filter((car) => {
        const feats = (car.features || []).map((f) => String(f).toLowerCase());
        return filters.features.every((f) => feats.includes(f.toLowerCase()));
      });
    }

    // Sorting
    if (filters.sortBy === 'price-asc') {
      results.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === 'price-desc') {
      results.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (filters.sortBy === 'rating-desc') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredCars(results);
  }, [location, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    setFilters((prev) => {
      const current = new Set(prev.features || []);
      if (current.has(feature)) {
        current.delete(feature);
      } else {
        current.add(feature);
      }
      return { ...prev, features: Array.from(current) };
    });
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

                <div className="filter-group">
                  <label className="filter-label">Transmission</label>
                  <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="">Any</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="">Any</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Minimum Seats</label>
                  <input
                    type="number"
                    name="minSeats"
                    placeholder="e.g. 5"
                    value={filters.minSeats}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                </div>

                <div className="filter-group">
                  <label className="filter-label">Features</label>
                  <div className="filter-checkbox-group">
                    {['GPS', 'A/C', 'Bluetooth'].map((feat) => (
                      <label key={feat} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feat)}
                          onChange={() => handleFeatureToggle(feat)}
                        />
                        <span>{feat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Sort by</label>
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                </div>

                <Button
                  variant="text"
                  size="small"
                  fullWidth
                  onClick={() => setFilters({
                    category: '',
                    minPrice: '',
                    maxPrice: '',
                    transmission: '',
                    fuelType: '',
                    minSeats: '',
                    features: [],
                    sortBy: '',
                  })}
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
                    <div className="car-card__image-placeholder">
                      <DashboardIcon aria-hidden="true" />
                    </div>
                  </div>

                  <Card.Body>
                    <h3 className="car-card__title">
                      {car.brand} {car.model}
                    </h3>
                    <p className="car-card__subtitle">
                      {car.year} • {car.category}
                    </p>
                    <p className="car-card__location">
                      <DrawingPinIcon aria-hidden="true" /> {car.location}
                    </p>

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
