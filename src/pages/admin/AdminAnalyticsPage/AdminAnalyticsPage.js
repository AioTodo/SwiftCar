import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../../components/common/Card';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';
import { CalendarIcon, TokensIcon } from '@radix-ui/react-icons';
import { useTable } from 'react-table';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const groupBy = (list, getKey) => {
  return list.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};

const AdminAnalyticsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [bookingsList, agenciesList, carsList] = await Promise.all([
        entityStore.getAll('bookings'),
        entityStore.getAll('agencies'),
        entityStore.getAll('cars'),
      ]);
      if (cancelled) return;
      setBookings(bookingsList || []);
      setAgencies(agenciesList || []);
      setCars(carsList || []);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = useMemo(() => {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalCommission = bookings.reduce(
      (sum, b) => sum + (b.commissionAmount || 0),
      0
    );

    const bookingsByStatus = groupBy(bookings, (b) => b.status || 'unknown');

    const bookingsByAgency = groupBy(bookings, (b) => b.agencyId || 'unknown');
    const agencySummaries = Object.entries(bookingsByAgency).map(([agencyId, items]) => {
      const agency = agencies.find((a) => a.id === agencyId);
      const gross = items.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      const commission = items.reduce(
        (sum, b) => sum + (b.commissionAmount || 0),
        0
      );
      return {
        agencyId,
        name: agency ? agency.agencyName : agencyId,
        city: agency ? agency.city : '',
        bookings: items.length,
        gross,
        commission,
      };
    });

    agencySummaries.sort((a, b) => b.bookings - a.bookings);

    const carsByAgency = groupBy(cars, (c) => c.agencyId || 'unknown');
    const fleetSummary = Object.entries(carsByAgency).map(([agencyId, items]) => {
      const agency = agencies.find((a) => a.id === agencyId);
      return {
        agencyId,
        name: agency ? agency.agencyName : agencyId,
        city: agency ? agency.city : '',
        cars: items.length,
      };
    });

    return {
      totalBookings,
      totalRevenue,
      totalCommission,
      bookingsByStatus,
      agencySummaries,
      fleetSummary,
    };
  }, [bookings, agencies, cars]);

  const bookingsByStatusData = useMemo(() => {
    const labels = Object.keys(metrics.bookingsByStatus || {});
    const counts = labels.map((status) => metrics.bookingsByStatus[status].length);

    return {
      labels,
      datasets: [
        {
          label: 'Bookings by Status',
          data: counts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [metrics.bookingsByStatus]);

  const revenueByAgencyData = useMemo(() => {
    const labels = metrics.agencySummaries.map((row) => row.name);
    const gross = metrics.agencySummaries.map((row) => row.gross);
    const commission = metrics.agencySummaries.map((row) => row.commission);

    return {
      labels,
      datasets: [
        {
          label: 'Gross (MAD)',
          data: gross,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Commission (MAD)',
          data: commission,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
      ],
    };
  }, [metrics.agencySummaries]);

  const BookingsByStatusTable = ({ data }) => {
    const columns = useMemo(
      () => [
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Count',
          accessor: 'count',
        },
      ],
      []
    );

    const tableInstance = useTable({ columns, data });
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance;

    return (
      <div className="table-wrapper">
        <table className="table table--admin-analytics" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const agencyTableColumns = useMemo(
    () => [
      { Header: 'Agency', accessor: 'name' },
      { Header: 'Location', accessor: 'city' },
      { Header: 'Bookings', accessor: 'bookings' },
      { Header: 'Gross (MAD)', accessor: 'gross' },
      { Header: 'Commission (MAD)', accessor: 'commission' },
    ],
    []
  );

  const fleetTableColumns = useMemo(
    () => [
      { Header: 'Agency', accessor: 'name' },
      { Header: 'Location', accessor: 'city' },
      { Header: 'Vehicles', accessor: 'cars' },
    ],
    []
  );

  const AgencyTable = ({ columns, data }) => {
    const tableInstance = useTable({ columns, data });
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance;

    return (
      <div className="table-wrapper">
        <table className="table table--admin-analytics" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="page page--admin-analytics">
      <div className="page__container admin-analytics">
        <header className="page-header">
          <h1 className="page__title">Analytics</h1>
          <p className="page__description">
            High-level metrics for bookings, revenue, and agency performance. Based on current mock data.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          {/* Top-level numbers */}
          <div className="admin-dashboard__stats-grid">
            <Card>
              <Card.Body className="stat-card">
                <div className="stat-card__icon">
                  <CalendarIcon aria-hidden="true" />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__label">Total Bookings</div>
                  <div className="stat-card__value">{metrics.totalBookings}</div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="stat-card">
                <div className="stat-card__icon">
                  <TokensIcon aria-hidden="true" />
                </div>
                <div className="stat-card__content">
                  <div className="stat-card__label">Total Revenue</div>
                  <div className="stat-card__value">{metrics.totalRevenue} MAD</div>
                  <div className="stat-card__meta">
                    Commission: {metrics.totalCommission} MAD
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Charts row */}
          <div className="admin-dashboard__panels admin-dashboard__panels--charts">
            <Card className="admin-panel">
              <Card.Header>
                <h2>Bookings by Status (Chart)</h2>
              </Card.Header>
              <Card.Body>
                {metrics.totalBookings === 0 ? (
                  <p className="text-muted">No bookings in mock data.</p>
                ) : (
                  <Pie data={bookingsByStatusData} />
                )}
              </Card.Body>
            </Card>

            <Card className="admin-panel">
              <Card.Header>
                <h2>Revenue by Agency</h2>
              </Card.Header>
              <Card.Body>
                {metrics.agencySummaries.length === 0 ? (
                  <p className="text-muted">No bookings yet.</p>
                ) : (
                  <Bar data={revenueByAgencyData} options={{ responsive: true, maintainAspectRatio: false }} />
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="admin-dashboard__panels">
            {/* Bookings by status */}
            <Card className="admin-panel">
              <Card.Header>
                <h2>Bookings by Status</h2>
              </Card.Header>
              <Card.Body>
                {metrics.totalBookings === 0 ? (
                  <p className="text-muted">No bookings in mock data.</p>
                ) : (
                  <BookingsByStatusTable
                    data={Object.entries(metrics.bookingsByStatus).map(([status, items]) => ({
                      status,
                      count: items.length,
                    }))}
                  />
                )}
              </Card.Body>
            </Card>

            {/* Top agencies by bookings */}
            <Card className="admin-panel">
              <Card.Header>
                <h2>Top Agencies by Bookings</h2>
              </Card.Header>
              <Card.Body>
                {metrics.agencySummaries.length === 0 ? (
                  <p className="text-muted">No bookings yet.</p>
                ) : (
                  <AgencyTable columns={agencyTableColumns} data={metrics.agencySummaries} />
                )}
              </Card.Body>
            </Card>

            {/* Fleet size by agency */}
            <Card className="admin-panel">
              <Card.Header>
                <h2>Fleet Size by Agency</h2>
              </Card.Header>
              <Card.Body>
                {metrics.fleetSummary.length === 0 ? (
                  <p className="text-muted">No vehicles in mock data.</p>
                ) : (
                  <AgencyTable columns={fleetTableColumns} data={metrics.fleetSummary} />
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAnalyticsPage;
