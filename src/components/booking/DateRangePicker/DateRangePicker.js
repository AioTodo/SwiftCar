import React from 'react';
import Input from '../../common/Input';

const DateRangePicker = ({ pickupDate, returnDate, onChange, minPickup, minReturn }) => {
  return (
    <div className="date-range-picker">
      <Input
        label="Pickup Date"
        type="date"
        name="pickupDate"
        value={pickupDate}
        onChange={onChange}
        min={minPickup || new Date().toISOString().split('T')[0]}
        required
      />
      <Input
        label="Return Date"
        type="date"
        name="returnDate"
        value={returnDate}
        onChange={onChange}
        min={returnDate ? pickupDate : (pickupDate || new Date().toISOString().split('T')[0])}
        required
      />
    </div>
  );
};

export default DateRangePicker;
