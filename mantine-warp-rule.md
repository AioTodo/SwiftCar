# Warp Rule: Mantine UI Library Integration and Styling Guide

## Overview
This document provides comprehensive guidelines for integrating and using Mantine UI library in your project, along with best practices for styling modifications while maintaining design consistency.

---

## Part 1: Mantine UI Library Setup and Usage

### Installation

#### NPM Installation
```bash
npm install @mantine/core @mantine/hooks
```

#### Yarn Installation
```bash
yarn add @mantine/core @mantine/hooks
```

#### Additional Packages (Optional)
```bash
# For form management
npm install @mantine/form

# For notifications
npm install @mantine/notifications

# For date pickers
npm install @mantine/dates dayjs

# For rich text editor
npm install @mantine/tiptap @tiptap/react @tiptap/starter-kit
```

### Configuration

#### 1. MantineProvider Setup
Wrap your application with `MantineProvider` in your root component:

```jsx
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      {/* Your app content */}
    </MantineProvider>
  );
}

export default App;
```

#### 2. Custom Theme Configuration
```jsx
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app content */}
    </MantineProvider>
  );
}
```

### Basic Component Examples

#### Button Component
```jsx
import { Button } from '@mantine/core';

function MyComponent() {
  return (
    <>
      <Button variant="filled">Filled Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="light">Light Button</Button>
      <Button variant="subtle">Subtle Button</Button>
    </>
  );
}
```

#### Input Components
```jsx
import { TextInput, PasswordInput, NumberInput } from '@mantine/core';

function FormExample() {
  return (
    <>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        required
      />
      
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
      />
      
      <NumberInput
        label="Age"
        placeholder="Enter your age"
        min={0}
        max={120}
      />
    </>
  );
}
```

#### Layout Components
```jsx
import { Container, Grid, Stack, Group } from '@mantine/core';

function LayoutExample() {
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          Column 1
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          Column 2
        </Grid.Col>
      </Grid>
      
      <Stack spacing="md">
        <div>Stacked Item 1</div>
        <div>Stacked Item 2</div>
      </Stack>
      
      <Group spacing="md">
        <div>Grouped Item 1</div>
        <div>Grouped Item 2</div>
      </Group>
    </Container>
  );
}
```

#### Card Component
```jsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function CardExample() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://example.com/image.jpg"
          height={160}
          alt="Card image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Card Title</Text>
        <Badge color="pink">Featured</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Card description goes here
      </Text>

      <Button fullWidth mt="md" radius="md">
        Action Button
      </Button>
    </Card>
  );
}
```

### Performance Optimization

#### 1. Tree Shaking
Mantine supports tree shaking out of the box. Import only the components you need:

```jsx
// Good - imports only what you need
import { Button, TextInput } from '@mantine/core';

// Avoid - imports everything
import * as Mantine from '@mantine/core';
```

#### 2. CSS Modules (Optional)
For custom styling with CSS Modules:

```jsx
import classes from './MyComponent.module.css';
import { Button } from '@mantine/core';

function MyComponent() {
  return <Button className={classes.myButton}>Click me</Button>;
}
```

#### 3. Lazy Loading
For large applications, consider code splitting:

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Part 2: Styling Modifications with Mantine

### Core Principles

1. **Preserve Original Values**: Maintain existing font families and color schemes
2. **Use Mantine's Theming**: Leverage built-in theming capabilities
3. **Maintain Consistency**: Ensure new styles align with existing design
4. **Preserve UX**: Keep layout and structure intact

### Styling Approaches

#### 1. Theme Override (Recommended)
Modify styles through theme configuration without changing component code:

```jsx
const theme = createTheme({
  // Preserve existing font family
  fontFamily: 'Your Existing Font, sans-serif',
  
  // Preserve existing colors
  colors: {
    brand: [
      '#E3F2FD', // Lightest
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3', // Base
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1', // Darkest
    ],
  },
  primaryColor: 'brand',
  
  // Update only spacing/sizing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  // Modify border radius
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  
  // Preserve heading styles
  headings: {
    fontFamily: 'Your Existing Heading Font, sans-serif',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4' },
    },
  },
});
```

