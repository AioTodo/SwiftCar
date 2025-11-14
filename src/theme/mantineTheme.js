import { createTheme } from '@mantine/core';

// Mantine theme aligned with SwiftCar / Turo-inspired design tokens from SCSS
// This theme should be treated as the source of truth for colors/typography
// when using Mantine components.

export const mantineTheme = createTheme({
  primaryColor: 'brand',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  headings: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  },
  colors: {
    brand: [
      '#F7F7F7', // 0 - lightest
      '#E9ECEF', // 1
      '#DEE2E6', // 2
      '#CED4DA', // 3
      '#ADB5BD', // 4
      '#5FCF65', // 5 - primary accent (Turo green)
      '#4CAF50', // 6
      '#3742FA', // 7
      '#212529', // 8
      '#121214', // 9 - almost black
    ],
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
  },
  radius: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
