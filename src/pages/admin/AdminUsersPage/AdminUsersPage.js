import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';

const ROLE_FILTERS = [
  { value: 'all', label: 'All roles' },
  { value: 'customer', label: 'Customers' },
  { value: 'agency', label: 'Agencies' },
  { value: 'admin', label: 'Admins' },
];

const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'deleted', label: 'Deleted' },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    const list = await entityStore.getAll('users');
    setUsers(list || []);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return (users || [])
      .filter((u) => (roleFilter === 'all' ? true : u.role === roleFilter))
      .filter((u) =>
        statusFilter === 'all' ? true : (u.accountStatus || 'active') === statusFilter
      )
      .filter((u) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          u.email.toLowerCase().includes(q) ||
          `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase().includes(q)
        );
      });
  }, [users, roleFilter, statusFilter, search]);

  const handleStatusChange = async (user, nextStatus) => {
    if (nextStatus === 'deleted') {
      const ok = window.confirm(
        'Are you sure you want to mark this user as deleted? They will no longer be able to log in.'
      );
      if (!ok) return;
    }

    setActionLoadingId(user.id);
    try {
      await entityStore.update('users', user.id, { accountStatus: nextStatus });
      await loadUsers();
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="page page--admin-users">
      <div className="page__container admin-users">
        <header className="page-header">
          <h1 className="page__title">User Management</h1>
          <p className="page__description">
            View and manage all platform users, including customers, agencies, and admins.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          <div className="admin-users__layout">
            <aside className="admin-users__sidebar">
            <Card>
              <Card.Header>
                <h2>Filters</h2>
              </Card.Header>
              <Card.Body>
                <div className="filter-group">
                  <label className="filter-label" htmlFor="role-filter">
                    Role
                  </label>
                  <select
                    id="role-filter"
                    className="filter-select"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    {ROLE_FILTERS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="status-filter">
                    Status
                  </label>
                  <select
                    id="status-filter"
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {STATUS_FILTERS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="user-search">
                    Search
                  </label>
                  <input
                    id="user-search"
                    className="filter-input"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Card.Body>
            </Card>
          </aside>

          <main className="admin-users__main">
            <Card className="admin-panel">
              <Card.Header>
                <div className="card-header-with-action">
                  <h2>Users</h2>
                  <span className="text-small text-muted">
                    {filteredUsers.length} of {users.length} users
                  </span>
                </div>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <p className="text-muted">Loading users...</p>
                ) : filteredUsers.length === 0 ? (
                  <p className="text-muted">No users match the current filters.</p>
                ) : (
                  <div className="table-wrapper">
                    <table className="table table--admin-users">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Registered</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => {
                          const status = user.accountStatus || 'active';
                          const isSuspended = status === 'suspended';
                          const isDeleted = status === 'deleted';
                          return (
                            <tr key={user.id}>
                              <td>
                                <div className="text-small">
                                  <strong>
                                    {user.firstName} {user.lastName}
                                  </strong>
                                </div>
                              </td>
                              <td className="text-small">{user.email}</td>
                              <td className="text-small text-capitalize">{user.role}</td>
                              <td>
                                <span className={`badge badge--status badge--${status}`}>
                                  {status}
                                </span>
                              </td>
                              <td className="text-small">{user.registrationDate}</td>
                              <td>
                                <div className="admin-users__actions">
                                  {!isDeleted && !isSuspended && (
                                    <Button
                                      variant="outline"
                                      size="small"
                                      onClick={() => handleStatusChange(user, 'suspended')}
                                      disabled={actionLoadingId === user.id}
                                    >
                                      Suspend
                                    </Button>
                                  )}
                                  {isSuspended && (
                                    <Button
                                      variant="primary"
                                      size="small"
                                      onClick={() => handleStatusChange(user, 'active')}
                                      disabled={actionLoadingId === user.id}
                                    >
                                      Activate
                                    </Button>
                                  )}
                                  {!isDeleted && (
                                    <Button
                                      variant="danger"
                                      size="small"
                                      onClick={() => handleStatusChange(user, 'deleted')}
                                      disabled={actionLoadingId === user.id}
                                    >
                                      Mark deleted
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsersPage;