#### 2. Component-Level Style Props
Update specific components without affecting others:

```jsx
import { Button } from '@mantine/core';

// Update button styling while preserving core design
<Button
  styles={{
    root: {
      paddingLeft: '2rem',
      paddingRight: '2rem',
      // Preserve existing font and colors from theme
    },
  }}
>
  Click Me
</Button>
```

#### 3. CSS Variables Approach
Use Mantine's CSS variables for global style updates:

```css
/* styles/global.css */
:root {
  /* Update shadows only */
  --mantine-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --mantine-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --mantine-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  
  /* Keep existing colors intact */
  /* Don't override color variables unless necessary */
}
```

#### 4. Sx Prop for Quick Adjustments
For component-specific style tweaks:

```jsx
import { Box, Text } from '@mantine/core';

<Box
  style={{
    padding: '1.5rem', // Update spacing
    borderRadius: '0.5rem', // Update radius
    // Don't change background-color or font-family
  }}
>
  <Text>Content</Text>
</Box>
```

### Best Practices for Style Modifications

#### ✅ DO:
- Use theme configuration for global changes
- Preserve existing font families and colors
- Test responsiveness after style changes
- Maintain existing spacing relationships
- Use Mantine's utility props when possible
- Document any significant style changes

#### ❌ DON'T:
- Hardcode colors that differ from the design system
- Change font families without approval
- Modify component structure
- Override styles with `!important` unless absolutely necessary
- Remove accessibility features
- Change semantic HTML structure

### Example: Updating a Form's Styling

**Before (keeping core values):**
```jsx
import { TextInput, Button, Stack } from '@mantine/core';

function LoginForm() {
  return (
    <Stack spacing="md">
      <TextInput
        label="Email"
        placeholder="email@example.com"
      />
      <Button>Login</Button>
    </Stack>
  );
}
```

**After (updated styling only):**
```jsx
import { TextInput, Button, Stack } from '@mantine/core';

function LoginForm() {
  return (
    <Stack spacing="lg"> {/* Updated spacing */}
      <TextInput
        label="Email"
        placeholder="email@example.com"
        radius="md" {/* Added border radius */}
        size="md" {/* Explicit size */}
      />
      <Button 
        radius="md" {/* Match input radius */}
        size="md"
        style={{ paddingLeft: '2rem', paddingRight: '2rem' }} {/* Custom padding */}
      >
        Login
      </Button>
    </Stack>
  );
}
```

### Responsive Styling Updates

```jsx
import { Container, Title } from '@mantine/core';

function ResponsiveComponent() {
  return (
    <Container
      size="xl"
      style={{
        padding: 'var(--mantine-spacing-md)',
        '@media (min-width: 768px)': {
          padding: 'var(--mantine-spacing-xl)',
        },
      }}
    >
      <Title
        order={1}
        style={{
          fontSize: '1.5rem',
          '@media (min-width: 768px)': {
            fontSize: '2.5rem',
          },
        }}
      >
        Responsive Title
      </Title>
    </Container>
  );
}
```

---

## Additional Resources

- **Official Documentation**: https://mantine.dev/
- **Component Library**: https://mantine.dev/core/button/
- **Theming Guide**: https://mantine.dev/theming/theme-object/
- **GitHub Repository**: https://github.com/mantinedev/mantine

---

## Quick Reference Checklist

### Installation
- [ ] Install @mantine/core and @mantine/hooks
- [ ] Import styles.css in root component
- [ ] Wrap app with MantineProvider

### Styling Modifications
- [ ] Preserve original font families
- [ ] Maintain existing color palette
- [ ] Update only spacing/sizing/borders as needed
- [ ] Test responsive behavior
- [ ] Document changes
- [ ] Verify accessibility remains intact