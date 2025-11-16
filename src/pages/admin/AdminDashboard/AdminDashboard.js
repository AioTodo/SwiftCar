import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';
import {
  PersonIcon,
  HomeIcon,
  DashboardIcon,
  CalendarIcon,
  TokensIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [usersList, agenciesList, bookingsList, carsList] = await Promise.all([
        entityStore.getAll('users'),
        entityStore.getAll('agencies'),
        entityStore.getAll('bookings'),
        entityStore.getAll('cars'),
      ]);
      if (cancelled) return;
      setUsers(usersList || []);
      setAgencies(agenciesList || []);
      setBookings(bookingsList || []);
      setCars(carsList || []);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalAgencies = agencies.length;
    const totalCars = cars.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const activeUsers = users.filter((u) => (u.accountStatus || 'active') === 'active').length;
    const verifiedAgencies = agencies.filter((a) => a.verificationStatus === 'verified').length;
    const pendingAgencies = agencies.filter((a) => a.verificationStatus !== 'verified').length;

    return {
      totalUsers,
      totalAgencies,
      totalCars,
      totalBookings,
      totalRevenue,
      activeUsers,
      verifiedAgencies,
      pendingAgencies,
    };
  }, [users, agencies, cars, bookings]);

  const recentBookings = useMemo(
    () => (bookings || []).slice(0, 5),
    [bookings]
  );

  const topAgencies = useMemo(
    () =>
      [...agencies]
        .sort((a, b) => (b.totalBookings || 0) - (a.totalBookings || 0))
        .slice(0, 5),
    [agencies]
  );

  return (
    <section className="page page--admin-dashboard">
      <div className="page__container admin-dashboard">
        {/* Page header */}
        <header className="admin-dashboard__header">
          <div>
            <h1 className="page__title">Admin Dashboard</h1>
            <p className="page__description">
              Monitor platform health and manage agencies, users, and content.
            </p>
          </div>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          {/* Main admin content */}
          <main className="admin-dashboard__main">
            {/* Top stats */}
            <div className="admin-dashboard__stats-grid">
              <Card>
                <Card.Body className="stat-card">
                  <div className="stat-card__icon">
                    <PersonIcon aria-hidden="true" />
                  </div>
                  <div className="stat-card__content">
                    <div className="stat-card__label">Total Users</div>
                    <div className="stat-card__value">{stats.totalUsers}</div>
                    <div className="stat-card__meta">{stats.activeUsers} active</div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="stat-card">
                  <div className="stat-card__icon">
                    <HomeIcon aria-hidden="true" />
                  </div>
                  <div className="stat-card__content">
                    <div className="stat-card__label">Agencies</div>
                    <div className="stat-card__value">{stats.totalAgencies}</div>
                    <div className="stat-card__meta">
                      {stats.verifiedAgencies} verified
                      {stats.pendingAgencies > 0 && ` • ${stats.pendingAgencies} pending`}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="stat-card">
                  <div className="stat-card__icon">
                    <DashboardIcon aria-hidden="true" />
                  </div>
                  <div className="stat-card__content">
                    <div className="stat-card__label">Vehicles</div>
                    <div className="stat-card__value">{stats.totalCars}</div>
                    <div className="stat-card__meta">Across all agencies</div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="stat-card">
                  <div className="stat-card__icon">
                    <CalendarIcon aria-hidden="true" />
                  </div>
                  <div className="stat-card__content">
                    <div className="stat-card__label">Total Bookings</div>
                    <div className="stat-card__value">{stats.totalBookings}</div>
                    <div className="stat-card__meta">Platform-wide</div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="stat-card">
                  <div className="stat-card__icon">
                    <TokensIcon aria-hidden="true" />
                  </div>
                  <div className="stat-card__content">
                    <div className="stat-card__label">Total Revenue (mock)</div>
                    <div className="stat-card__value">{stats.totalRevenue} MAD</div>
                    <div className="stat-card__meta">From all completed bookings</div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Secondary panels */}
            <div className="admin-dashboard__panels">
              <Card className="admin-panel">
                <Card.Header>
                  <div className="card-header-with-action">
                    <h2>Recent Bookings</h2>
                    <Button variant="text" size="small" disabled>
                      View all (admin view coming soon)
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  {recentBookings.length === 0 ? (
                    <p className="text-muted">No bookings in mock data yet.</p>
                  ) : (
                    <ul className="admin-list admin-list--bookings">
                      {recentBookings.map((booking) => (
                        <li key={booking.id} className="admin-list__item">
                          <div className="admin-list__primary">
                            <span className="admin-list__id">#{booking.id}</span>
                            <span className="admin-list__dates">
                              {booking.pickupDate} → {booking.returnDate}
                            </span>
                          </div>
                          <div className="admin-list__secondary">
                            <span className="admin-list__status">{booking.status}</span>
                            <span className="admin-list__amount">{booking.totalPrice} MAD</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>

              <Card className="admin-panel">
                <Card.Header>
                  <div className="card-header-with-action">
                    <h2>Top Agencies</h2>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => navigate('/admin/agencies')}
                    >
                      View agencies
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  {topAgencies.length === 0 ? (
                    <p className="text-muted">No agencies in mock data yet.</p>
                  ) : (
                    <ul className="admin-list admin-list--agencies">
                      {topAgencies.map((agency) => (
                        <li key={agency.id} className="admin-list__item">
                          <div className="admin-list__primary">
                            <span className="admin-list__name">{agency.agencyName}</span>
                            <span className="admin-list__location">
                              {agency.city}, {agency.country}
                            </span>
                          </div>
                          <div className="admin-list__secondary">
                            <span className="admin-list__metric">
                              {agency.totalBookings} bookings
                            </span>
                            <span className="admin-list__rating">
                              <StarFilledIcon aria-hidden="true" /> {agency.rating}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
