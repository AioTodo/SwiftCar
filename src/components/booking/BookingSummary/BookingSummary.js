import React from 'react';
import { priceCalculator } from '../../../utils/priceCalculator';

const BookingSummary = ({ pricePerDay, pickup, dropoff, extras }) => {
  const days = priceCalculator.rentalDays(pickup, dropoff);
  const base = priceCalculator.basePrice(pricePerDay, pickup, dropoff);
  const extrasCost = priceCalculator.extrasCost(extras);
  const total = priceCalculator.totalPrice(pricePerDay, pickup, dropoff, extras);

  return (
    <div className="booking-summary">
      <div className="summary-row"><span>Days</span><span>{days}</span></div>
      <div className="summary-row"><span>Base</span><span>{base}</span></div>
      <div className="summary-row"><span>Extras</span><span>{extrasCost}</span></div>
      <div className="summary-row summary-row--total"><span>Total</span><span>{total}</span></div>
    </div>
  );
};

export default BookingSummary;
