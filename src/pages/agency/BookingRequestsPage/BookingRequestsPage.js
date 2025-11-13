import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import { bookingsAPI, carsAPI } from '../../../services/api';
import agencies from '../../../data/agencies.json';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const BookingRequestsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [requests, setRequests] = React.useState([]);
  const [cars, setCars] = React.useState([]);

  const agency = agencies.find((a) => a.ownerId === user?.id) || agencies[0];

  React.useEffect(() => {
    if (!agency?.id) return;
    Promise.resolve(bookingsAPI.listByAgency(agency.id)).then((all) => {
      setRequests(all.filter((b) => b.status === 'pending'));
    });
    Promise.resolve(carsAPI.list()).then(setCars);
  }, [agency?.id]);

  const handleApprove = async (id) => {
    const updated = await bookingsAPI.updateStatus(id, 'confirmed');
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
                      <div className="request-car__image">🚗</div>
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
      </div>
    </div>
  );
};

export default BookingRequestsPage;
