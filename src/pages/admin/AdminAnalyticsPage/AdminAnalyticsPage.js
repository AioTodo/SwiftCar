import React, { useMemo } from 'react';
import Card from '../../../components/common/Card';
import bookings from '../../../data/bookings.json';
import agencies from '../../../data/agencies.json';
import cars from '../../../data/cars.json';
import AdminSidebar from '../../../components/layout/AdminSidebar';

const groupBy = (list, getKey) => {
  return list.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};

const AdminAnalyticsPage = () => {
  const metrics = useMemo(() => {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalCommission = bookings.reduce(
      (sum, b) => sum + (b.commissionAmount || 0),
      0
    );

    const bookingsByStatus = groupBy(bookings, (b) => b.status || 'unknown');

    const bookingsByAgency = groupBy(bookings, (b) => b.agencyId || 'unknown');
    const agencySummaries = Object.entries(bookingsByAgency).map(([agencyId, items]) => {
      const agency = agencies.find((a) => a.id === agencyId);
      const gross = items.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      const commission = items.reduce(
        (sum, b) => sum + (b.commissionAmount || 0),
        0
      );
      return {
        agencyId,
        name: agency ? agency.agencyName : agencyId,
        city: agency ? agency.city : '',
        bookings: items.length,
        gross,
        commission,
      };
    });

    agencySummaries.sort((a, b) => b.bookings - a.bookings);

    const carsByAgency = groupBy(cars, (c) => c.agencyId || 'unknown');
    const fleetSummary = Object.entries(carsByAgency).map(([agencyId, items]) => {
      const agency = agencies.find((a) => a.id === agencyId);
      return {
        agencyId,
        name: agency ? agency.agencyName : agencyId,
        city: agency ? agency.city : '',
        cars: items.length,
      };
    });

    return {
      totalBookings,
      totalRevenue,
      totalCommission,
      bookingsByStatus,
      agencySummaries,
      fleetSummary,
    };
  }, []);

  return (
    <section className="page page--admin-analytics">
      <div className="page__container admin-analytics">
        <header className="page-header">
          <h1 className="page__title">Analytics</h1>
          <p className="page__description">
            High-level metrics for bookings, revenue, and agency performance. Based on current mock data.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

        {/* Top-level numbers */}
        <div className="admin-dashboard__stats-grid">
          <Card>
            <Card.Body className="stat-card">
              <div className="stat-card__icon">📅</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Total Bookings</div>
                <div className="stat-card__value">{metrics.totalBookings}</div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="stat-card">
              <div className="stat-card__icon">💰</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Total Revenue</div>
                <div className="stat-card__value">{metrics.totalRevenue} MAD</div>
                <div className="stat-card__meta">
                  Commission: {metrics.totalCommission} MAD
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="admin-dashboard__panels">
          {/* Bookings by status */}
          <Card className="admin-panel">
            <Card.Header>
              <h2>Bookings by Status</h2>
            </Card.Header>
            <Card.Body>
              {metrics.totalBookings === 0 ? (
                <p className="text-muted">No bookings in mock data.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="table table--admin-analytics">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(metrics.bookingsByStatus).map(([status, items]) => (
                        <tr key={status}>
                          <td className="text-capitalize">{status}</td>
                          <td>{items.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Top agencies by bookings */}
          <Card className="admin-panel">
            <Card.Header>
              <h2>Top Agencies by Bookings</h2>
            </Card.Header>
            <Card.Body>
              {metrics.agencySummaries.length === 0 ? (
                <p className="text-muted">No bookings yet.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="table table--admin-analytics">
                    <thead>
                      <tr>
                        <th>Agency</th>
                        <th>Location</th>
                        <th>Bookings</th>
                        <th>Gross (MAD)</th>
                        <th>Commission (MAD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.agencySummaries.map((row) => (
                        <tr key={row.agencyId}>
                          <td>{row.name}</td>
                          <td className="text-small">
                            {row.city}
                          </td>
                          <td>{row.bookings}</td>
                          <td>{row.gross}</td>
                          <td>{row.commission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Fleet size by agency */}
          <Card className="admin-panel">
            <Card.Header>
              <h2>Fleet Size by Agency</h2>
            </Card.Header>
            <Card.Body>
              {metrics.fleetSummary.length === 0 ? (
                <p className="text-muted">No vehicles in mock data.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="table table--admin-analytics">
                    <thead>
                      <tr>
                        <th>Agency</th>
                        <th>Location</th>
                        <th>Vehicles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.fleetSummary.map((row) => (
                        <tr key={row.agencyId}>
                          <td>{row.name}</td>
                          <td className="text-small">{row.city}</td>
                          <td>{row.cars}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAnalyticsPage;
