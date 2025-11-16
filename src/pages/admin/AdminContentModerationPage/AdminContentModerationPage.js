import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';

const TAB_REVIEWS = 'reviews';
const TAB_LISTINGS = 'listings';

const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'approved', label: 'Approved' },
  { value: 'removed', label: 'Removed' },
];

const AdminContentModerationPage = () => {
  const [activeTab, setActiveTab] = useState(TAB_REVIEWS);
  const [reviews, setReviews] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [reviewsList, carsList] = await Promise.all([
      entityStore.getAll('reviews'),
      entityStore.getAll('cars'),
    ]);
    setReviews(reviewsList || []);
    setCars(carsList || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredReviews = useMemo(() => {
    return (reviews || [])
      .filter((r) =>
        statusFilter === 'all' ? true : (r.moderationStatus || 'pending') === statusFilter
      )
      .filter((r) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          (r.comment || '').toLowerCase().includes(q) ||
          (r.title || '').toLowerCase().includes(q)
        );
      });
  }, [reviews, statusFilter, search]);

  const filteredListings = useMemo(() => {
    return (cars || [])
      .filter((c) =>
        statusFilter === 'all' ? true : (c.moderationStatus || 'approved') === statusFilter
      )
      .filter((c) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          `${c.brand || ''} ${c.model || ''}`.toLowerCase().includes(q) ||
          (c.description || '').toLowerCase().includes(q) ||
          (c.licensePlate || '').toLowerCase().includes(q)
        );
      });
  }, [cars, statusFilter, search]);

  const handleReviewAction = async (review, action) => {
    setActionLoadingId(review.id);
    try {
      let moderationStatus = review.moderationStatus || 'pending';
      let adminReason = review.adminReason || '';

      if (action === 'approve') {
        moderationStatus = 'approved';
        adminReason = '';
      } else if (action === 'remove') {
        moderationStatus = 'removed';
        adminReason = window.prompt('Reason for removal (optional)?', adminReason || '') || '';
      } else if (action === 'flag') {
        moderationStatus = 'flagged';
        adminReason = window.prompt('Reason for flagging (optional)?', adminReason || '') || '';
      }

      await entityStore.update('reviews', review.id, {
        moderationStatus,
        adminReason,
        flagged: moderationStatus === 'flagged',
      });
      await loadData();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleListingAction = async (car, action) => {
    const id = car.carId || car.id;
    setActionLoadingId(id);
    try {
      let moderationStatus = car.moderationStatus || 'approved';
      let adminReason = car.moderationReason || '';

      if (action === 'approve') {
        moderationStatus = 'approved';
        adminReason = '';
      } else if (action === 'remove') {
        moderationStatus = 'removed';
        adminReason = window.prompt('Reason for removal (optional)?', adminReason || '') || '';
      } else if (action === 'flag') {
        moderationStatus = 'flagged';
        adminReason = window.prompt('Reason for flagging (optional)?', adminReason || '') || '';
      }

      await entityStore.update('cars', id, {
        moderationStatus,
        moderationReason: adminReason,
        flagged: moderationStatus === 'flagged',
      });
      await loadData();
    } finally {
      setActionLoadingId(null);
    }
  };

  const renderReviewsTable = () => {
    if (loading) {
      return <p className="text-muted">Loading reviews...</p>;
    }
    if (filteredReviews.length === 0) {
      return <p className="text-muted">No reviews match the current filters.</p>;
    }

    return (
      <div className="table-wrapper">
        <table className="table table--admin-reviews">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Admin reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((r) => {
              const status = r.moderationStatus || 'pending';
              return (
                <tr key={r.id}>
                  <td className="text-small">{r.id}</td>
                  <td>{r.rating}</td>
                  <td className="text-small">
                    <div className="text-ellipsis">{r.comment}</div>
                  </td>
                  <td>
                    <span className={`badge badge--status badge--${status}`}>
                      {status}
                    </span>
                  </td>
                  <td className="text-small">{r.adminReason}</td>
                  <td>
                    <div className="admin-content__actions">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleReviewAction(r, 'approve')}
                        disabled={actionLoadingId === r.id}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleReviewAction(r, 'remove')}
                        disabled={actionLoadingId === r.id}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleReviewAction(r, 'flag')}
                        disabled={actionLoadingId === r.id}
                      >
                        Flag
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderListingsTable = () => {
    if (loading) {
      return <p className="text-muted">Loading listings...</p>;
    }
    if (filteredListings.length === 0) {
      return <p className="text-muted">No listings match the current filters.</p>;
    }

    return (
      <div className="table-wrapper">
        <table className="table table--admin-listings">
          <thead>
            <tr>
              <th>Car</th>
              <th>License</th>
              <th>Location</th>
              <th>Status</th>
              <th>Moderation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((c) => {
              const id = c.carId || c.id;
              const status = c.moderationStatus || 'approved';
              return (
                <tr key={id}>
                  <td className="text-small">
                    <strong>
                      {c.brand} {c.model}
                    </strong>
                  </td>
                  <td className="text-small">{c.licensePlate}</td>
                  <td className="text-small">{c.location}</td>
                  <td>
                    <span className={`badge badge--status badge--${c.status || 'active'}`}>
                      {c.status || 'active'}
                    </span>
                  </td>
                  <td className="text-small">
                    <span className={`badge badge--status badge--${status}`}>
                      {status}
                    </span>
                    {c.moderationReason && (
                      <div className="text-small text-muted text-ellipsis">
                        {c.moderationReason}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="admin-content__actions">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleListingAction(c, 'approve')}
                        disabled={actionLoadingId === id}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleListingAction(c, 'remove')}
                        disabled={actionLoadingId === id}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleListingAction(c, 'flag')}
                        disabled={actionLoadingId === id}
                      >
                        Flag
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="page page--admin-content">
      <div className="page__container admin-content">
        <header className="page-header">
          <h1 className="page__title">Content Moderation</h1>
          <p className="page__description">
            Review and moderate user-generated content, including reviews and vehicle listings.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          <div className="admin-content__layout">
          <aside className="admin-content__sidebar">
            <Card>
              <Card.Header>
                <h2>Filters</h2>
              </Card.Header>
              <Card.Body>
                <div className="filter-group">
                  <label className="filter-label">Content type</label>
                  <div className="tab-switch">
                    <button
                      type="button"
                      className={`tab-switch__btn ${
                        activeTab === TAB_REVIEWS ? 'tab-switch__btn--active' : ''
                      }`}
                      onClick={() => setActiveTab(TAB_REVIEWS)}
                    >
                      Reviews
                    </button>
                    <button
                      type="button"
                      className={`tab-switch__btn ${
                        activeTab === TAB_LISTINGS ? 'tab-switch__btn--active' : ''
                      }`}
                      onClick={() => setActiveTab(TAB_LISTINGS)}
                    >
                      Listings
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="status-filter">
                    Moderation status
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
                  <label className="filter-label" htmlFor="content-search">
                    Search
                  </label>
                  <input
                    id="content-search"
                    className="filter-input"
                    placeholder={
                      activeTab === TAB_REVIEWS
                        ? 'Search in review text or title'
                        : 'Search by car, license, or description'
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Card.Body>
            </Card>
          </aside>

          <main className="admin-content__main">
            <Card className="admin-panel">
              <Card.Header>
                <div className="card-header-with-action">
                  <h2>{activeTab === TAB_REVIEWS ? 'Reviews' : 'Listings'}</h2>
                  <Button variant="text" size="small" type="button" disabled>
                    Export (coming later)
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {activeTab === TAB_REVIEWS ? renderReviewsTable() : renderListingsTable()}
              </Card.Body>
            </Card>
          </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminContentModerationPage;
