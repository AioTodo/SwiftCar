import React from 'react';
import Card from '../../../components/common/Card';
import ArticlesCardsGrid from './ArticlesCardsGrid';

const AboutPage = () => {
  return (
    <div className="about-page page">
      <div className="container container--narrow">
        <header className="page__header about-page__header">
          <div className="about-page__hero">
            <div className="about-page__hero-text">
              <h1>About SwiftCar</h1>
              <p className="page__description">
                SwiftCar is a prototype car rental marketplace that connects customers with local car rental agencies.
                This demo focuses on clear UX, transparent pricing, and realistic end-to-end flows across customers,
                agencies, and administrators.
              </p>
            </div>
            <div className="about-page__hero-media" aria-hidden="true">
              {/* Decorative illustration hook; replace with a real asset when available */}
              <div className="about-page__hero-image-placeholder" />
            </div>
          </div>
        </header>

        <section className="about-page__section">
          <Card>
            <Card.Body>
              <h2>Our Mission</h2>
              <p>
                Our goal is to make car rental simple, fair, and delightful for both customers and agencies through
                modern web experiences that feel fast, trustworthy, and transparent.
              </p>
              <p>
                SwiftCar is designed as a real-world style product demo, showcasing how customers, agencies, and
                administrators can collaborate in a single, cohesive platform.
              </p>
            </Card.Body>
          </Card>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__section-title">A platform for every role</h2>
          <ArticlesCardsGrid />
        </section>

        <section className="about-page__section about-page__section--support">
          <Card>
            <Card.Body>
              <h2>Support-first experience</h2>
              <p>
                Beyond core booking flows, SwiftCar includes supporting pages like FAQ, Help Center, and Contact so
                that users always know where to go for answers.
              </p>
              <ul className="about-page__list about-page__list--inline">
                <li>FAQ with clear answers to common questions</li>
                <li>Help Center sections for customers and agencies</li>
                <li>Contact page with a focused support form</li>
              </ul>
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;