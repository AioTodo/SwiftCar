import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const HelpCenterPage = () => {
  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="help-center-page page">
      <div className="container">
        <Card>
          <Card.Header>
            <h1>Help Center</h1>
          </Card.Header>
          <Card.Body>
            <p className="text-muted">
              Find answers to common questions, contact support, or learn how to use SwiftCar as a
              customer, agency, or admin.
            </p>

            {/* Section navigation */}
            <div className="help-center-nav">
              <Button
                variant="outline"
                size="small"
                type="button"
                onClick={() => handleScrollTo('help-customers')}
              >
                Customers
              </Button>
              <Button
                variant="outline"
                size="small"
                type="button"
                onClick={() => handleScrollTo('help-agencies')}
              >
                Agencies
              </Button>
              <Button
                variant="outline"
                size="small"
                type="button"
                onClick={() => handleScrollTo('help-contact')}
              >
                Contact &amp; Support
              </Button>
            </div>

            <div className="help-center-grid">
              <section id="help-customers" className="help-center-section">
                <h2>For Customers</h2>
                <p className="text-small text-muted">
                  Learn how to search for cars, complete a booking, manage your reservations, and leave
                  reviews.
                </p>
                <ul className="help-list">
                  <li>How to search and filter cars</li>
                  <li>Understanding prices and extras</li>
                  <li>Managing and cancelling bookings</li>
                  <li>Writing and editing reviews</li>
                </ul>
                <Button
                  variant="outline"
                  size="small"
                  component={Link}
                  to="/faq"
                >
                  View FAQs
                </Button>
              </section>

              <section id="help-agencies" className="help-center-section">
                <h2>For Agencies</h2>
                <p className="text-small text-muted">
                  See how to register your agency, manage your fleet and bookings, and understand
                  earnings.
                </p>
                <ul className="help-list">
                  <li>Registering and verifying your agency</li>
                  <li>Adding and managing vehicles</li>
                  <li>Handling booking requests</li>
                  <li>Tracking revenue and commissions</li>
                </ul>
                <Button
                  variant="outline"
                  size="small"
                  component={Link}
                  to="/agency/register"
                >
                  Register your agency
                </Button>
              </section>

              <section id="help-contact" className="help-center-section">
                <h2>Contact &amp; Support</h2>
                <p className="text-small text-muted">
                  Still need help? Send us a message and we will get back to you as soon as possible.
                </p>
                <ul className="help-list">
                  <li>Report an issue with a booking</li>
                  <li>Ask a question about using the platform</li>
                  <li>Give feedback on this demo</li>
                </ul>
                <Button
                  variant="primary"
                  size="small"
                  component={Link}
                  to="/contact"
                >
                  Contact support
                </Button>
              </section>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;