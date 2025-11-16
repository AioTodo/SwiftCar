import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { entityStore } from '../../../services/entityStore';
import AgencySidebar from '../../../components/layout/AgencySidebar';

const getStatusMeta = (status) => {
  switch (status) {
    case 'verified':
      return {
        label: 'Verified',
        tone: 'success',
        title: 'Your agency is verified',
        description: 'You can fully use SwiftCar to manage your fleet and bookings.',
      };
    case 'under_review':
      return {
        label: 'Under review',
        tone: 'info',
        title: 'We requested more information',
        description:
          'Please review the notes from our team, update your information or documents, and resubmit as needed.',
      };
    case 'rejected':
      return {
        label: 'Rejected',
        tone: 'error',
        title: 'Your verification was rejected',
        description:
          'Please review the notes below, update your information or documents, and resubmit your application.',
      };
    case 'pending':
    default:
      return {
        label: 'Pending review',
        tone: 'warning',
        title: 'Your agency is under review',
        description:
          'Our team is reviewing your documents. This usually takes 1–3 business days. We will notify you when the review is complete.',
      };
  }
};

const AgencyVerificationStatusPage = () => {
  const { user } = useAuth();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const list = await entityStore.getAll('agencies');
        if (cancelled) return;

        let current = null;
        if (user?.id) {
          current = list.find((a) => a.ownerId === user.id) || null;
        }
        if (!current && list && list.length > 0) {
          current = list[0];
        }

        setAgency(current);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const status = useMemo(
    () => (agency ? agency.verificationStatus || 'pending' : 'pending'),
    [agency]
  );

  const meta = getStatusMeta(status);

  if (loading && !agency) {
    return (
      <div className="agency-verification-page">
        <div className="container">
          <div className="agency-layout">
            <AgencySidebar />
            <main className="agency-layout__main">
              <div className="container container--narrow">
                <p className="text-muted">Loading verification status...</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="agency-verification-page">
        <div className="container">
          <div className="agency-layout">
            <AgencySidebar />
            <main className="agency-layout__main">
              <div className="container container--narrow">
                <div className="page-header">
                  <h1>Verification Status</h1>
                  <p className="text-muted">
                    We could not find an agency linked to your account. Please complete agency registration first.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agency-verification-page">
      <div className="container">
        <div className="agency-layout">
          <AgencySidebar />
          <main className="agency-layout__main">
            <div className="container container--narrow">
              <div className="page-header">
                <h1>Verification Status</h1>
                <p className="text-muted">See where your agency is in the review process.</p>
              </div>

        <Card>
          <Card.Body>
            <div className={`verification-banner verification-banner--${meta.tone}`}>
              <div className="verification-banner__label">{meta.label}</div>
              <h2 className="verification-banner__title">{meta.title}</h2>
              <p className="verification-banner__description">{meta.description}</p>
            </div>

            {status === 'rejected' && agency.rejectionReason && (
              <div className="verification-notes">
                <h3>Review notes</h3>
                <p className="text-muted">{agency.rejectionReason}</p>
              </div>
            )}

            {status === 'under_review' && agency.adminNotes && (
              <div className="verification-notes">
                <h3>Additional information requested</h3>
                <p className="text-muted">{agency.adminNotes}</p>
              </div>
            )}

            <div className="verification-next-steps">
              {status === 'pending' && (
                <ul>
                  <li>Make sure your uploaded documents are clear and up to date.</li>
                  <li>Keep an eye on your email for any follow-up questions.</li>
                </ul>
              )}
              {status === 'under_review' && (
                <ul>
                  <li>Review the requested information above.</li>
                  <li>Update your registration details and documents as needed.</li>
                </ul>
              )}
              {status === 'rejected' && (
                <ul>
                  <li>Update your business details or upload corrected documents.</li>
                  <li>Resubmit your application from the registration form.</li>
                </ul>
              )}
              {status === 'verified' && (
                <ul>
                  <li>Finish setting up your fleet and pricing.</li>
                  <li>Keep your availability and contact details up to date.</li>
                </ul>
              )}
            </div>

            {status === 'verified' && (
              <div className="verification-actions">
                <Button variant="primary" onClick={() => window.location.assign('/agency/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AgencyVerificationStatusPage;
