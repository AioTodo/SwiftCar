import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { bookingsAPI, carsAPI } from '../../../services/api';
import agencies from '../../../data/agencies.json';
import AgencySidebar from '../../../components/layout/AgencySidebar';

const AgencyBookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, confirmed, completed, cancelled, declined
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  const agency = agencies.find((a) => a.ownerId === user?.id) || agencies[0];

  useEffect(() => {
    if (!agency?.id) return;
    Promise.resolve(bookingsAPI.listByAgency(agency.id)).then(setBookings);
    Promise.resolve(carsAPI.list()).then(setCars);
  }, [agency?.id]);

  const filteredBookings =
    statusFilter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status--pending';
      case 'confirmed':
        return 'status--confirmed';
      case 'completed':
        return 'status--completed';
      case 'cancelled':
        return 'status--cancelled';
      case 'declined':
        return 'status--declined';
      default:
        return '';
    }
  };

  const handleCancel = async (bookingId) => {
    const updated = await bookingsAPI.cancel(bookingId);
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
    showNotification({ type: 'success', message: 'Booking cancelled for this customer' });
  };

  return (
    <div className="agency-bookings-page">
      <div className="container">
        <div className="agency-layout">
          <AgencySidebar />
          <main className="agency-layout__main">
            <div className="page-header">
              <h1>All Bookings</h1>
              <p className="text-muted">View and manage all bookings for your agency</p>
            </div>

        {/* Filters */}
        <div className="bookings-filters">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'declined'].map((status) => (
            <button
              key={status}
              type="button"
              className={`bookings-filter ${
                statusFilter === status ? 'bookings-filter--active' : ''
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'all'
                ? ` (${bookings.length})`
                : ` (${bookings.filter((b) => b.status === status).length})`}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <Card>
              <Card.Body>
                <div className="empty-state">
                  <h3>No bookings found</h3>
                  <p>There are no bookings matching this filter yet.</p>
                </div>
              </Card.Body>
            </Card>
          ) : (
            filteredBookings.map((booking) => {
              const car = cars.find((c) => c.id === booking.carId);
              const pickupDate = booking.pickup || booking.pickupDate;
              const dropoffDate = booking.dropoff || booking.returnDate;

              return (
                <Card key={booking.id} className="booking-row">
                  <div className="booking-row__main">
                    <div className="booking-row__left">
                      <div className="booking-row__icon">🚗</div>
                      <div className="booking-row__info">
                        <div className="booking-row__id">Booking #{booking.id}</div>
                        <div className="booking-row__car">
                          {car ? `${car.brand} ${car.model}` : 'Car'}
                        </div>
                        <div className="booking-row__dates text-small text-muted">
                          {pickupDate} → {dropoffDate}
                        </div>
                      </div>
                    </div>

                    <div className="booking-row__center">
                      <div className="booking-row__label">Total</div>
                      <div className="booking-row__value">{booking.totalPrice} MAD</div>
                    </div>

                    <div className="booking-row__right">
                      <span className={`booking-status ${getStatusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                      <div className="booking-row__actions">
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => navigate(`/agency/booking/${booking.id}`)}
                        >
                          View Details
                        </Button>
                        {booking.status === 'confirmed' && (
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
          </main>
      </div>
      </div>
    </div>
  );
};

export default AgencyBookingsPage;
