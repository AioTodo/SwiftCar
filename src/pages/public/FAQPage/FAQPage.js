import React from 'react';
import { Accordion, Text } from '@mantine/core';
import Card from '../../../components/common/Card';

const faqs = [
  {
    id: 'book-car',
    label: 'How do I book a car?',
    description: 'From search to confirmation in three guided steps.',
    content:
      'Use the search bar to choose your location and dates, browse results, view car details, then follow the 3-step booking flow (dates, extras, review) and complete the payment form.',
  },
  {
    id: 'cancel-booking',
    label: 'Can I cancel a booking?',
    description: 'Manage or cancel eligible bookings from your dashboard.',
    content:
      'Yes. You can cancel eligible pending/confirmed bookings from the My Bookings page. Completed or past bookings cannot be cancelled.',
  },
  {
    id: 'price-calculation',
    label: 'How are prices calculated?',
    description: 'Base price per day plus extras and commission.',
    content:
      'Total price is based on price per day multiplied by the number of rental days, plus any selected extras (insurance, GPS, child seat, additional driver). Commission for SwiftCar is baked into the totals.',
  },
  {
    id: 'become-agency',
    label: 'How do I become an agency provider?',
    description: 'Register your agency and complete verification.',
    content:
      'Create an account as an agency owner and complete the agency registration form. Once verified by an admin, you can add vehicles, manage bookings, and track earnings.',
  },
  {
    id: 'help-support',
    label: 'Where can I get help or contact support?',
    description: 'Use the Help Center and Contact pages for support.',
    content:
      'Visit the Help Center to explore customer and agency guides. If you still need assistance, use the Contact page to send a message to support.',
  },
];

const FAQPage = () => {
  const items = faqs.map((item) => (
    <Accordion.Item value={item.id} key={item.id}>
      <Accordion.Control aria-label={item.label}>
        <div className="faq-accordion__label">
          <Text fw={600}>{item.label}</Text>
          {item.description && (
            <Text size="sm" c="dimmed" fw={400}>
              {item.description}
            </Text>
          )}
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="faq-page page">
      <div className="container container--narrow">
        <Card>
          <Card.Header>
            <h1>Frequently Asked Questions</h1>
          </Card.Header>
          <Card.Body>
            <Accordion
              chevronPosition="right"
              variant="contained"
              radius="md"
              defaultValue={faqs[0]?.id}
            >
              {items}
            </Accordion>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default FAQPage;