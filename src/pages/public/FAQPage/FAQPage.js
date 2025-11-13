import React from 'react';
import Card from '../../../components/common/Card';

const FAQPage = () => {
  const faqs = [
    { q: 'How do I book a car?', a: 'Search for a car, select dates, add extras, and confirm your booking.' },
    { q: 'Can I cancel a booking?', a: 'Yes, you can cancel pending/confirmed bookings from My Bookings.' },
    { q: 'How are prices calculated?', a: 'Base price is per-day plus optional extras. Commission is shown in priceCalculator.' },
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
