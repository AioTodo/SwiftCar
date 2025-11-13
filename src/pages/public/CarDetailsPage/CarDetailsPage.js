import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useBooking } from '../../../context/BookingContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Modal from '../../../components/common/Modal';
import carsData from '../../../data/cars.json';
import agenciesData from '../../../data/agencies.json';
import ReviewList from '../../../components/reviews/ReviewList';
import { reviewService } from '../../../services/reviewService';

const CarDetailsPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { startBooking } = useBooking();
  const { showNotification } = useNotification();
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDates, setBookingDates] = useState({
    pickupDate: '',
    returnDate: '',
  });

  const car = carsData.find((c) => c.id === carId);
  const agency = car ? agenciesData.find((a) => a.id === car.agencyId) : null;

  if (!car) {
    return (
      <div className="page">
        <div className="container">
          <Card className="car-not-found">
            <h2>Car Not Found</h2>
            <p>The car you're looking for doesn't exist or has been removed.</p>
            <Button variant="primary" onClick={() => navigate('/search')}>
              Browse All Cars
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      showNotification({
        type: 'warning',
        message: 'Please login to book a car',
      });
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingDates.pickupDate || !bookingDates.returnDate) {
      showNotification({
        type: 'error',
        message: 'Please select pickup and return dates',
      });
      return;
    }

    const pickup = new Date(bookingDates.pickupDate);
    const returnDate = new Date(bookingDates.returnDate);
    
    if (returnDate <= pickup) {
      showNotification({
        type: 'error',
        message: 'Return date must be after pickup date',
      });
      return;
    }

    startBooking(car);
    showNotification({
      type: 'success',
      message: 'Proceeding to booking...',
    });
    navigate('/customer/booking-process');
  };

  const numberOfDays = bookingDates.pickupDate && bookingDates.returnDate
    ? Math.ceil((new Date(bookingDates.returnDate) - new Date(bookingDates.pickupDate)) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = numberOfDays > 0 ? car.pricePerDay * numberOfDays : 0;

  return (
    <div className="car-details-page">
      <div className="container">
        {/* Car Images */}
        <div className="car-details__images">
          <div className="car-details__main-image">
            <div className="car-details__image-placeholder">🚗</div>
          </div>
        </div>

        <div className="car-details__layout">
          {/* Main Content */}
          <div className="car-details__main">
            {/* Car Header */}
            <div className="car-details__header">
              <div>
                <h1 className="car-details__title">
                  {car.brand} {car.model}
                </h1>
                <p className="car-details__subtitle">
                  {car.year} • {car.category} • {car.location}
                </p>
              </div>
              <div className="car-details__rating">
                <span className="car-details__rating-value">⭐ {car.rating}</span>
                <span className="car-details__rating-count">({car.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <Card.Header>
                <h2>About this car</h2>
              </Card.Header>
              <Card.Body>
                <p>{car.description}</p>
              </Card.Body>
            </Card>

            {/* Features */}
            <Card>
              <Card.Header>
                <h2>Features & Amenities</h2>
              </Card.Header>
              <Card.Body>
                <div className="car-details__features-grid">
                  {car.features.map((feature, index) => (
                    <div key={index} className="car-details__feature">
                      <span className="car-details__feature-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Agency Info */}
            {agency && (
              <Card>
                <Card.Header>
                  <h2>Provided by</h2>
                </Card.Header>
                <Card.Body>
                  <div className="car-details__agency">
                    <div>
                      <h3 className="car-details__agency-name">{agency.agencyName}</h3>
                      <p className="car-details__agency-location">📍 {agency.city}, {agency.country}</p>
                      <p className="car-details__agency-rating">⭐ {agency.rating} ({agency.totalBookings} bookings)</p>
                    </div>
                    <div className="car-details__agency-contact">
                      <p>📧 {agency.email}</p>
                      <p>📞 {agency.phone}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Reviews */}
            <CarReviews carId={car.id} />
          </div>

          {/* Booking Sidebar */}
          <aside className="car-details__sidebar">
            <Card className="booking-card">
              <Card.Body>
                <div className="booking-card__price">
                  <span className="booking-card__price-amount">{car.pricePerDay} MAD</span>
                  <span className="booking-card__price-label">per day</span>
                </div>

                <div className="booking-card__status">
                  {car.available ? (
                    <span className="booking-card__available">✓ Available</span>
                  ) : (
                    <span className="booking-card__unavailable">✕ Not Available</span>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handleBookNow}
                  disabled={!car.available}
                >
                  Book Now
                </Button>

                <div className="booking-card__info">
                  <p className="text-small text-muted">
                    • Free cancellation up to 48 hours before pickup
                  </p>
                  <p className="text-small text-muted">
                    • Instant booking confirmation
                  </p>
                  <p className="text-small text-muted">
                    • 24/7 customer support
                  </p>
                </div>
              </Card.Body>
            </Card>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Select Your Dates"
        size="medium"
      >
        <div className="booking-modal">
          <div className="booking-modal__field">
            <label className="booking-modal__label">Pickup Date</label>
            <input
              type="date"
              value={bookingDates.pickupDate}
              onChange={(e) => setBookingDates({ ...bookingDates, pickupDate: e.target.value })}
              className="booking-modal__input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="booking-modal__field">
            <label className="booking-modal__label">Return Date</label>
            <input
              type="date"
              value={bookingDates.returnDate}
              onChange={(e) => setBookingDates({ ...bookingDates, returnDate: e.target.value })}
              className="booking-modal__input"
              min={bookingDates.pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>

          {numberOfDays > 0 && (
            <div className="booking-modal__summary">
              <div className="booking-modal__summary-row">
                <span>Duration:</span>
                <strong>{numberOfDays} day{numberOfDays > 1 ? 's' : ''}</strong>
              </div>
              <div className="booking-modal__summary-row">
                <span>Price per day:</span>
                <strong>{car.pricePerDay} MAD</strong>
              </div>
              <div className="booking-modal__summary-row booking-modal__summary-total">
                <span>Total:</span>
                <strong>{totalPrice} MAD</strong>
              </div>
            </div>
          )}

          <div className="booking-modal__actions">
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmBooking}>
              Continue to Booking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const CarReviews = ({ carId }) => {
  const { items, average, count } = reviewService.getByCarId(carId);
  return (
    <Card>
      <Card.Header>
        <h2>Customer Reviews</h2>
      </Card.Header>
      <Card.Body>
        <ReviewList items={items} average={average} count={count} />
      </Card.Body>
    </Card>
  );
};

export default CarDetailsPage;
