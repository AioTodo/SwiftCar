import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import bookingsData from '../../../data/bookings.json';
import carsData from '../../../data/cars.json';
import agenciesData from '../../../data/agencies.json';

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock: Get agency data for current user
  const agency = agenciesData.find((a) => a.ownerId === user?.id) || agenciesData[0];
  const agencyCars = carsData.filter((c) => c.agencyId === agency?.id);
  const agencyBookings = bookingsData.filter((b) => b.agencyId === agency?.id);
  
  const activeBookings = agencyBookings.filter((b) => b.status === 'confirmed');
  const totalRevenue = agencyBookings.reduce((sum, b) => sum + (b.totalPrice - b.commissionAmount), 0);
  const availableCars = agencyCars.filter((c) => c.available).length;

  return (
    <div className="agency-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Welcome back, {agency?.agencyName}!</h1>
            <p className="dashboard__subtitle">Manage your fleet and bookings</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/agency/add-car')}>
            Add New Car
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="dashboard__stats">
          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">🚗</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{agencyCars.length}</h3>
                <p className="stat-card__label">Total Vehicles</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">✓</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{availableCars}</h3>
                <p className="stat-card__label">Available Now</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">📅</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{activeBookings.length}</h3>
                <p className="stat-card__label">Active Bookings</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">💰</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{totalRevenue} MAD</h3>
                <p className="stat-card__label">Total Earnings</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard__grid">
          {/* Recent Bookings */}
          <Card>
            <Card.Header>
              <div className="card-header-with-action">
                <h2>Recent Bookings</h2>
                <Button variant="text" size="small" onClick={() => navigate('/agency/bookings')}>
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {agencyBookings.length === 0 ? (
                <div className="dashboard__empty">
                  <p>No bookings yet</p>
                </div>
              ) : (
                <div className="booking-list">
                  {agencyBookings.slice(0, 3).map((booking) => {
                    const car = carsData.find((c) => c.id === booking.carId);
                    return (
                      <div key={booking.id} className="booking-item">
                        <div className="booking-item__icon">🚗</div>
                        <div className="booking-item__details">
                          <h4 className="booking-item__title">
                            {car ? `${car.brand} ${car.model}` : 'Car'}
                          </h4>
                          <p className="booking-item__dates">
                            {booking.pickupDate} to {booking.returnDate}
                          </p>
                        </div>
                        <div className="booking-item__price">
                          {booking.totalPrice - booking.commissionAmount} MAD
                        </div>
                        <span className={`booking-status status--${booking.status}`}>
                          {booking.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Fleet Overview */}
          <Card>
            <Card.Header>
              <div className="card-header-with-action">
                <h2>Your Fleet</h2>
                <Button variant="text" size="small" onClick={() => navigate('/agency/manage-cars')}>
                  Manage
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {agencyCars.length === 0 ? (
                <div className="dashboard__empty">
                  <p>No vehicles added yet</p>
                  <Button variant="primary" onClick={() => navigate('/agency/add-car')}>
                    Add Your First Car
                  </Button>
                </div>
              ) : (
                <div className="fleet-list">
                  {agencyCars.slice(0, 3).map((car) => (
                    <div key={car.id} className="fleet-item">
                      <div className="fleet-item__icon">🚗</div>
                      <div className="fleet-item__details">
                        <h4 className="fleet-item__title">
                          {car.brand} {car.model}
                        </h4>
                        <p className="fleet-item__info">
                          {car.year} • {car.pricePerDay} MAD/day
                        </p>
                      </div>
                      <span className={`availability-badge ${car.available ? 'availability-badge--available' : 'availability-badge--unavailable'}`}>
                        {car.available ? 'Available' : 'Rented'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="dashboard__actions">
          <Card hoverable onClick={() => navigate('/agency/add-car')}>
            <div className="action-card">
              <div className="action-card__icon">➕</div>
              <h3 className="action-card__title">Add Vehicle</h3>
              <p className="action-card__desc">Add a new car to your fleet</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/manage-cars')}>
            <div className="action-card">
              <div className="action-card__icon">🚗</div>
              <h3 className="action-card__title">Manage Fleet</h3>
              <p className="action-card__desc">View and edit your vehicles</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/bookings')}>
            <div className="action-card">
              <div className="action-card__icon">📋</div>
              <h3 className="action-card__title">Bookings</h3>
              <p className="action-card__desc">Manage customer reservations</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/earnings')}>
            <div className="action-card">
              <div className="action-card__icon">💰</div>
              <h3 className="action-card__title">Earnings</h3>
              <p className="action-card__desc">View revenue and payouts</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
