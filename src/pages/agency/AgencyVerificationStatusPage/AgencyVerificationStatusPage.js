import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import agencies from '../../../data/agencies.json';

const getStatusMeta = (status) => {
  switch (status) {
    case 'approved':
    case 'verified':
      return {
        label: 'Verified',
        tone: 'success',
        title: 'Your agency is verified',
        description: 'You can fully use SwiftCar to manage your fleet and bookings.',
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

  const agency = agencies.find((a) => a.ownerId === user?.id) || agencies[0];
  const status = agency?.status || 'pending';
  const meta = getStatusMeta(status);

  return (
    <div className="agency-verification-page">
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

            {status === 'rejected' && agency?.rejectionReason && (
              <div className="verification-notes">
                <h3>Review notes</h3>
                <p className="text-muted">{agency.rejectionReason}</p>
              </div>
            )}

            <div className="verification-next-steps">
              {status === 'pending' && (
                <ul>
                  <li>Make sure your uploaded documents are clear and up to date.</li>
                  <li>Keep an eye on your email for any follow-up questions.</li>
                </ul>
              )}
              {status === 'rejected' && (
                <ul>
                  <li>Update your business details or upload corrected documents.</li>
                  <li>Resubmit your application from the registration form.</li>
                </ul>
              )}
              {['approved', 'verified'].includes(status) && (
                <ul>
                  <li>Finish setting up your fleet and pricing.</li>
                  <li>Keep your availability and contact details up to date.</li>
                </ul>
              )}
            </div>

            {['approved', 'verified'].includes(status) && (
              <div className="verification-actions">
                <Button variant="primary" onClick={() => window.location.assign('/agency/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AgencyVerificationStatusPage;
