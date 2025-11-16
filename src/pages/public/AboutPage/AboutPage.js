import React from 'react';
import Card from '../../../components/common/Card';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <Card>
          <Card.Header>
            <h1>About SwiftCar</h1>
          </Card.Header>
          <Card.Body>
            <p>
              SwiftCar is a prototype car rental marketplace that connects customers with local car rental agencies.
              This demo focuses on clear UX, transparent pricing, and realistic end-to-end flows across customers,
              agencies, and administrators.
            </p>
            <h2>Our Mission</h2>
            <p>
              Make car rental simple, fair, and delightful for both customers and agencies through modern web experiences.
            </p>
            <h2>What you’ll find in this demo</h2>
            <ul>
              <li>Customer journey: search, filters, car details, multi-step booking, payment, confirmation, and reviews.</li>
              <li>Agency tools: registration & verification, fleet management, booking requests, and earnings overview.</li>
              <li>Admin console: agency verification, user management, content moderation, and analytics dashboards.</li>
              <li>Support experience: FAQ, Help Center, contact form, and an admin support inbox.</li>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
