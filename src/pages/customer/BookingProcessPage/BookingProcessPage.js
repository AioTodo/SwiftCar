import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import DateRangePicker from '../../../components/booking/DateRangePicker/DateRangePicker';
import ExtrasSelector from '../../../components/booking/ExtrasSelector/ExtrasSelector';
import BookingSummary from '../../../components/booking/BookingSummary/BookingSummary';

const BookingProcessPage = () => {
  const navigate = useNavigate();
  const { state, updateBookingDetails, resetBooking } = useBooking();
  const { showNotification } = useNotification();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: state.dates.pickup || '',
    returnDate: state.dates.dropoff || '',
    extras: state.extras,
  });

  const car = state.selectedCar;

  if (!car) {
    return (
      <div className="page">
        <div className="container">
          <Card>
            <Card.Body>
              <h2>No Car Selected</h2>
              <p>Please select a car to continue booking.</p>
              <Button variant="primary" onClick={() => navigate('/search')}>
                Browse Cars
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setBookingData((prev) => ({
        ...prev,
        extras: { ...prev.extras, [name]: checked },
      }));
    } else {
      setBookingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!bookingData.pickupLocation || !bookingData.returnLocation || 
          !bookingData.pickupDate || !bookingData.returnDate) {
        showNotification({
          type: 'error',
          message: 'Please fill in all required fields',
        });
        return;
      }
    }
    
    updateBookingDetails(bookingData);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/customer/payment');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleCancel = () => {
    resetBooking();
    navigate('/search');
  };

  // Calculate pricing
  const numberOfDays = bookingData.pickupDate && bookingData.returnDate
    ? Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24))
    : 0;

  const basePrice = car.pricePerDay * numberOfDays;
  const insurancePrice = bookingData.extras.insurance ? 50 * numberOfDays : 0;
  const gpsPrice = bookingData.extras.gps ? 20 * numberOfDays : 0;
  const childSeatPrice = bookingData.extras.childSeat ? 15 * numberOfDays : 0;
  const additionalDriverPrice = bookingData.extras.additionalDriver ? 30 * numberOfDays : 0;
  const totalExtras = insurancePrice + gpsPrice + childSeatPrice + additionalDriverPrice;
  const totalPrice = basePrice + totalExtras;

  return (
    <div className="booking-process-page">
      <div className="container">
        <div className="booking-process__layout">
          {/* Main Content */}
          <div className="booking-process__main">
            {/* Progress Steps */}
            <div className="booking-steps">
              <div className={`booking-step ${currentStep >= 1 ? 'booking-step--active' : ''} ${currentStep > 1 ? 'booking-step--completed' : ''}`}>
                <div className="booking-step__number">{currentStep > 1 ? '✓' : '1'}</div>
                <div className="booking-step__label">Dates & Location</div>
              </div>
              <div className="booking-step__line"></div>
              <div className={`booking-step ${currentStep >= 2 ? 'booking-step--active' : ''} ${currentStep > 2 ? 'booking-step--completed' : ''}`}>
                <div className="booking-step__number">{currentStep > 2 ? '✓' : '2'}</div>
                <div className="booking-step__label">Extras</div>
              </div>
              <div className="booking-step__line"></div>
              <div className={`booking-step ${currentStep >= 3 ? 'booking-step--active' : ''}`}>
                <div className="booking-step__number">3</div>
                <div className="booking-step__label">Review</div>
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <Card.Header>
                <h2>
                  {currentStep === 1 && 'Select Dates & Locations'}
                  {currentStep === 2 && 'Add Extras'}
                  {currentStep === 3 && 'Review Your Booking'}
                </h2>
              </Card.Header>
              
              <Card.Body>
                {/* Step 1: Dates & Locations */}
                {currentStep === 1 && (
                  <div className="booking-form">
                    <div className="booking-form__row">
                      <Input
                        label="Pickup Location"
                        type="text"
                        name="pickupLocation"
                        value={bookingData.pickupLocation}
                        onChange={handleChange}
                        placeholder="Enter pickup location"
                        required
                      />
                      <Input
                        label="Return Location"
                        type="text"
                        name="returnLocation"
                        value={bookingData.returnLocation}
                        onChange={handleChange}
                        placeholder="Enter return location"
                        required
                      />
                    </div>
                    
                    <div className="booking-form__row">
                      <DateRangePicker
                        pickupDate={bookingData.pickupDate}
                        returnDate={bookingData.returnDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Extras */}
                {currentStep === 2 && (
                  <div className="booking-extras">
                    <ExtrasSelector
                      extras={bookingData.extras}
                      onToggle={(key, val) => handleChange({ target: { type: 'checkbox', name: key, checked: val } })}
                    />
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div className="booking-review">
                    <div className="review-section">
                      <h3>Car Details</h3>
                      <div className="review-item">
                        <span className="review-item__label">Vehicle:</span>
                        <span className="review-item__value">{car.brand} {car.model} ({car.year})</span>
                      </div>
                      <div className="review-item">
                        <span className="review-item__label">Category:</span>
                        <span className="review-item__value">{car.category}</span>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3>Booking Details</h3>
                      <div className="review-item">
                        <span className="review-item__label">Pickup:</span>
                        <span className="review-item__value">{bookingData.pickupLocation} - {bookingData.pickupDate}</span>
                      </div>
                      <div className="review-item">
                        <span className="review-item__label">Return:</span>
                        <span className="review-item__value">{bookingData.returnLocation} - {bookingData.returnDate}</span>
                      </div>
                      <div className="review-item">
                        <span className="review-item__label">Duration:</span>
                        <span className="review-item__value">{numberOfDays} day{numberOfDays > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <BookingSummary
                      pricePerDay={car.pricePerDay}
                      pickup={bookingData.pickupDate}
                      dropoff={bookingData.returnDate}
                      extras={{
                        insurance: bookingData.extras.insurance,
                        gps: bookingData.extras.gps,
                        childSeat: bookingData.extras.childSeat,
                        additionalDriver: bookingData.extras.additionalDriver,
                      }}
                    />

                    {totalExtras > 0 && (
                      <div className="review-section">
                        <h3>Selected Extras</h3>
                        {bookingData.extras.insurance && (
                          <div className="review-item">
                            <span className="review-item__label">Full Insurance</span>
                            <span className="review-item__value">{insurancePrice} MAD</span>
                          </div>
                        )}
                        {bookingData.extras.gps && (
                          <div className="review-item">
                            <span className="review-item__label">GPS Navigation</span>
                            <span className="review-item__value">{gpsPrice} MAD</span>
                          </div>
                        )}
                        {bookingData.extras.childSeat && (
                          <div className="review-item">
                            <span className="review-item__label">Child Seat</span>
                            <span className="review-item__value">{childSeatPrice} MAD</span>
                          </div>
                        )}
                        {bookingData.extras.additionalDriver && (
                          <div className="review-item">
                            <span className="review-item__label">Additional Driver</span>
                            <span className="review-item__value">{additionalDriverPrice} MAD</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card.Body>

              <Card.Footer>
                <div className="booking-actions">
                  <Button variant="text" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <div className="booking-actions__right">
                    {currentStep > 1 && (
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    <Button variant="primary" onClick={handleNext}>
                      {currentStep === 3 ? 'Proceed to Payment' : 'Next'}
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </div>

          {/* Price Summary Sidebar */}
          <aside className="booking-process__sidebar">
            <Card className="price-summary">
              <Card.Header>
                <h3>Price Summary</h3>
              </Card.Header>
              <Card.Body>
                <div className="price-item">
                  <span>Car Rental ({numberOfDays} day{numberOfDays > 1 ? 's' : ''})</span>
                  <strong>{basePrice} MAD</strong>
                </div>
                
                {totalExtras > 0 && (
                  <>
                    <div className="price-divider"></div>
                    <div className="price-item price-item--small">
                      <span>Extras</span>
                      <strong>{totalExtras} MAD</strong>
                    </div>
                  </>
                )}
                
                <div className="price-divider"></div>
                <div className="price-item price-item--total">
                  <span>Total</span>
                  <strong>{totalPrice} MAD</strong>
                </div>
              </Card.Body>
            </Card>

            {/* Car Info */}
            <Card className="car-summary">
              <div className="car-summary__image">🚗</div>
              <div className="car-summary__details">
                <h4>{car.brand} {car.model}</h4>
                <p>{car.year} • {car.category}</p>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingProcessPage;
