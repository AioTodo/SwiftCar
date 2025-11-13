import React, { useEffect, useState } from 'react';
import { entityStore } from '../../services/entityStore';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, agencies: 0, cars: 0, bookings: 0 });

  useEffect(() => {
    async function load() {
      const [users, agencies, cars, bookings] = await Promise.all([
        entityStore.getAll('users'),
        entityStore.getAll('agencies'),
        entityStore.getAll('cars'),
        entityStore.getAll('bookings'),
      ]);
      setStats({ users: users.length, agencies: agencies.length, cars: cars.length, bookings: bookings.length });
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2 className="heading heading--h2">Admin Dashboard</h2>
      <div className="grid mt-2">
        <div className="card"><div className="card__body"><strong>Users</strong><div>{stats.users}</div></div></div>
        <div className="card"><div className="card__body"><strong>Agencies</strong><div>{stats.agencies}</div></div></div>
        <div className="card"><div className="card__body"><strong>Cars</strong><div>{stats.cars}</div></div></div>
        <div className="card"><div className="card__body"><strong>Bookings</strong><div>{stats.bookings}</div></div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;