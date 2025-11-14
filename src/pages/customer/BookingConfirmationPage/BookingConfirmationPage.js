import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Paper, Title, Text, Group, Button, Stack } from '@mantine/core';
import { bookingsAPI, carsAPI } from '../../../services/api';

const BookingConfirmationPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const foundBooking = await bookingsAPI.getById(bookingId);
        if (!isMounted) return;

        if (!foundBooking) {
          setBooking(null);
          setCar(null);
          setLoading(false);
          return;
        }

        setBooking(foundBooking);
        const foundCar = await carsAPI.getById(foundBooking.carId);
        if (!isMounted) return;
        setCar(foundCar || null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  if (loading) {
    return (
      <div className="page page--narrow">
        <Container size="sm">
          <Text>Loading booking confirmation...</Text>
        </Container>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="page page--narrow">
        <Container size="sm">
          <Paper shadow="sm" radius="md" p="xl">
            <Title order={2} mb="sm">
              Booking not found
            </Title>
            <Text c="dimmed" mb="lg">
              We could not find a booking with reference <strong>{bookingId}</strong>.
            </Text>
            <Button component={Link} to="/customer/bookings" variant="outline">
              Go to My Bookings
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <Container size="sm">
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Stack gap="md">
            <div>
              <Text fz="sm" c="green" fw={600} mb={4}>
                Booking confirmed
              </Text>
              <Title order={2}>Thank you for your booking!</Title>
              <Text fz="sm" c="dimmed">
                Your booking reference is <strong>{booking.id}</strong>. We have sent a confirmation email
                with all the details.
              </Text>
            </div>

            <Paper radius="md" p="md" withBorder>
              <Title order={4} mb="xs">
                Trip details
              </Title>
              <Stack gap={4}>
                {car && (
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">
                      Vehicle
                    </Text>
                    <Text fz="sm" fw={500}>
                      {car.brand} {car.model} {car.year ? `(${car.year})` : ''}
                    </Text>
                  </Group>
                )}
                <Group justify="space-between">
                  <Text fz="sm" c="dimmed">
                    Pickup
                  </Text>
                  <Text fz="sm">
                    {booking.pickup}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text fz="sm" c="dimmed">
                    Return
                  </Text>
                  <Text fz="sm">
                    {booking.dropoff}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text fz="sm" c="dimmed">
                    Total paid
                  </Text>
                  <Text fz="sm" fw={600}>
                    {booking.totalPrice} MAD
                  </Text>
                </Group>
              </Stack>
            </Paper>

            <Group justify="space-between" mt="sm">
              <Button component={Link} to="/customer/bookings" variant="outline">
                Go to My Bookings
              </Button>
              <Button component={Link} to={`/customer/booking/${booking.id}`}>
                View booking details
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default BookingConfirmationPage;
