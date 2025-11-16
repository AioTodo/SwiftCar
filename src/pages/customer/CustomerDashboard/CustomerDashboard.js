import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import { bookingsAPI, carsAPI } from '../../../services/api';
import {
  CalendarIcon,
  CheckIcon,
  TokensIcon,
  DashboardIcon,
  MagnifyingGlassIcon,
  ClipboardIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user?.id) {
        setBookings([]);
        setCars([]);
        setIsLoading(false);
        return;
      }

      try {
        const [userBookings, allCars] = await Promise.all([
          bookingsAPI.listByUser(user.id),
          carsAPI.list(),
        ]);
        if (cancelled) return;
        setBookings(userBookings || []);
        setCars(allCars || []);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const userBookings = bookings;
  const upcomingBookings = userBookings.filter((b) => b.status === 'confirmed');
  const pastBookings = userBookings.filter((b) => b.status === 'completed');

  const totalSpent = userBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="customer-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Welcome back, {user?.firstName || 'Customer'}!</h1>
            <p className="dashboard__subtitle">Manage your bookings and profile</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/search')}>
            Book a Car
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="dashboard__stats">
          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <CalendarIcon aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{upcomingBookings.length}</h3>
                <p className="stat-card__label">Upcoming Bookings</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <CheckIcon aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{pastBookings.length}</h3>
                <p className="stat-card__label">Completed Trips</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <TokensIcon aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{totalSpent} MAD</h3>
                <p className="stat-card__label">Total Spent</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card>
          <Card.Header>
            <div className="card-header-with-action">
              <h2>Upcoming Bookings</h2>
              <Button variant="text" size="small" onClick={() => navigate('/customer/bookings')}>
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <div className="dashboard__empty">
                <p>Loading upcoming bookings...</p>
              </div>
            ) : upcomingBookings.length === 0 ? (
              <div className="dashboard__empty">
                <p>No upcoming bookings</p>
                <Button variant="primary" onClick={() => navigate('/search')}>
                  Browse Cars
                </Button>
              </div>
            ) : (
              <div className="booking-list">
                {upcomingBookings.slice(0, 3).map((booking) => {
                  const car = cars.find((c) => c.id === booking.carId);
                  return (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-item__icon">
                        <DashboardIcon aria-hidden="true" />
                      </div>
                      <div className="booking-item__details">
                        <h4 className="booking-item__title">
                          {car ? `${car.brand} ${car.model}` : 'Car'}
                        </h4>
                        <p className="booking-item__dates">
                          {(booking.pickup || booking.pickupDate) || ''} to {(booking.dropoff || booking.returnDate) || ''}
                        </p>
                      </div>
                      <div className="booking-item__price">
                        {booking.totalPrice} MAD
                      </div>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => navigate(`/customer/booking/${booking.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <div className="dashboard__actions">
          <Card hoverable onClick={() => navigate('/search')}>
            <div className="action-card">
              <div className="action-card__icon">
                <MagnifyingGlassIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Search Cars</h3>
              <p className="action-card__desc">Find your perfect rental</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/customer/bookings')}>
            <div className="action-card">
              <div className="action-card__icon">
                <ClipboardIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">My Bookings</h3>
              <p className="action-card__desc">View all your reservations</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/customer/profile')}>
            <div className="action-card">
              <div className="action-card__icon">
                <PersonIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Profile</h3>
              <p className="action-card__desc">Manage your account</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
