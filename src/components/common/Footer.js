import React from 'react';
import { Container, Text, Group, Anchor } from '@mantine/core';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container size="lg" className="footer__container">
        <Group justify="space-between" align="flex-start" className="footer__section">
          <div>
            <Text fw={700} fz="lg" className="footer__title">
              SwiftCar
            </Text>
            <Text fz="sm" c="dimmed" className="footer__text">
              Rent your perfect car with verified local agencies.
            </Text>
          </div>

          <div>
            <Text fw={600} fz="sm" className="footer__heading">
              Company
            </Text>
            <Anchor component="button" type="button" c="gray.3" className="footer__link">
              About
            </Anchor>
            <Anchor component="button" type="button" c="gray.3" className="footer__link">
              Contact
            </Anchor>
          </div>
        </Group>

        <Text mt="md" fz="xs" c="gray.4" className="footer__copyright">
          © {year} SwiftCar. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
