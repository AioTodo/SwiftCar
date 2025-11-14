import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { entityStore } from '../../../services/entityStore';
import AdminSidebar from '../../../components/layout/AdminSidebar';

const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under review' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
];

const getVerificationStatus = (agency) => agency.verificationStatus || 'pending';

const statusLabel = (status) => {
  switch (status) {
    case 'verified':
      return 'Verified';
    case 'rejected':
      return 'Rejected';
    case 'under_review':
      return 'Under review';
    case 'pending':
    default:
      return 'Pending';
  }
};

const AdminAgencyVerificationPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedId, setSelectedId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadAgencies = async () => {
    setLoading(true);
    const list = await entityStore.getAll('agencies');
    setAgencies(list || []);
    setLoading(false);
    if (!selectedId && list && list.length > 0) {
      setSelectedId(list[0].id);
    }
  };

  useEffect(() => {
    loadAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAgencies = useMemo(() => {
    if (filterStatus === 'all') return agencies;
    return agencies.filter((a) => getVerificationStatus(a) === filterStatus);
  }, [agencies, filterStatus]);

  const selectedAgency = useMemo(
    () => agencies.find((a) => a.id === selectedId) || null,
    [agencies, selectedId]
  );

  const handleApprove = async (agency) => {
    setActionLoadingId(agency.id);
    try {
      await entityStore.update('agencies', agency.id, {
        verificationStatus: 'verified',
        rejectionReason: null,
        adminNotes: null,
      });
      await loadAgencies();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (agency) => {
    const reason = window.prompt('Enter rejection reason', agency.rejectionReason || '');
    if (!reason) return;
    setActionLoadingId(agency.id);
    try {
      await entityStore.update('agencies', agency.id, {
        verificationStatus: 'rejected',
        rejectionReason: reason,
        adminNotes: null,
      });
      await loadAgencies();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRequestMoreInfo = async (agency) => {
    const note = window.prompt('Enter the additional information you need from this agency', agency.adminNotes || '');
    if (!note) return;
    setActionLoadingId(agency.id);
    try {
      await entityStore.update('agencies', agency.id, {
        verificationStatus: 'under_review',
        adminNotes: note,
      });
      await loadAgencies();
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="page page--admin-agencies">
      <div className="page__container admin-agencies">
        <header className="page-header">
          <h1 className="page__title">Agency Verification</h1>
          <p className="page__description">
            Review agency applications, approve or reject them, and track verification status.
          </p>
        </header>

        <div className="admin-dashboard__layout">
          <AdminSidebar />

          <div className="admin-agencies__layout">
          {/* Left: agencies list + filters */}
          <aside className="admin-agencies__sidebar">
            <Card>
              <Card.Header>
                <div className="card-header-with-action">
                  <h2>Agencies</h2>
                  <span className="text-small text-muted">{agencies.length} total</span>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="filter-group">
                  <label className="filter-label" htmlFor="status-filter">
                    Status
                  </label>
                  <select
                    id="status-filter"
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {STATUS_FILTERS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {loading ? (
                  <p className="text-muted">Loading agencies...</p>
                ) : filteredAgencies.length === 0 ? (
                  <p className="text-muted">No agencies found for this filter.</p>
                ) : (
                  <ul className="admin-list admin-list--selectable">
                    {filteredAgencies.map((agency) => {
                      const status = getVerificationStatus(agency);
                      const isActive = selectedId === agency.id;
                      return (
                        <li
                          key={agency.id}
                          className={`admin-list__item admin-list__item--clickable ${
                            isActive ? 'admin-list__item--active' : ''
                          }`}
                          onClick={() => setSelectedId(agency.id)}
                        >
                          <div className="admin-list__primary">
                            <span className="admin-list__name">{agency.agencyName}</span>
                            <span className="admin-list__location">
                              {agency.city}, {agency.country}
                            </span>
                          </div>
                          <div className="admin-list__secondary">
                            <span className={`badge badge--status badge--${status}`}>
                              {statusLabel(status)}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </aside>

          {/* Right: selected agency detail & actions */}
          <main className="admin-agencies__main">
            {!selectedAgency ? (
              <Card>
                <Card.Body>
                  <p className="text-muted">Select an agency from the list to view details.</p>
                </Card.Body>
              </Card>
            ) : (
              <Card className="admin-panel">
                <Card.Header>
                  <div className="card-header-with-action">
                    <div>
                      <h2>{selectedAgency.agencyName}</h2>
                      <p className="text-small text-muted">
                        {selectedAgency.city}, {selectedAgency.country}
                      </p>
                    </div>
                    <div className="admin-agencies__status-pill">
                      <span className={`badge badge--status badge--${getVerificationStatus(selectedAgency)}`}>
                        {statusLabel(getVerificationStatus(selectedAgency))}
                      </span>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="admin-agencies__details-grid">
                    <div>
                      <h3 className="admin-section-title">Business Details</h3>
                      <p className="text-small">
                        <strong>Email:</strong> {selectedAgency.email}
                      </p>
                      <p className="text-small">
                        <strong>Phone:</strong> {selectedAgency.phone}
                      </p>
                      <p className="text-small">
                        <strong>Address:</strong> {selectedAgency.address}
                      </p>
                      <p className="text-small">
                        <strong>License:</strong> {selectedAgency.businessLicense}
                      </p>
                      <p className="text-small">
                        <strong>Registered:</strong> {selectedAgency.registrationDate}
                      </p>
                    </div>

                    <div>
                      <h3 className="admin-section-title">Performance (mock)</h3>
                      <p className="text-small">
                        <strong>Rating:</strong> {selectedAgency.rating || 'N/A'}
                      </p>
                      <p className="text-small">
                        <strong>Total bookings:</strong> {selectedAgency.totalBookings || 0}
                      </p>
                      <p className="text-small">
                        <strong>Commission rate:</strong> {(selectedAgency.commissionRate || 0.06) * 100}%
                      </p>
                    </div>
                  </div>

                  {selectedAgency.adminNotes && (
                    <div className="admin-agencies__notes">
                      <h3 className="admin-section-title">Admin notes</h3>
                      <p className="text-small text-muted">{selectedAgency.adminNotes}</p>
                    </div>
                  )}

                  {getVerificationStatus(selectedAgency) === 'rejected' && selectedAgency.rejectionReason && (
                    <div className="admin-agencies__notes">
                      <h3 className="admin-section-title">Rejection reason</h3>
                      <p className="text-small text-muted">{selectedAgency.rejectionReason}</p>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <div className="admin-agencies__actions">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => handleRequestMoreInfo(selectedAgency)}
                      disabled={actionLoadingId === selectedAgency.id}
                    >
                      Request more info
                    </Button>
                    <div className="admin-agencies__actions-right">
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleReject(selectedAgency)}
                        disabled={actionLoadingId === selectedAgency.id}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleApprove(selectedAgency)}
                        disabled={actionLoadingId === selectedAgency.id}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            )}
          </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAgencyVerificationPage;
