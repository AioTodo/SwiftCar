import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import agenciesData from '../../../data/agencies.json';
import Modal from '../../../components/common/Modal';
import CarForm from '../../../components/cars/CarForm/CarForm';
import { carsAPI } from '../../../services/api';
import { DashboardIcon, StarFilledIcon } from '@radix-ui/react-icons';

const ManageCarsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [filter, setFilter] = useState('all'); // all, available, rented
  const [cars, setCars] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState({ open: false, car: null });

  const agency = agenciesData.find((a) => a.ownerId === user?.id) || agenciesData[0];

  React.useEffect(() => {
    const list = carsAPI.list();
    Promise.resolve(list).then((data) => {
      const onlyAgency = data.filter((c) => (agency ? c.agencyId === agency.id : true));
      setCars(onlyAgency);
    });
  }, [user]);
  
  const agencyCars = cars;
  const filteredCars = filter === 'all' 
    ? agencyCars
    : filter === 'available'
    ? agencyCars.filter((c) => c.available)
    : agencyCars.filter((c) => !c.available);

  const handleToggleAvailability = async (carId) => {
    const car = cars.find((c) => c.id === carId);
    if (!car) return;
    const updated = await carsAPI.update(carId, { available: !car.available });
    setCars((prev) => prev.map((c) => (c.id === carId ? updated : c)));
    showNotification({ type: 'success', message: 'Car availability updated!' });
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await carsAPI.remove(carId);
      setCars((prev) => prev.filter((c) => c.id !== carId));
      showNotification({ type: 'success', message: 'Car deleted successfully!' });
    }
  };

  const handleCreateCar = async (payload) => {
    const created = await carsAPI.create({ ...payload, agencyId: agency?.id || null });
    setCars((prev) => [created, ...prev]);
    setShowCreate(false);
    showNotification({ type: 'success', message: 'Car added successfully!' });
  };

  return (
    <div className="manage-cars-page">
      <div className="container">
        <div className="manage-cars__header">
          <div>
            <h1>Manage Fleet</h1>
            <p className="text-muted">{agencyCars.length} total vehicle{agencyCars.length !== 1 ? 's' : ''}</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreate(true)}>
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
                  <div className="car-manage-card__image-placeholder">
                    <DashboardIcon aria-hidden="true" />
                  </div>
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
                      <span className="detail-item__value">
                        <StarFilledIcon aria-hidden="true" /> {car.rating} ({car.reviewCount})
                      </span>
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
                      onClick={() => {
                        setShowEdit({ open: true, car });
                      }}
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
      {/* Create Car Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Add New Car">
        <CarForm onSubmit={handleCreateCar} onCancel={() => setShowCreate(false)} />
      </Modal>

      <Modal
        isOpen={showEdit.open}
        onClose={() => setShowEdit({ open: false, car: null })}
        title="Edit Car"
      >
        {showEdit.car && (
          <CarForm
            defaultValues={{
              title: showEdit.car.title || `${showEdit.car.brand} ${showEdit.car.model}`,
              brand: showEdit.car.brand,
              model: showEdit.car.model,
              pricePerDay: showEdit.car.pricePerDay,
              location: showEdit.car.location || '',
              features: showEdit.car.features || [],
              images: showEdit.car.images || [],
              available: showEdit.car.available,
            }}
            onSubmit={async (payload) => {
              const updated = await carsAPI.update(showEdit.car.id, payload);
              setCars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
              setShowEdit({ open: false, car: null });
              showNotification({ type: 'success', message: 'Car updated successfully!' });
            }}
            onCancel={() => setShowEdit({ open: false, car: null })}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageCarsPage;
