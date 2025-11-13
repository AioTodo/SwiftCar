import React, { useEffect, useMemo, useState } from 'react';
import { entityStore } from '../../services/entityStore';

const ManageCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ brand: '', model: '', pricePerDay: 0, location: '' });

  const load = async () => {
    setLoading(true);
    const data = await entityStore.getAll('cars');
    setCars(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (car) => {
    setEditingId(car.carId || car.id);
    setForm({ brand: car.brand, model: car.model, pricePerDay: car.pricePerDay, location: car.location });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ brand: '', model: '', pricePerDay: 0, location: '' });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'pricePerDay' ? Number(value) : value }));
  };

  const saveEdit = async (id) => {
    await entityStore.update('cars', id, form);
    await load();
    cancelEdit();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this car?')) return;
    await entityStore.remove('cars', id);
    await load();
  };

  const total = useMemo(() => cars.length, [cars]);

  return (
    <div className="container">
      <h2 className="heading heading--h2">Manage Cars</h2>
      <p className="text--muted mb-2">Total cars: {total}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table table--cars">
          <div className="table__row table__row--head">
            <div>Brand</div>
            <div>Model</div>
            <div>Location</div>
            <div>Price/Day</div>
            <div>Actions</div>
          </div>
          {cars.map((car) => {
            const id = car.carId || car.id;
            const isEditing = editingId === id;
            return (
              <div key={id} className="table__row">
                <div>
                  {isEditing ? (
                    <input className="input" name="brand" value={form.brand} onChange={onChange} />
                  ) : (
                    car.brand
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input className="input" name="model" value={form.model} onChange={onChange} />
                  ) : (
                    car.model
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input className="input" name="location" value={form.location} onChange={onChange} />
                  ) : (
                    car.location
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input className="input" type="number" name="pricePerDay" value={form.pricePerDay} onChange={onChange} />
                  ) : (
                    `$${car.pricePerDay}`
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <button className="button button--primary mr-1" onClick={() => saveEdit(id)}>Save</button>
                      <button className="button button--outline" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="button button--outline mr-1" onClick={() => startEdit(car)}>Edit</button>
                      <button className="button button--danger" onClick={() => remove(id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageCarsPage;