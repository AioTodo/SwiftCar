import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { priceCalculator } from '../../../utils/priceCalculator';
import { bookingsAPI } from '../../../services/api';
import { entityStore } from '../../../services/entityStore';
import AgencySidebar from '../../../components/layout/AgencySidebar';
import StatsGrid from '../../../components/dashboard/StatsGrid';
import { Anchor, Group, Progress, Table, Text } from '@mantine/core';
import classes from './BookingEarningsTable.module.css';
import {
  DollarSign,
  TrendingUp,
  Building2,
  ClipboardList,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AgencyEarningsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const agencies = await entityStore.getAll('agencies');
      if (cancelled) return;
      let current = null;
      if (user?.id) {
        current = agencies.find((a) => a.ownerId === user.id) || null;
      }
      if (!current && agencies && agencies.length > 0) {
        current = agencies[0];
      }
      if (!current) {
        setBookings([]);
        return;
      }
      const agencyBookings = await bookingsAPI.listByAgency(current.id);
      if (cancelled) return;
      setBookings(agencyBookings);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const summary = useMemo(() => {
    if (!bookings.length) {
      return {
        totalGross: 0,
        totalCommission: 0,
        totalNet: 0,
        totalBookings: 0,
        completedBookings: 0,
      };
    }

    const totalGross = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalCommission = bookings.reduce((sum, b) => sum + (b.commissionAmount || priceCalculator.commission(b.totalPrice || 0)), 0);
    const totalNet = totalGross - totalCommission;
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;

    return { totalGross, totalCommission, totalNet, totalBookings, completedBookings };
  }, [bookings]);

  // Prepare chart data for earnings over time
  const chartData = useMemo(() => {
    if (!bookings.length) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Group bookings by month
    const monthlyData = {};
    bookings.forEach((booking) => {
      const date = new Date(booking.pickupDate || booking.pickup || Date.now());
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { gross: 0, net: 0 };
      }
      const gross = booking.totalPrice || 0;
      const commission = booking.commissionAmount || priceCalculator.commission(gross);
      monthlyData[monthKey].gross += gross;
      monthlyData[monthKey].net += gross - commission;
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const last6Months = sortedMonths.slice(-6);

    return {
      labels: last6Months.map((m) => {
        const [year, month] = m.split('-');
        return new Date(year, parseInt(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }),
      datasets: [
        {
          label: 'Net Earnings (MAD)',
          data: last6Months.map((m) => monthlyData[m].net),
          borderColor: '#5FCF65',
          backgroundColor: 'rgba(95, 207, 101, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Gross Revenue (MAD)',
          data: last6Months.map((m) => monthlyData[m].gross),
          borderColor: '#3742FA',
          backgroundColor: 'rgba(55, 66, 250, 0.1)',
          tension: 0.4,
        },
      ],
    };
  }, [bookings]);

  const BookingEarningsTable = ({ bookings }) => {
    const rows = bookings.map((b) => {
      const gross = b.totalPrice || 0;
      const commission =
        b.commissionAmount || priceCalculator.commission(b.totalPrice || 0);
      const net = gross - commission;
      const total = gross || 1;
      const netPct = (net / total) * 100;
      const commissionPct = (commission / total) * 100;
      const datesLabel = (b.pickup || b.pickupDate) && (b.dropoff || b.returnDate)
        ? `${b.pickup || b.pickupDate} -> ${b.dropoff || b.returnDate}`
        : 'N/A';

      return (
        <Table.Tr key={b.id}>
          <Table.Td>
            <Anchor component="button" fz="sm">
              {b.id}
            </Anchor>
          </Table.Td>
          <Table.Td>{datesLabel}</Table.Td>
          <Table.Td>{b.status}</Table.Td>
          <Table.Td>{gross.toFixed(0)}</Table.Td>
          <Table.Td>
            <Group justify="space-between">
              <Text fz="xs" c="teal" fw={700}>
                Net {netPct.toFixed(0)}%
              </Text>
              <Text fz="xs" c="red" fw={700}>
                Commission {commissionPct.toFixed(0)}%
              </Text>
            </Group>
            <Progress.Root>
              <Progress.Section
                className={classes.progressSection}
                value={netPct}
                color="teal"
              />

              <Progress.Section
                className={classes.progressSection}
                value={commissionPct}
                color="red"
              />
            </Progress.Root>
          </Table.Td>
        </Table.Tr>
      );
    });

    return (
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Booking</Table.Th>
              <Table.Th>Dates</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Gross (MAD)</Table.Th>
              <Table.Th>Earnings distribution</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    );
  };

  return (
    <div className="agency-earnings-page">
      <div className="container">
        <div className="agency-layout">
          <AgencySidebar />
          <main className="agency-layout__main">
            <div className="page-header">
              <h1>Earnings</h1>
              <p className="text-muted">Overview of revenue, commissions, and net earnings for your agency.</p>
            </div>

        {/* Summary cards */}
        <div className="dashboard__stats">
          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <DollarSign size={32} aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalNet.toFixed(0)} MAD</h3>
                <p className="stat-card__label">Net Earnings</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <TrendingUp size={32} aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalGross.toFixed(0)} MAD</h3>
                <p className="stat-card__label">Gross Revenue</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <Building2 size={32} aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalCommission.toFixed(0)} MAD</h3>
                <p className="stat-card__label">Commission Paid</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-card__icon">
                <ClipboardList size={32} aria-hidden="true" />
              </div>
              <div className="stat-card__content">
                <h3 className="stat-card__value">{summary.totalBookings}</h3>
                <p className="stat-card__label">Total Bookings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Earnings Chart */}
        {bookings.length > 0 && chartData.labels.length > 0 && (
          <Card style={{ marginBottom: '24px' }}>
            <Card.Header>
              <h2>Earnings Trend</h2>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px', position: 'relative' }}>
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return value + ' MAD';
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        )}

        {/* Table */}
        <Card>
          <Card.Header>
            <div className="card-header-with-action">
              <h2>Booking Earnings</h2>
              <Button variant="text" size="small" type="button">
                Export (coming soon)
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {bookings.length === 0 ? (
              <div className="empty-state">
                <h3>No earnings yet</h3>
                <p>
                  You will see earnings here once customers complete bookings with your
                  agency.
                </p>
              </div>
            ) : (
              <BookingEarningsTable bookings={bookings} />
            )}
          </Card.Body>
        </Card>
          </main>
      </div>
      </div>
    </div>
  );
};

export default AgencyEarningsPage;
