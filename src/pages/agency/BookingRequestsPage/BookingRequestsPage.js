import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import { bookingsAPI, carsAPI } from '../../../services/api';
import { entityStore } from '../../../services/entityStore';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import AgencySidebar from '../../../components/layout/AgencySidebar';
import { DashboardIcon } from '@radix-ui/react-icons';

const BookingRequestsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [requests, setRequests] = React.useState([]);
  const [cars, setCars] = React.useState([]);

  React.useEffect(() => {
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
        setRequests([]);
        setCars([]);
        return;
      }
      const [all, carList] = await Promise.all([
        bookingsAPI.listByAgency(current.id),
        Promise.resolve(carsAPI.list()),
      ]);
      if (cancelled) return;
      setRequests(all.filter((b) => b.status === 'pending'));
      setCars(carList);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleApprove = async (id) => {
    await bookingsAPI.updateStatus(id, 'confirmed');
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showNotification({ type: 'success', message: 'Booking approved' });
  };

  const handleDecline = async (id) => {
    await bookingsAPI.updateStatus(id, 'declined');
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showNotification({ type: 'info', message: 'Booking declined' });
  };

  return (
    <div className="booking-requests-page">
      <div className="container">
        <div className="agency-layout">
          <AgencySidebar />
          <main className="agency-layout__main">
            <div className="page-header">
              <h1>Booking Requests</h1>
            </div>

        {requests.length === 0 ? (
          <Card>
            <Card.Body>
              <div className="empty-state">
                <h3>No pending requests</h3>
                <p>You have no pending booking requests at the moment.</p>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="requests-list">
            {requests.map((r) => {
              const car = cars.find((c) => c.id === r.carId);
              return (
                <Card key={r.id} className="request-item">
                  <div className="request-item__header">
                    <div className="request-item__id">Request #{r.id}</div>
                    <div className="request-item__status">Pending</div>
                  </div>
                  <div className="request-item__body">
                    <div className="request-car">
                      <div className="request-car__image">
                        <DashboardIcon aria-hidden="true" />
                      </div>
                      <div className="request-car__details">
                        <h3>{car ? `${car.brand} ${car.model}` : 'Car'}</h3>
                        <p className="text-small text-muted">{r.pickup} → {r.dropoff}</p>
                      </div>
                    </div>
                    <div className="request-price">
                      <strong>{r.totalPrice} MAD</strong>
                    </div>
                  </div>
                  <Card.Footer>
                    <div className="request-actions">
                      <Button variant="outline" size="small" onClick={() => handleDecline(r.id)}>Decline</Button>
                      <Button variant="primary" size="small" onClick={() => handleApprove(r.id)}>Approve</Button>
                    </div>
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestsPage;
