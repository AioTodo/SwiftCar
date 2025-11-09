import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const BookingContext = createContext();

const INITIAL_STATE = {
  currentBooking: null,
  selectedCar: null,
  dates: {
    pickup: '',
    dropoff: '',
  },
  extras: {
    insurance: false,
    gps: false,
    childSeat: false,
    additionalDriver: false,
  },
};

export const BookingProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const startBooking = useCallback((car) => {
    setState((prev) => ({
      ...prev,
      selectedCar: car,
      currentBooking: {
        id: `booking-${Date.now()}`,
        carId: car.id,
        status: 'pending',
      },
    }));
  }, []);

  const updateBookingDetails = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetBooking = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const value = useMemo(
    () => ({
      state,
      startBooking,
      updateBookingDetails,
      resetBooking,
    }),
    [state, startBooking, updateBookingDetails, resetBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
