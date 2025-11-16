import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import { bookingsAPI, carsAPI } from '../../../services/api';
import { reviewService } from '../../../services/reviewService';
import { DashboardIcon, CalendarIcon } from '@radix-ui/react-icons';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [reviewsByBooking, setReviewsByBooking] = useState({});

  React.useEffect(() => {
    if (!user?.id) return;
    Promise.resolve(bookingsAPI.listByUser(user.id)).then((list) => {
      setBookings(list);
      // Build a quick lookup of reviews keyed by bookingId so we can show review status
      const map = {};
      list.forEach((bk) => {
        const review = reviewService.getByBookingId(bk.id);
        if (review) {
          map[bk.id] = review;
        }
      });
      setReviewsByBooking(map);
    });
    Promise.resolve(carsAPI.list()).then((list) => setCars(list));
  }, [user?.id]);

  const filteredBookings = activeTab === 'all'
    ? bookings
    : activeTab === 'upcoming'
    ? bookings.filter((b) => b.status === 'confirmed')
    : activeTab === 'completed'
    ? bookings.filter((b) => b.status === 'completed')
    : bookings.filter((b) => b.status === 'cancelled');

  const handleCancelBooking = async (bookingId) => {
    const updated = await bookingsAPI.cancel(bookingId);
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
    showNotification({ type: 'success', message: 'Booking cancelled successfully' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status--confirmed';
      case 'completed':
        return 'status--completed';
      case 'cancelled':
        return 'status--cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="my-bookings__header">
          <h1>My Bookings</h1>
          <Button variant="primary" onClick={() => navigate('/search')}>
            Book New Car
          </Button>
        </div>

        {/* Tabs */}
        <div className="bookings-tabs">
          <button
            className={`bookings-tab ${activeTab === 'all' ? 'bookings-tab--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({bookings.length})
          </button>
          <button
            className={`bookings-tab ${activeTab === 'upcoming' ? 'bookings-tab--active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            className={`bookings-tab ${activeTab === 'completed' ? 'bookings-tab--active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({bookings.filter((b) => b.status === 'completed').length})
          </button>
          <button
            className={`bookings-tab ${activeTab === 'cancelled' ? 'bookings-tab--active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <Card>
              <Card.Body>
                <div className="bookings-empty">
                  <h3>No bookings found</h3>
                  <p>You don't have any {activeTab !== 'all' ? activeTab : ''} bookings yet.</p>
                  <Button variant="primary" onClick={() => navigate('/search')}>
                    Browse Cars
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            filteredBookings.map((booking) => {
              const car = cars.find((c) => c.id === booking.carId);
              const review = reviewsByBooking[booking.id];
              
              return (
                <Card key={booking.id} className="booking-card-item">
                  <div className="booking-card-item__header">
                    <div>
                      <div className="booking-card-item__id">Booking #{booking.id}</div>
                      <div className={`booking-status ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                    </div>
                      <div className="booking-card-item__date">
                      {/* Optional: booking.createdAt */}
                    </div>
                  </div>

                  <div className="booking-card-item__body">
                    <div className="booking-car-info">
                      <div className="booking-car-info__image">
                        <DashboardIcon aria-hidden="true" />
                      </div>
                      <div className="booking-car-info__details">
                        <h3>{car ? `${car.brand} ${car.model}` : 'Car'}</h3>
                        <p className="text-small text-muted">
                          {car ? `${car.year} • ${car.category}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="booking-details-grid">
                      <div className="booking-detail">
                        <span className="booking-detail__label">Pickup</span>
                        <span className="booking-detail__value">
                          <CalendarIcon aria-hidden="true" /> {booking.pickup || booking.pickupDate}
                          <br />
                        </span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Return</span>
                        <span className="booking-detail__value">
                          <CalendarIcon aria-hidden="true" /> {booking.dropoff || booking.returnDate}
                          <br />
                        </span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Duration</span>
                        <span className="booking-detail__value">
                          {/* Could compute days if needed */}
                        </span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Total Price</span>
                        <span className="booking-detail__value booking-detail__value--price">
                          {booking.totalPrice} MAD
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-card-item__footer">
                    {review && (
                      <span className="booking-card-item__review text-small text-muted">
                        Rated {review.rating}/5
                      </span>
                    )}
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => navigate(`/customer/booking/${booking.id}`)}
                    >
                      View Details
                    </Button>
                    
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                    
                    {booking.status === 'completed' && !review && (
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => navigate(`/customer/write-review/${booking.id}`)}
                      >
                        Write Review
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
