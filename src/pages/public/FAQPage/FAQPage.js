import React from 'react';
import Card from '../../../components/common/Card';

const FAQPage = () => {
  const faqs = [
    {
      q: 'How do I book a car?',
      a: 'Use the search bar to choose your location and dates, browse results, view car details, then follow the 3-step booking flow (dates, extras, review) and complete the payment form.',
    },
    {
      q: 'Can I cancel a booking?',
      a: 'Yes. You can cancel eligible pending/confirmed bookings from the My Bookings page. Completed or past bookings cannot be cancelled.',
    },
    {
      q: 'How are prices calculated?',
      a: 'Total price is based on price per day multiplied by the number of rental days, plus any selected extras (insurance, GPS, child seat, additional driver). Commission for SwiftCar is baked into the totals.',
    },
    {
      q: 'How do I become an agency provider?',
      a: 'Create an account as an agency owner and complete the agency registration form. Once verified by an admin, you can add vehicles, manage bookings, and track earnings.',
    },
    {
      q: 'Where can I get help or contact support?',
      a: 'Visit the Help Center to explore customer and agency guides. If you still need assistance, use the Contact page to send a message to support.',
    },
  ];
  return (
    <div className="faq-page">
      <div className="container">
        <Card>
          <Card.Header>
            <h1>Frequently Asked Questions</h1>
          </Card.Header>
          <Card.Body>
            <div className="faq-list">
              {faqs.map((item) => (
                <div key={item.q} className="faq-item">
                  <h3 className="faq-item__question">{item.q}</h3>
                  <p className="faq-item__answer">{item.a}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default FAQPage;
