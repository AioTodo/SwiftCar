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
              SwiftCar is a prototype car rental marketplace that connects customers with local agencies.
              This demo focuses on clear UX, transparent pricing, and realistic flows (search, booking, reviews).
            </p>
            <h2>Our Mission</h2>
            <p>
              Make car rental simple, fair, and delightful for both customers and agencies through modern web experiences.
            </p>
            <h2>What you’ll find in this demo</h2>
            <ul>
              <li>Customer booking flow (dates, extras, summary, payment mock)</li>
              <li>Agency fleet management and booking requests</li>
              <li>Reviews and ratings on car details</li>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
