import React from 'react';
import { Link } from 'react-router-dom';
import cars from '../../data/cars.json';
import { DashboardIcon, MagnifyingGlassIcon, CalendarIcon } from '@radix-ui/react-icons';
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">Skip the rental car counter</h1>
          <p className="hero__subtitle">Rent just about any car, just about anywhere</p>

          <div className="card hero__search-card">
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); window.location.assign('/search'); }}>
              <div className="search-form__grid">
                <div className="search-form__field">
                  <label className="search-form__label">Where</label>
                  <input className="search-form__input" placeholder="City, airport, address or hotel" />
                </div>
                <div className="search-form__field">
                  <label className="search-form__label">From</label>
                  <input className="search-form__input" type="date" />
                </div>
                <div className="search-form__field">
                  <label className="search-form__label">Until</label>
                  <input className="search-form__input" type="date" />
                </div>
              </div>
              <div className="search-form__actions" style={{ textAlign: 'right' }}>
                <button type="submit" className="button button--primary">Search</button>
              </div>
            </form>
          </div>

          {/* Category chips */}
          <div className="chip-row">
            <button className="chip chip--active" type="button">All</button>
            <button className="chip" type="button">Airports</button>
            <button className="chip" type="button">Monthly</button>
            <button className="chip" type="button">Nearby</button>
            <button className="chip" type="button">Delivered</button>
            <button className="chip" type="button">Cities</button>
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section className="featured-section">
        <h2 className="featured-section__title">Newer car rental</h2>
        <p className="featured-section__subtitle">Popular picks near you</p>
        <div className="featured-grid">
          {cars.slice(0, 8).map((car) => (
            <article key={car.carId} className="card car-card">
              <div className="car-card__image-wrapper">
                <div className="car-card__image-placeholder">
                  <DashboardIcon aria-hidden="true" />
                </div>
              </div>
              <h3 className="car-card__title">{car.brand} {car.model}</h3>
              <p className="car-card__subtitle">{car.year} • {car.location}</p>
              <div className="car-card__features">
                {(car.features || []).slice(0, 3).map((f) => (
                  <span key={f} className="car-card__feature">{f}</span>
                ))}
              </div>
              <div className="car-card__footer">
                <div className="car-card__price">
                  <span className="car-card__price-amount">${car.pricePerDay}</span>
                  <span className="car-card__price-label">/day</span>
                </div>
                <Link to={`/car/${car.carId}`} className="button button--outline">View</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="featured-section__cta">
          <Link to="/search" className="button button--primary">Explore more cars</Link>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2 className="how-it-works__title">How it works</h2>
        <div className="how-it-works__grid container">
          <div className="how-it-works__step">
            <div className="how-it-works__icon">
              <MagnifyingGlassIcon aria-hidden="true" />
            </div>
            <h3 className="how-it-works__step-title">Search</h3>
            <p className="how-it-works__step-desc">Find the car that fits your trip and budget.</p>
          </div>
          <div className="how-it-works__step">
            <div className="how-it-works__icon">
              <CalendarIcon aria-hidden="true" />
            </div>
            <h3 className="how-it-works__step-title">Book</h3>
            <p className="how-it-works__step-desc">Pick dates, add extras, and confirm.</p>
          </div>
          <div className="how-it-works__step">
            <div className="how-it-works__icon">
              <DashboardIcon aria-hidden="true" />
            </div>
            <h3 className="how-it-works__step-title">Drive</h3>
            <p className="how-it-works__step-desc">Pick up or get it delivered—enjoy the ride.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h3 className="cta-card__title">Become a provider</h3>
          <p className="cta-card__text">List your car and start earning on SwiftCar.</p>
          <Link to="/agency/register" className="button button--secondary">Get started</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;