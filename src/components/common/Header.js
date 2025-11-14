import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Group, Button, Anchor, Text } from '@mantine/core';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const renderRoleLink = () => {
    if (!isAuthenticated || !user?.role) return null;

    if (user.role === 'customer') {
      return (
        <Anchor component={Link} to="/customer/dashboard" c="dimmed" fw={500}>
          Dashboard
        </Anchor>
      );
    }

    if (user.role === 'agency') {
      return (
        <Anchor component={Link} to="/agency/dashboard" c="dimmed" fw={500}>
          Agency
        </Anchor>
      );
    }

    if (user.role === 'admin') {
      return (
        <Anchor component={Link} to="/admin/dashboard" c="dimmed" fw={500}>
          Admin
        </Anchor>
      );
    }

    return null;
  };

  return (
    <header className="header">
      <Container size="lg" className="header__container">
        <Group justify="space-between" align="center">
          <Anchor component={Link} to="/" className="header__logo" underline="never">
            <Text component="h1" fw={700} fz="lg" c="dark" className="header__brand">
              SwiftCar
            </Text>
          </Anchor>

          <Group gap="md" className="header__nav">
            <Anchor component={Link} to="/search" c="dimmed" fw={500} className="header__link">
              Search Cars
            </Anchor>

            {!isAuthenticated && (
              <Button
                component={Link}
                to="/login"
                variant="light"
                size="sm"
                radius="md"
              >
                Login
              </Button>
            )}

            {renderRoleLink()}

            {isAuthenticated && (
              <Button
                type="button"
                variant="subtle"
                color="red"
                size="sm"
                radius="md"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Group>
        </Group>
      </Container>
    </header>
  );
};

export default Header;
