import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { Grid } from '@mantine/core';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';
import {
  Users,
  Building2,
  Car,
  Calendar,
  DollarSign,
  Star,
} from 'lucide-react';
import StatsGrid from '../../../components/dashboard/StatsGrid';

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
            <Grid>
              {/* Top stats */}
              <Grid.Col span={{ base: 12 }}>
                <StatsGrid
                  data={[
                    {
                      title: 'Total users',
                      icon: Users,
                      value: stats.totalUsers,
                      diff: 4,
                    },
                    {
                      title: 'Agencies',
                      icon: Building2,
                      value: stats.totalAgencies,
                      diff: 2,
                    },
                    {
                      title: 'Vehicles',
                      icon: Car,
                      value: stats.totalCars,
                      diff: 6,
                    },
                    {
                      title: 'Total revenue (mock)',
                      icon: DollarSign,
                      value: `${stats.totalRevenue} MAD`,
                      diff: 10,
                    },
                  ]}
                />
              </Grid.Col>

              {/* Secondary panels */}
              <Grid.Col span={{ base: 12, xs: 7 }}>
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
                                {booking.pickupDate}  {booking.returnDate}
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
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 5 }}>
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
                                <Star size={16} fill="currentColor" aria-hidden="true" /> {agency.rating}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
