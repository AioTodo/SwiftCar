import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Paper, Title, Text, Group, Button, Stack } from '@mantine/core';
import { bookingsAPI, carsAPI } from '../../../services/api';

const BookingDetailsPage = () => {
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
          <Text>Loading booking...</Text>
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

  const statusLabel = booking.status || 'pending';

  return (
    <div className="page page--narrow">
      <Container size="sm">
        <Stack gap="md">
          <div>
            <Title order={2} mb="xs">
              Booking details
            </Title>
            <Text fz="sm" c="dimmed">
              Reference <strong>{booking.id}</strong>
            </Text>
          </div>

          <Paper shadow="xs" radius="md" p="md" withBorder>
            <Title order={4} mb="xs">
              Car
            </Title>
            {car ? (
              <Stack gap={4}>
                <Text fw={500}>
                  {car.brand} {car.model} {car.year ? `(${car.year})` : ''}
                </Text>
                <Text fz="sm" c="dimmed">
                  {car.category}
                </Text>
              </Stack>
            ) : (
              <Text fz="sm" c="dimmed">
                Car information not available.
              </Text>
            )}
          </Paper>

          <Paper shadow="xs" radius="md" p="md" withBorder>
            <Title order={4} mb="xs">
              Trip
            </Title>
            <Stack gap={4}>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">
                  Pickup
                </Text>
                <Text fz="sm">{booking.pickup}</Text>
              </Group>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">
                  Return
                </Text>
                <Text fz="sm">{booking.dropoff}</Text>
              </Group>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">
                  Status
                </Text>
                <Text fz="sm" fw={500}>
                  {statusLabel}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text fz="sm" c="dimmed">
                  Total price
                </Text>
                <Text fz="sm" fw={600}>
                  {booking.totalPrice} MAD
                </Text>
              </Group>
            </Stack>
          </Paper>

          <Group justify="space-between" mt="sm">
            <Button component={Link} to="/customer/bookings" variant="outline">
              Back to My Bookings
            </Button>
            {booking.status === 'completed' && (
              <Button component={Link} to={`/customer/write-review/${booking.id}`}>
                Write review
              </Button>
            )}
          </Group>
        </Stack>
      </Container>
    </div>
  );
};

export default BookingDetailsPage;
