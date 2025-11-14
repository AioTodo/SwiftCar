import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { priceCalculator } from '../../../utils/priceCalculator';
import bookingsSeed from '../../../data/bookings.json';
import agencies from '../../../data/agencies.json';

const AgencyEarningsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const agency = agencies.find((a) => a.ownerId === user?.id) || agencies[0];

  useEffect(() => {
    // For now we use the seeded bookings JSON; in the future this can be wired to bookingsAPI/entityStore.
    const agencyBookings = bookingsSeed.filter((b) => b.agencyId === agency?.id);
    setBookings(agencyBookings);
  }, [agency?.id]);

  const summary = useMemo(() => {
    if (!bookings.length) {
      return {
        totalGross: 0,
        totalCommission: 0,
        totalNet: 0,
        totalBookings: 0,
        completedBookings: 0,
      };
    }

    const totalGross = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalCommission = bookings.reduce((sum, b) => sum + (b.commissionAmount || priceCalculator.commission(b.totalPrice || 0)), 0);
    const totalNet = totalGross - totalCommission;
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;

    return { totalGross, totalCommission, totalNet, totalBookings, completedBookings };
  }, [bookings]);

  return (
    <div className="agency-earnings-page">
      <div className="container">
        <div className="page-header">
          <h1>Earnings</h1>
          <p className="text-muted">Overview of revenue, commissions, and net earnings for your agency.</p>
        </div>

        {/* Summary cards */}
        <div className="dashboard__stats">
          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">💰</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalNet} MAD</h3>
                <p className="stat-card__label">Net Earnings</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">📈</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalGross} MAD</h3>
                <p className="stat-card__label">Gross Revenue</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">🏦</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalCommission} MAD</h3>
                <p className="stat-card__label">Commission Paid</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">📋</div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalBookings}</h3>
                <p className="stat-card__label">Total Bookings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <Card.Header>
            <div className="card-header-with-action">
              <h2>Booking Earnings</h2>
              <Button variant="text" size="small" type="button">
                Export (coming soon)
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {bookings.length === 0 ? (
              <div className="empty-state">
                <h3>No earnings yet</h3>
                <p>You will see earnings here once customers complete bookings with your agency.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="table table--earnings">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Dates</th>
                      <th>Status</th>
                      <th>Gross (MAD)</th>
                      <th>Commission (MAD)</th>
                      <th>Net (MAD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const gross = b.totalPrice || 0;
                      const commission = b.commissionAmount || priceCalculator.commission(gross);
                      const net = gross - commission;
                      return (
                        <tr key={b.id}>
                          <td>{b.id}</td>
                          <td>
                            <div className="text-small">
                              {b.pickupDate} → {b.returnDate}
                            </div>
                          </td>
                          <td>{b.status}</td>
                          <td>{gross}</td>
                          <td>{commission}</td>
                          <td>{net}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AgencyEarningsPage;
