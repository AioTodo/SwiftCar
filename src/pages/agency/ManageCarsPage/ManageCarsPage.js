import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import carsData from '../../../data/cars.json';
import agenciesData from '../../../data/agencies.json';

const ManageCarsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [filter, setFilter] = useState('all'); // all, available, rented
  
  // Mock: Get agency cars
  const agency = agenciesData.find((a) => a.ownerId === user?.id) || agenciesData[0];
  const agencyCars = carsData.filter((c) => c.agencyId === agency?.id);
  
  const filteredCars = filter === 'all' 
    ? agencyCars
    : filter === 'available'
    ? agencyCars.filter((c) => c.available)
    : agencyCars.filter((c) => !c.available);

  const handleToggleAvailability = (carId) => {
    showNotification({
      type: 'success',
      message: 'Car availability updated!',
    });
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      showNotification({
        type: 'success',
        message: 'Car deleted successfully!',
      });
    }
  };

  return (
    <div className="manage-cars-page">
      <div className="container">
        <div className="manage-cars__header">
          <div>
            <h1>Manage Fleet</h1>
            <p className="text-muted">{agencyCars.length} total vehicle{agencyCars.length !== 1 ? 's' : ''}</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/agency/add-car')}>
            Add New Car
          </Button>
        </div>

        {/* Filters */}
        <div className="fleet-filters">
          <button
            className={`fleet-filter ${filter === 'all' ? 'fleet-filter--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({agencyCars.length})
          </button>
          <button
            className={`fleet-filter ${filter === 'available' ? 'fleet-filter--active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available ({agencyCars.filter((c) => c.available).length})
          </button>
          <button
            className={`fleet-filter ${filter === 'rented' ? 'fleet-filter--active' : ''}`}
            onClick={() => setFilter('rented')}
          >
            Rented ({agencyCars.filter((c) => !c.available).length})
          </button>
        </div>

        {/* Cars List */}
        {filteredCars.length === 0 ? (
          <Card>
            <Card.Body>
              <div className="manage-cars__empty">
                <h3>No vehicles found</h3>
                <p>
                  {filter === 'all' 
                    ? "You haven't added any vehicles yet." 
                    : `No ${filter} vehicles at the moment.`}
                </p>
                {filter === 'all' && (
                  <Button variant="primary" onClick={() => navigate('/agency/add-car')}>
                    Add Your First Car
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="cars-grid">
            {filteredCars.map((car) => (
              <Card key={car.id} className="car-manage-card">
                <div className="car-manage-card__image">
                  <div className="car-manage-card__image-placeholder">🚗</div>
                  <span className={`availability-badge ${car.available ? 'availability-badge--available' : 'availability-badge--unavailable'}`}>
                    {car.available ? 'Available' : 'Rented'}
                  </span>
                </div>

                <Card.Body>
                  <h3 className="car-manage-card__title">
                    {car.brand} {car.model}
                  </h3>
                  <p className="car-manage-card__subtitle">
                    {car.year} • {car.category}
                  </p>

                  <div className="car-manage-card__details">
                    <div className="detail-item">
                      <span className="detail-item__label">License:</span>
                      <span className="detail-item__value">{car.licensePlate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-item__label">Location:</span>
                      <span className="detail-item__value">{car.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-item__label">Price:</span>
                      <span className="detail-item__value">{car.pricePerDay} MAD/day</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-item__label">Rating:</span>
                      <span className="detail-item__value">⭐ {car.rating} ({car.reviewCount})</span>
                    </div>
                  </div>

                  <div className="car-manage-card__features">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="feature-tag">+{car.features.length - 3}</span>
                    )}
                  </div>
                </Card.Body>

                <Card.Footer>
                  <div className="car-manage-card__actions">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => navigate(`/agency/edit-car/${car.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={car.available ? 'text' : 'primary'}
                      size="small"
                      onClick={() => handleToggleAvailability(car.id)}
                    >
                      {car.available ? 'Mark Unavailable' : 'Mark Available'}
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCarsPage;
