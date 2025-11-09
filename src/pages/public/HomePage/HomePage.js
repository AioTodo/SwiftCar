import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import carsData from '../../../data/cars.json';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results with query params
    const params = new URLSearchParams(searchData).toString();
    navigate(`/search?${params}`);
  };

  const featuredCars = carsData.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">Rent Your Perfect Car</h1>
          <p className="hero__subtitle">
            Discover local car rental agencies with transparent pricing and verified vehicles
          </p>
          
          {/* Search Form */}
          <Card className="hero__search-card">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-form__grid">
                <div className="search-form__field">
                  <label htmlFor="location" className="search-form__label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Where do you need a car?"
                    value={searchData.location}
                    onChange={handleSearchChange}
                    className="search-form__input"
                    required
                  />
                </div>
                
                <div className="search-form__field">
                  <label htmlFor="pickupDate" className="search-form__label">Pickup Date</label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={searchData.pickupDate}
                    onChange={handleSearchChange}
                    className="search-form__input"
                    required
                  />
                </div>
                
                <div className="search-form__field">
                  <label htmlFor="returnDate" className="search-form__label">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleSearchChange}
                    className="search-form__input"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" variant="primary" size="large" fullWidth>
                Search Cars
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="featured-section__title">Featured Cars</h2>
          <p className="featured-section__subtitle">
            Browse our selection of quality vehicles from verified agencies
          </p>
          
          <div className="featured-grid">
            {featuredCars.map((car) => (
              <Card key={car.id} hoverable className="car-card">
                <div className="car-card__image-wrapper">
                  <div className="car-card__image-placeholder">
                    🚗
                  </div>
                </div>
                
                <Card.Body>
                  <h3 className="car-card__title">
                    {car.brand} {car.model}
                  </h3>
                  <p className="car-card__subtitle">
                    {car.year} • {car.category}
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
            ))}
          </div>
          
          <div className="featured-section__cta">
            <Button variant="outline" size="large" onClick={() => navigate('/search')}>
              View All Cars
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="how-it-works__title">How It Works</h2>
          
          <div className="how-it-works__grid">
            <div className="how-it-works__step">
              <div className="how-it-works__icon">🔍</div>
              <h3 className="how-it-works__step-title">1. Search</h3>
              <p className="how-it-works__step-desc">
                Find the perfect car by location, dates, and preferences
              </p>
            </div>
            
            <div className="how-it-works__step">
              <div className="how-it-works__icon">✓</div>
              <h3 className="how-it-works__step-title">2. Book</h3>
              <p className="how-it-works__step-desc">
                Choose your car and complete the booking in 3 easy steps
              </p>
            </div>
            
            <div className="how-it-works__step">
              <div className="how-it-works__icon">🚗</div>
              <h3 className="how-it-works__step-title">3. Drive</h3>
              <p className="how-it-works__step-desc">
                Pick up your car and enjoy your journey with peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-card__title">Are you a car rental agency?</h2>
            <p className="cta-card__text">
              Join SwiftCar and reach more customers with our fair commission model (5-7%)
            </p>
            <Button variant="accent" size="large" onClick={() => navigate('/agency/register')}>
              Become a Provider
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
