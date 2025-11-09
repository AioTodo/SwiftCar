import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Loader from '../../../components/common/Loader';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, resetBooking } = useBooking();
  const { showNotification } = useNotification();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const car = state.selectedCar;

  if (!car) {
    navigate('/search');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!paymentData.cardName) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }
    
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      showNotification({
        type: 'success',
        message: 'Booking confirmed! Check your email for details.',
      });
      
      resetBooking();
      navigate('/customer/dashboard');
    }, 2500);
  };

  // Mock pricing calculation
  const basePrice = 1500;
  const extrasPrice = 200;
  const totalPrice = basePrice + extrasPrice;

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-page__layout">
          {/* Main Content */}
          <div className="payment-page__main">
            <Card>
              <Card.Header>
                <h2>Payment Information</h2>
                <p className="text-muted">Enter your card details to complete booking</p>
              </Card.Header>
              
              <Card.Body>
                <form onSubmit={handleSubmit} className="payment-form">
                  <Input
                    label="Card Number"
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                    error={errors.cardNumber}
                    required
                  />
                  
                  <Input
                    label="Cardholder Name"
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.cardName}
                    required
                  />
                  
                  <div className="payment-form__row">
                    <Input
                      label="Expiry Date"
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      error={errors.expiryDate}
                      required
                    />
                    
                    <Input
                      label="CVV"
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="3"
                      error={errors.cvv}
                      required
                    />
                  </div>

                  <div className="payment-form__demo">
                    <p className="text-small text-muted">Demo Mode - Use any card details</p>
                  </div>
                  
                  <div className="payment-form__actions">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/customer/booking-process')}
                      disabled={isProcessing}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ${totalPrice} MAD`}
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>

            {/* Security Info */}
            <Card className="security-info">
              <div className="security-item">
                <span className="security-item__icon">🔒</span>
                <div>
                  <h4>Secure Payment</h4>
                  <p className="text-small text-muted">Your payment information is encrypted and secure</p>
                </div>
              </div>
              <div className="security-item">
                <span className="security-item__icon">✓</span>
                <div>
                  <h4>Instant Confirmation</h4>
                  <p className="text-small text-muted">Receive booking confirmation immediately</p>
                </div>
              </div>
              <div className="security-item">
                <span className="security-item__icon">📧</span>
                <div>
                  <h4>Email Receipt</h4>
                  <p className="text-small text-muted">Booking details sent to your email</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <aside className="payment-page__sidebar">
            <Card className="booking-summary">
              <Card.Header>
                <h3>Booking Summary</h3>
              </Card.Header>
              <Card.Body>
                <div className="summary-car">
                  <div className="summary-car__image">🚗</div>
                  <div>
                    <h4>{car.brand} {car.model}</h4>
                    <p className="text-small text-muted">{car.year} • {car.category}</p>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-details">
                  <div className="summary-row">
                    <span className="text-small">Car Rental</span>
                    <strong>{basePrice} MAD</strong>
                  </div>
                  <div className="summary-row">
                    <span className="text-small">Extras</span>
                    <strong>{extrasPrice} MAD</strong>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>{totalPrice} MAD</strong>
                </div>
              </Card.Body>
            </Card>
          </aside>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="payment-processing">
          <Loader size="large" text="Processing your payment..." fullScreen />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
