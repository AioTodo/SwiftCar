import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { entityStore } from '../../../services/entityStore';
import { bookingsAPI, carsAPI } from '../../../services/api';
import { reviewService } from '../../../services/reviewService';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import { Grid } from '@mantine/core';
import AgencySidebar from '../../../components/layout/AgencySidebar';
import {
  DashboardIcon,
  CheckIcon,
  CalendarIcon,
  TokensIcon,
  PlusCircledIcon,
  ClipboardIcon,
  FileTextIcon,
} from '@radix-ui/react-icons';

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [agency, setAgency] = React.useState(null);
  const [agencyCars, setAgencyCars] = React.useState([]);
  const [agencyBookings, setAgencyBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const agencies = await entityStore.getAll('agencies');
        if (cancelled) return;
        let current = null;
        if (user?.id) {
          current = agencies.find((a) => a.ownerId === user.id) || null;
        }
        if (!current && agencies && agencies.length > 0) {
          current = agencies[0];
        }
        setAgency(current);
        if (!current) {
          setAgencyCars([]);
          setAgencyBookings([]);
          return;
        }
        const [cars, bookings] = await Promise.all([
          Promise.resolve(carsAPI.list()),
          bookingsAPI.listByAgency(current.id),
        ]);
        if (cancelled) return;
        setAgencyCars(cars.filter((c) => c.agencyId === current.id));
        setAgencyBookings(bookings);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const activeBookings = agencyBookings.filter((b) => b.status === 'confirmed');
  const totalRevenue = agencyBookings.reduce((sum, b) => {
    const gross = b.totalPrice || 0;
    const commission = b.commissionAmount || 0;
    return sum + (gross - commission);
  }, 0);
  const availableCars = agencyCars.filter((c) => c.available).length;

  const reviewStats = React.useMemo(() => {
    if (!agencyCars.length) {
      return { averageRating: 0, totalReviews: 0 };
    }
    let totalWeightedRating = 0;
    let totalReviews = 0;
    agencyCars.forEach((car) => {
      const { average, count } = reviewService.getByCarId(car.id);
      if (count && average) {
        totalWeightedRating += average * count;
        totalReviews += count;
      }
    });
    if (!totalReviews) return { averageRating: 0, totalReviews: 0 };
    const averageRating = Math.round((totalWeightedRating / totalReviews) * 10) / 10;
    return { averageRating, totalReviews };
  }, [agencyCars]);

  return (
    <div className="agency-dashboard">
      <div className="container">
        <div className="agency-layout">
          <AgencySidebar />
          <main className="agency-layout__main">
            {/* Header */}
            <div className="dashboard__header">
              <div>
                <h1 className="dashboard__title">
                  {agency ? `Welcome back, ${agency.agencyName}!` : 'Welcome to your agency dashboard'}
                </h1>
                <p className="dashboard__subtitle">
                  {agency ? 'Manage your fleet and bookings' : 'Register your agency to start managing your fleet'}
                </p>
              </div>
              {agency && (
                <Button variant="primary" onClick={() => navigate('/agency/add-car')}>
                  Add New Car
                </Button>
              )}
            </div>

            <Grid>
              {/* Stats Grid */}
              <Grid.Col span={{ base: 12 }}>
                <div className="dashboard__stats">
                  <Card>
                    <div className="stat-card">
                      <div className="stat-card__icon">
                        <DashboardIcon aria-hidden="true" />
                      </div>
                      <div className="stat-card__content">
                        <h3 className="stat-card__value">{agencyCars.length}</h3>
                        <p className="stat-card__label">Total Vehicles</p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="stat-card">
                      <div className="stat-card__icon">
                        <CheckIcon aria-hidden="true" />
                      </div>
                      <div className="stat-card__content">
                        <h3 className="stat-card__value">{availableCars}</h3>
                        <p className="stat-card__label">Available Now</p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="stat-card">
                      <div className="stat-card__icon">
                        <CalendarIcon aria-hidden="true" />
                      </div>
                      <div className="stat-card__content">
                        <h3 className="stat-card__value">{activeBookings.length}</h3>
                        <p className="stat-card__label">Active Bookings</p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="stat-card">
                      <div className="stat-card__icon">
                        <TokensIcon aria-hidden="true" />
                      </div>
                      <div className="stat-card__content">
                        <h3 className="stat-card__value">{totalRevenue} MAD</h3>
                        <p className="stat-card__label">Total Earnings</p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="stat-card">
                      <div className="stat-card__icon">
                        <CheckIcon aria-hidden="true" />
                      </div>
                      <div className="stat-card__content">
                        <h3 className="stat-card__value">
                          {reviewStats.averageRating} / 5
                        </h3>
                        <p className="stat-card__label">
                          Based on {reviewStats.totalReviews} review{reviewStats.totalReviews === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Grid.Col>

              {/* Recent Bookings */}
              <Grid.Col span={{ base: 12, xs: 7 }}>
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
                          const car = agencyCars.find((c) => c.id === booking.carId);
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
              </Grid.Col>

              {/* Fleet Overview */}
              <Grid.Col span={{ base: 12, xs: 5 }}>
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
                            <div className="fleet-item__icon">
                              <DashboardIcon aria-hidden="true" />
                            </div>
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
              </Grid.Col>
            </Grid>

            {/* Quick Actions */}
            <div className="dashboard__actions">
          <Card hoverable onClick={() => navigate('/agency/add-car')}>
            <div className="action-card">
              <div className="action-card__icon">
                <PlusCircledIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Add Vehicle</h3>
              <p className="action-card__desc">Add a new car to your fleet</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/manage-cars')}>
            <div className="action-card">
              <div className="action-card__icon">
                <DashboardIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Manage Fleet</h3>
              <p className="action-card__desc">View and edit your vehicles</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/booking-requests')}>
            <div className="action-card">
              <div className="action-card__icon">
                <FileTextIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Requests</h3>
              <p className="action-card__desc">Approve or decline pending bookings</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/bookings')}>
            <div className="action-card">
              <div className="action-card__icon">
                <ClipboardIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Bookings</h3>
              <p className="action-card__desc">Manage customer reservations</p>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/agency/earnings')}>
            <div className="action-card">
              <div className="action-card__icon">
                <TokensIcon aria-hidden="true" />
              </div>
              <h3 className="action-card__title">Earnings</h3>
              <p className="action-card__desc">View revenue and payouts</p>
            </div>
          </Card>
        </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
