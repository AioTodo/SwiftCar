import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, TextInput, Select, Button, Title, Text, Stack, Anchor, Group } from '@mantine/core';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, role });
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'agency') navigate('/agency/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="page page--login-page">
      <Container size="xs">
        <Paper shadow="md" radius="lg" p="xl" className="login-card">
          <Title order={2} ta="center" mb="xs" className="login-card__title">
            Login to SwiftCar
          </Title>
          <Text ta="center" c="dimmed" mb="lg" className="login-card__subtitle">
            Use the demo accounts from the README or any email with a selected role.
          </Text>

          <form onSubmit={onSubmit} className="login-form">
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />

              <Select
                label="Role"
                data={[
                  { value: 'customer', label: 'Customer' },
                  { value: 'agency', label: 'Agency' },
                  { value: 'admin', label: 'Admin' },
                ]}
                value={role}
                onChange={(value) => value && setRole(value)}
              />

              <div className="login-form__demo">
                <Text fz="sm" fw={500} mb="xs">
                  Demo accounts
                </Text>
                <ul className="login-form__demo-list">
                  <li>
                    <strong>Customer:</strong> customer@example.com
                  </li>
                  <li>
                    <strong>Agency:</strong> agency@example.com
                  </li>
                  <li>
                    <strong>Admin:</strong> admin@swiftcar.com
                  </li>
                </ul>
              </div>

              <Button type="submit" size="md" radius="md" fullWidth>
                Login
              </Button>
            </Stack>
          </form>

          <Text mt="lg" fz="sm" ta="center" className="login-card__footer-text">
            This is a frontend-only demo. Authentication is simulated based on the selected role.
          </Text>

          <Group justify="center" mt="md">
            <Text fz="sm" c="dimmed">
              Don&apos;t have an account?
            </Text>
            <Anchor component={Link} to="/signup" fz="sm" className="login-card__link">
              Sign up
            </Anchor>
          </Group>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
