import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { bookingsAPI, carsAPI } from '../../../services/api';
import agencies from '../../../data/agencies.json';
import users from '../../../data/users.json';

const AgencyBookingDetailPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [booking, setBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // bookingsAPI currently has listByAgency/updateStatus, so we fetch all and find the one we need
    const load = async () => {
      // In a real API we would call bookingsAPI.getById; for now, reuse listByAgency + data seeds.
      // For simplicity, read from localStorage via listByAgency for all agencies and find matching id.
      // To avoid extra complexity, we'll just scan listByAgency for each agency in mock data.
      const all = [];
      for (const agency of agencies) {
        // eslint-disable-next-line no-await-in-loop
        const list = await bookingsAPI.listByAgency(agency.id);
        all.push(...list);
      }
      const found = all.find((b) => String(b.id) === String(bookingId));
      if (!found) return;
      setBooking(found);

      const carData = await carsAPI.getById(found.carId);
      setCar(carData || null);

      const user = users.find((u) => u.id === found.userId);
      setCustomer(user || null);
    };

    load();
  }, [bookingId]);

  const handleStatusChange = async (status) => {
    if (!booking) return;
    const updated = await bookingsAPI.updateStatus(booking.id, status);
    setBooking(updated);
    showNotification({ type: 'success', message: `Booking marked as ${status}` });
  };

  if (!booking) {
    return (
      <div className="agency-booking-detail-page">
        <div className="container">
          <p>Loading booking...</p>
        </div>
      </div>
    );
  }

  const pickupDate = booking.pickup || booking.pickupDate;
  const dropoffDate = booking.dropoff || booking.returnDate;

  return (
    <div className="agency-booking-detail-page">
      <div className="container container--narrow">
        <div className="page-header page-header--with-back">
          <button
            type="button"
            className="back-link"
            onClick={() => navigate(-1)}
          >
            ← Back to bookings
          </button>
          <h1>Booking #{booking.id}</h1>
        </div>

        <div className="booking-detail-grid">
          {/* Summary */}
          <Card>
            <Card.Header>
              <h2>Booking Summary</h2>
            </Card.Header>
            <Card.Body>
              <div className="detail-row">
                <span className="detail-row__label">Status</span>
                <span className="detail-row__value">{booking.status}</span>
              </div>
              <div className="detail-row">
                <span className="detail-row__label">Pickup</span>
                <span className="detail-row__value">{pickupDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-row__label">Return</span>
                <span className="detail-row__value">{dropoffDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-row__label">Total Price</span>
                <span className="detail-row__value">{booking.totalPrice} MAD</span>
              </div>
            </Card.Body>
          </Card>

          {/* Car */}
          <Card>
            <Card.Header>
              <h2>Vehicle</h2>
            </Card.Header>
            <Card.Body>
              {car ? (
                <>
                  <div className="detail-row">
                    <span className="detail-row__label">Car</span>
                    <span className="detail-row__value">{car.brand} {car.model}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Year</span>
                    <span className="detail-row__value">{car.year}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">License Plate</span>
                    <span className="detail-row__value">{car.licensePlate}</span>
                  </div>
                </>
              ) : (
                <p className="text-muted">Vehicle information not available.</p>
              )}
            </Card.Body>
          </Card>

          {/* Customer */}
          <Card>
            <Card.Header>
              <h2>Customer</h2>
            </Card.Header>
            <Card.Body>
              {customer ? (
                <>
                  <div className="detail-row">
                    <span className="detail-row__label">Name</span>
                    <span className="detail-row__value">
                      {customer.firstName} {customer.lastName}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Email</span>
                    <span className="detail-row__value">{customer.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Phone</span>
                    <span className="detail-row__value">{customer.phone}</span>
                  </div>
                </>
              ) : (
                <p className="text-muted">Customer information not available.</p>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Actions */}
        <div className="booking-detail-actions">
          {booking.status === 'pending' && (
            <>
              <Button
                variant="outline"
                onClick={() => handleStatusChange('declined')}
              >
                Decline
              </Button>
              <Button
                variant="primary"
                onClick={() => handleStatusChange('confirmed')}
              >
                Approve
              </Button>
            </>
          )}

          {booking.status === 'confirmed' && (
            <>
              <Button
                variant="outline"
                onClick={() => handleStatusChange('cancelled')}
              >
                Cancel Booking
              </Button>
              <Button
                variant="primary"
                onClick={() => handleStatusChange('completed')}
              >
                Mark as Completed
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyBookingDetailPage;
