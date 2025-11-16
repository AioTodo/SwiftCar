import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Select,
  Button,
  Title,
  Text,
  Stack,
  Checkbox,
  Group,
  Anchor,
} from '@mantine/core';
import { useAuth } from '../../context/AuthContext';

const SignUpPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');

    const role = userType === 'agency' ? 'agency' : 'customer';

    login({
      firstName,
      lastName,
      email,
      phone,
      role,
    });

    if (role === 'agency') {
      navigate('/agency/register');
    } else {
      navigate('/customer/dashboard');
    }
  };

  const canSubmit =
    Boolean(firstName && lastName && email && password && confirmPassword) &&
    acceptTerms &&
    !passwordError;

  return (
    <div className="page page--login-page">
      <Container size="xs">
        <Paper shadow="md" radius="lg" p="xl" className="login-card">
          <Title order={2} ta="center" mb="xs" className="login-card__title">
            Create your SwiftCar account
          </Title>
          <Text ta="center" c="dimmed" mb="lg" className="login-card__subtitle">
            Sign up as a customer or agency owner to start using the platform.
          </Text>

          <form onSubmit={handleSubmit} className="login-form">
            <Stack gap="md">
              <Group grow>
                <TextInput
                  label="First name"
                  placeholder="John"
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                  required
                />
                <TextInput
                  label="Last name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                  required
                />
              </Group>

              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                required
              />

              <TextInput
                label="Phone"
                placeholder="+212600000000"
                value={phone}
                onChange={(event) => setPhone(event.currentTarget.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                required
              />

              <PasswordInput
                label="Confirm password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                error={passwordError || undefined}
                required
              />

              <Select
                label="I am registering as"
                data={[
                  { value: 'customer', label: 'Customer' },
                  { value: 'agency', label: 'Agency owner' },
                ]}
                value={userType}
                onChange={(value) => value && setUserType(value)}
              />

              <Checkbox
                label="I agree to the terms and conditions"
                checked={acceptTerms}
                onChange={(event) => setAcceptTerms(event.currentTarget.checked)}
              />

              <Button type="submit" size="md" radius="md" fullWidth disabled={!canSubmit}>
                Create account
              </Button>
            </Stack>
          </form>

          <Group justify="center" mt="lg">
            <Text fz="sm" c="dimmed">
              Already have an account?
            </Text>
            <Anchor component={Link} to="/login" fz="sm" className="login-card__link">
              Login
            </Anchor>
          </Group>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUpPage;
