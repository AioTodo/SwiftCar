# SwiftCar UI/UX Development Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Environment Setup](#environment-setup)
4. [Project Structure](#project-structure)
5. [Design System](#design-system)
6. [Component Architecture](#component-architecture)
7. [State Management Strategies](#state-management-strategies)
8. [Routing Structure](#routing-structure)
9. [Responsive Design Guidelines](#responsive-design-guidelines)
10. [Accessibility Standards](#accessibility-standards)
11. [Styling Conventions](#styling-conventions)
12. [Component Library](#component-library)
13. [Page Layouts](#page-layouts)
14. [Best Practices](#best-practices)

---

## 1. Project Overview

SwiftCar is a car rental booking platform designed to connect travelers with local car rental agencies. The platform features a commission-based model (5-7%) and includes comprehensive functionality for customers, agencies, and administrators.

### Core Features
- **Customer Features**: Search, booking, payments, reviews
- **Agency Features**: Registration, vehicle management, booking management, earnings tracking
- **Admin Features**: Agency verification, platform management, analytics

---

## 2. Technology Stack

### Core Technologies
- **React 18.x** - UI library (Create React App)
- **React Router DOM 6.x** - Client-side routing
- **Mantine UI** (`@mantine/core`, `@mantine/hooks`) - component library and theming
- **Sass/SCSS** - CSS preprocessor for design tokens, global layouts, and minimal overrides
- **CSS Grid & Flexbox** - Layout systems
- **Chart.js + react-chartjs-2** - analytics and dashboard charts
- **react-table** - data tables for dashboards and management views
- **lucide-react** - icon library for navigation and UI accents

### Development Tools
- **Node.js 18+** - JavaScript runtime
- **npm/yarn** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

### State Management Options
The project supports three state management approaches:
1. **Redux Toolkit** - For complex global state
2. **Context API + useReducer** - For moderate complexity
3. **Props drilling + local state** - For simple components

---

## 3. Environment Setup

### 3.1 Prerequisites

Ensure you have the following installed:
```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
```

### 3.2 Project Initialization

#### Step 1: Create React App
```bash
# Create new React application
npx create-react-app swiftcar

# Navigate to project directory
cd swiftcar
```

#### Step 2: Install Dependencies

**Core Dependencies:**
```bash
# Routing
npm install react-router-dom

# Sass preprocessor
npm install sass

# Redux (if using Redux approach)
npm install @reduxjs/toolkit react-redux

# Utility libraries
npm install classnames
npm install date-fns
```

**Development Dependencies:**
```bash
# ESLint configuration
npm install --save-dev eslint-config-airbnb
npm install --save-dev eslint-plugin-jsx-a11y

# Prettier
npm install --save-dev prettier eslint-config-prettier
```

#### Step 3: Project Configuration

**Create `.prettierrc` file:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

**Create `.eslintrc.json` file:**
```json
{
  "extends": [
    "react-app",
    "airbnb",
    "prettier"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": "warn",
    "no-console": "warn",
    "jsx-a11y/anchor-is-valid": "warn"
  }
}
```

**Update `package.json` scripts:**
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx}",
    "lint:fix": "eslint src/**/*.{js,jsx} --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,scss}\""
  }
}
```

### 3.3 Environment Variables

Create `.env` file in root directory:
```env
REACT_APP_NAME=SwiftCar
REACT_APP_API_URL=http://localhost:3000
REACT_APP_COMMISSION_MIN=5
REACT_APP_COMMISSION_MAX=7
```

---

## 4. Project Structure

### 4.1 Complete Directory Structure

```
swiftcar/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── images/
│       ├── cars/
│       ├── agencies/
│       ├── icons/
│       ├── logos/
│       └── placeholders/
│
├── src/
│   ├── index.js                    # Application entry point
│   ├── App.js                      # Root component
│   ├── App.scss                    # Global styles
│   │
│   ├── assets/                     # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                 # Reusable components
│   │   ├── common/                 # Shared components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.scss
│   │   │   │   └── index.js
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Loader/
│   │   │   ├── Notification/
│   │   │   └── StatusBadge/
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.scss
│   │   │   │   └── index.js
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Navigation/
│   │   │
│   │   ├── features/               # Feature-specific components
│   │   │   ├── search/
│   │   │   │   ├── SearchBar/
│   │   │   │   ├── FilterSidebar/
│   │   │   │   └── DatePicker/
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm/
│   │   │   │   ├── BookingCard/
│   │   │   │   └── PriceBreakdown/
│   │   │   ├── car/
│   │   │   │   ├── CarCard/
│   │   │   │   ├── CarDetails/
│   │   │   │   └── CarForm/
│   │   │   ├── review/
│   │   │   │   ├── ReviewCard/
│   │   │   │   ├── ReviewForm/
│   │   │   │   └── Rating/
│   │   │   └── agency/
│   │   │       ├── AgencyCard/
│   │   │       ├── AgencyForm/
│   │   │       └── VerificationStatus/
│   │   │
│   │   └── hoc/                    # Higher-Order Components
│   │       ├── withAuth.jsx
│   │       ├── withLoader.jsx
│   │       └── withErrorBoundary.jsx
│   │
│   ├── pages/                      # Page components
│   │   ├── public/
│   │   │   ├── HomePage/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── HomePage.scss
│   │   │   │   └── index.js
│   │   │   ├── SearchResultsPage/
│   │   │   ├── CarDetailsPage/
│   │   │   ├── LoginPage/
│   │   │   ├── SignUpPage/
│   │   │   ├── AboutPage/
│   │   │   └── ContactPage/
│   │   │
│   │   ├── customer/
│   │   │   ├── CustomerDashboard/
│   │   │   ├── BookingProcessPage/
│   │   │   ├── PaymentPage/
│   │   │   ├── MyBookingsPage/
│   │   │   ├── BookingDetailsPage/
│   │   │   └── ProfilePage/
│   │   │
│   │   ├── agency/
│   │   │   ├── AgencyDashboard/
│   │   │   ├── RegisterAgencyPage/
│   │   │   ├── VerificationPage/
│   │   │   ├── AddCarPage/
│   │   │   ├── ManageCarsPage/
│   │   │   ├── BookingsPage/
│   │   │   └── EarningsPage/
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard/
│   │       ├── VerifyAgenciesPage/
│   │       ├── ManageAgenciesPage/
│   │       └── AnalyticsPage/
│   │
│   ├── styles/                     # Global styles
│   │   ├── abstracts/
│   │   │   ├── _variables.scss     # SCSS variables
│   │   │   ├── _mixins.scss        # Reusable mixins
│   │   │   ├── _functions.scss     # SCSS functions
│   │   │   └── _breakpoints.scss   # Media query breakpoints
│   │   │
│   │   ├── base/
│   │   │   ├── _reset.scss         # CSS reset
│   │   │   ├── _typography.scss    # Typography styles
│   │   │   └── _utilities.scss     # Utility classes
│   │   │
│   │   ├── layout/
│   │   │   ├── _grid.scss          # Grid system
│   │   │   ├── _containers.scss    # Container styles
│   │   │   └── _spacing.scss       # Spacing utilities
│   │   │
│   │   └── main.scss               # Main SCSS file
│   │
│   ├── data/                       # Mock JSON data
│   │   ├── users.json
│   │   ├── agencies.json
│   │   ├── cars.json
│   │   ├── bookings.json
│   │   ├── reviews.json
│   │   └── commissions.json
│   │
│   ├── context/                    # React Context (if not using Redux)
│   │   ├── AuthContext.js
│   │   ├── BookingContext.js
│   │   └── NotificationContext.js
│   │
│   ├── redux/                      # Redux store (if using Redux)
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── carSlice.js
│   │   │   ├── bookingSlice.js
│   │   │   └── agencySlice.js
│   │   └── middleware/
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   ├── useMediaQuery.js
│   │   ├── useLocalStorage.js
│   │   └── useFetch.js
│   │
│   ├── utils/                      # Utility functions
│   │   ├── dateHelpers.js
│   │   ├── priceCalculator.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── services/                   # API/Data services
│   │   ├── dataService.js          # Mock data handler
│   │   ├── storageService.js       # LocalStorage handler
│   │   └── mockAPI.js              # Simulated API calls
│   │
│   └── routes/                     # Route configuration
│       ├── AppRoutes.jsx
│       ├── ProtectedRoute.jsx
│       └── routeConfig.js
│
├── .env                            # Environment variables
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── .gitignore
├── package.json
└── README.md
```

### 4.2 Folder Organization Principles

**Component Structure (Example):**
```
Button/
├── Button.jsx          # Component logic
├── Button.scss         # Component styles (BEM)
├── Button.test.js      # Component tests
└── index.js            # Export file
```

**index.js pattern:**
```javascript
export { default } from './Button';
```

---

## 5. Design System

### 5.1 Color Palette

**SCSS Variables (_variables.scss):**
```scss
// Primary Colors
$color-primary: #213555;        // Deep Navy Blue
$color-secondary: #3E5879;      // Slate Blue
$color-accent: #E1C884;         // Gold
$color-tertiary: #D8C4B6;       // Beige
$color-background: #F5EFE7;     // Light Cream

// Semantic Colors
$color-success: #4CAF50;        // Green
$color-warning: #FFC107;        // Amber
$color-error: #F44336;          // Red
$color-info: #2196F3;           // Blue

// Neutral Colors
$color-white: #FFFFFF;
$color-black: #000000;
$color-gray-100: #F8F9FA;
$color-gray-200: #E9ECEF;
$color-gray-300: #DEE2E6;
$color-gray-400: #CED4DA;
$color-gray-500: #ADB5BD;
$color-gray-600: #6C757D;
$color-gray-700: #495057;
$color-gray-800: #343A40;
$color-gray-900: #212529;

// Text Colors
$text-primary: $color-primary;
$text-secondary: $color-gray-700;
$text-muted: $color-gray-500;
$text-disabled: $color-gray-400;
```

### 5.2 Typography

**Font Stack:**
```scss
// Font Families
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
$font-secondary: 'Playfair Display', Georgia, serif;
$font-mono: 'Monaco', 'Courier New', monospace;

// Font Sizes (Mobile-first)
$font-size-xs: 0.75rem;      // 12px
$font-size-sm: 0.875rem;     // 14px
$font-size-base: 1rem;       // 16px
$font-size-lg: 1.125rem;     // 18px
$font-size-xl: 1.25rem;      // 20px
$font-size-2xl: 1.5rem;      // 24px
$font-size-3xl: 1.875rem;    // 30px
$font-size-4xl: 2.25rem;     // 36px
$font-size-5xl: 3rem;        // 48px

// Font Weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Line Heights
$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;
$line-height-loose: 2;
```

**Typography Classes (_typography.scss):**
```scss
// Headings
.heading {
  &--primary {
    font-family: $font-secondary;
    font-weight: $font-weight-bold;
    color: $text-primary;
    line-height: $line-height-tight;
    margin-bottom: 1rem;
  }

  &--h1 {
    font-size: $font-size-3xl;
    
    @include respond-to('tablet') {
      font-size: $font-size-4xl;
    }
    
    @include respond-to('desktop') {
      font-size: $font-size-5xl;
    }
  }

  &--h2 {
    font-size: $font-size-2xl;
    
    @include respond-to('tablet') {
      font-size: $font-size-3xl;
    }
  }

  &--h3 {
    font-size: $font-size-xl;
    
    @include respond-to('tablet') {
      font-size: $font-size-2xl;
    }
  }
}

// Body Text
.text {
  &--body {
    font-family: $font-primary;
    font-size: $font-size-base;
    line-height: $line-height-normal;
    color: $text-secondary;
  }

  &--small {
    font-size: $font-size-sm;
  }

  &--large {
    font-size: $font-size-lg;
  }

  &--muted {
    color: $text-muted;
  }
}
```

### 5.3 Spacing System

**8-Point Grid System:**
```scss
// Base spacing unit (8px)
$spacing-unit: 0.5rem;  // 8px

// Spacing scale
$spacing-0: 0;
$spacing-1: $spacing-unit;          // 8px
$spacing-2: $spacing-unit * 2;      // 16px
$spacing-3: $spacing-unit * 3;      // 24px
$spacing-4: $spacing-unit * 4;      // 32px
$spacing-5: $spacing-unit * 5;      // 40px
$spacing-6: $spacing-unit * 6;      // 48px
$spacing-8: $spacing-unit * 8;      // 64px
$spacing-10: $spacing-unit * 10;    // 80px
$spacing-12: $spacing-unit * 12;    // 96px
$spacing-16: $spacing-unit * 16;    // 128px

// Utility classes (_spacing.scss)
@each $size, $value in (
  '0': $spacing-0,
  '1': $spacing-1,
  '2': $spacing-2,
  '3': $spacing-3,
  '4': $spacing-4,
  '5': $spacing-5,
  '6': $spacing-6,
  '8': $spacing-8,
  '10': $spacing-10,
  '12': $spacing-12,
  '16': $spacing-16
) {
  .m-#{$size} { margin: $value; }
  .mt-#{$size} { margin-top: $value; }
  .mr-#{$size} { margin-right: $value; }
  .mb-#{$size} { margin-bottom: $value; }
  .ml-#{$size} { margin-left: $value; }
  .mx-#{$size} { margin-left: $value; margin-right: $value; }
  .my-#{$size} { margin-top: $value; margin-bottom: $value; }
  
  .p-#{$size} { padding: $value; }
  .pt-#{$size} { padding-top: $value; }
  .pr-#{$size} { padding-right: $value; }
  .pb-#{$size} { padding-bottom: $value; }
  .pl-#{$size} { padding-left: $value; }
  .px-#{$size} { padding-left: $value; padding-right: $value; }
  .py-#{$size} { padding-top: $value; padding-bottom: $value; }
}
```

### 5.4 Elevation (Shadows)

```scss
// Shadow definitions
$shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

// Utility classes
.shadow {
  &--xs { box-shadow: $shadow-xs; }
  &--sm { box-shadow: $shadow-sm; }
  &--md { box-shadow: $shadow-md; }
  &--lg { box-shadow: $shadow-lg; }
  &--xl { box-shadow: $shadow-xl; }
  &--2xl { box-shadow: $shadow-2xl; }
  &--none { box-shadow: none; }
}
```

### 5.5 Border Radius

```scss
// Border radius values
$radius-none: 0;
$radius-sm: 0.25rem;    // 4px
$radius-md: 0.5rem;     // 8px
$radius-lg: 0.75rem;    // 12px
$radius-xl: 1rem;       // 16px
$radius-2xl: 1.5rem;    // 24px
$radius-full: 9999px;   // Fully rounded

// Utility classes
.rounded {
  &--none { border-radius: $radius-none; }
  &--sm { border-radius: $radius-sm; }
  &--md { border-radius: $radius-md; }
  &--lg { border-radius: $radius-lg; }
  &--xl { border-radius: $radius-xl; }
  &--2xl { border-radius: $radius-2xl; }
  &--full { border-radius: $radius-full; }
}
```

### 5.6 Transitions & Animations

```scss
// Transition durations
$duration-fast: 150ms;
$duration-normal: 300ms;
$duration-slow: 500ms;

// Easing functions
$ease-in: cubic-bezier(0.4, 0, 1, 1);
$ease-out: cubic-bezier(0, 0, 0.2, 1);
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

// Standard transition
$transition-base: all $duration-normal $ease-in-out;

// Mixin for transitions
@mixin transition($properties...) {
  transition: $properties;
}
```

---

## 6. Component Architecture

### 6.1 Component Design Principles

**1. Single Responsibility:**
- Each component should have one clear purpose
- Split complex components into smaller ones

**2. Composition Over Inheritance:**
- Use component composition
- Leverage children props

**3. Props Interface:**
- Define clear prop types
- Provide default props
- Document expected props

### 6.2 Component Template

**Button Component Example:**

**Button.jsx:**
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

/**
 * Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.fullWidth - Full width flag
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - Button type
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  className,
  ...rest
}) => {
  const buttonClasses = classNames(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--full-width': fullWidth,
      'button--disabled': disabled,
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
```

**Button.scss:**
```scss
@import '../../styles/abstracts/variables';
@import '../../styles/abstracts/mixins';

.button {
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-primary;
  font-weight: $font-weight-semibold;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border: 2px solid transparent;
  border-radius: $radius-md;
  cursor: pointer;
  transition: $transition-base;
  user-select: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.3);
  }

  // Size variants
  &--small {
    padding: $spacing-1 $spacing-2;
    font-size: $font-size-sm;
    min-height: 2rem;
  }

  &--medium {
    padding: $spacing-2 $spacing-3;
    font-size: $font-size-base;
    min-height: 2.5rem;
  }

  &--large {
    padding: $spacing-3 $spacing-4;
    font-size: $font-size-lg;
    min-height: 3rem;
  }

  // Style variants
  &--primary {
    background-color: $color-primary;
    color: $color-white;
    border-color: $color-primary;

    &:hover:not(.button--disabled) {
      background-color: darken($color-primary, 10%);
      border-color: darken($color-primary, 10%);
    }

    &:active:not(.button--disabled) {
      background-color: darken($color-primary, 15%);
    }
  }

  &--secondary {
    background-color: $color-secondary;
    color: $color-white;
    border-color: $color-secondary;

    &:hover:not(.button--disabled) {
      background-color: darken($color-secondary, 10%);
    }
  }

  &--outline {
    background-color: transparent;
    color: $color-primary;
    border-color: $color-primary;

    &:hover:not(.button--disabled) {
      background-color: rgba($color-primary, 0.1);
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-primary;
    border-color: transparent;

    &:hover:not(.button--disabled) {
      background-color: rgba($color-primary, 0.1);
    }
  }

  &--danger {
    background-color: $color-error;
    color: $color-white;
    border-color: $color-error;

    &:hover:not(.button--disabled) {
      background-color: darken($color-error, 10%);
    }
  }

  // Modifiers
  &--full-width {
    width: 100%;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

### 6.3 Common Component Patterns

**Container Component Pattern:**
```javascript
// Container component handles logic
const CarListContainer = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data logic
  }, []);

  return <CarListPresentation cars={cars} loading={loading} />;
};

// Presentation component handles UI
const CarListPresentation = ({ cars, loading }) => {
  if (loading) return <Loader />;
  
  return (
    <div className="car-list">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
```

**Compound Component Pattern:**
```javascript
const Card = ({ children, className }) => (
  <div className={classNames('card', className)}>
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <div className="card__header">{children}</div>
);

Card.Body = ({ children }) => (
  <div className="card__body">{children}</div>
);

Card.Footer = ({ children }) => (
  <div className="card__footer">{children}</div>
);

// Usage
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## 7. State Management Strategies

### 7.1 Strategy 1: Redux Toolkit

**Store Configuration (store.js):**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carReducer from './slices/carSlice';
import bookingReducer from './slices/bookingSlice';
import agencyReducer from './slices/agencySlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    bookings: bookingReducer,
    agencies: agencyReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
```

**Slice Example (authSlice.js):**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/dataService';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authService.login(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
```

**Component Usage:**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (email, password) => {
    await dispatch(loginUser({ email, password }));
  };

  return (
    <LoginForm 
      onSubmit={handleLogin} 
      loading={loading} 
      error={error} 
    />
  );
};
```

### 7.2 Strategy 2: Context API + useReducer

**Auth Context (AuthContext.js):**
```javascript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/dataService';

const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        }
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      }
    };
    checkAuth();
  }, []);

  // Actions
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const user = await authService.login(email, password);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      return user;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const updateUser = (userData) => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: userData });
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Component Usage:**
```javascript
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login, loading, error } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect on success
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <LoginForm 
      onSubmit={handleLogin} 
      loading={loading} 
      error={error} 
    />
  );
};
```

### 7.3 Strategy 3: Props Drilling + Local State

**Parent Component:**
```javascript
import React, { useState, useEffect } from 'react';
import CarList from '../../components/features/car/CarList';
import FilterSidebar from '../../components/features/search/FilterSidebar';
import { carService } from '../../services/dataService';

const SearchResultsPage = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    category: '',
    features: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const data = await carService.search(filters);
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="search-results">
      <FilterSidebar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      <CarList 
        cars={cars} 
        loading={loading} 
      />
    </div>
  );
};
```

**Child Component:**
```javascript
const CarList = ({ cars, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (cars.length === 0) {
    return <EmptyState message="No cars found" />;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car.carId} car={car} />
      ))}
    </div>
  );
};
```

### 7.4 Choosing the Right Strategy

**Use Redux Toolkit when:**
- Complex global state shared across many components
- Need middleware (logging, analytics)
- Large application with multiple features
- Team prefers Redux patterns

**Use Context API when:**
- Moderate state complexity
- State used in specific component trees
- Fewer state updates
- Simpler learning curve needed

**Use Props + Local State when:**
- Simple component hierarchies
- State only needed in small component tree
- Performance is critical (avoid unnecessary re-renders)
- Quick prototyping

---

## 8. Routing Structure

### 8.1 Route Configuration

**routeConfig.js:**
```javascript
export const ROUTES = {
  // Public routes
  HOME: '/',
  SEARCH: '/search/:serviceType',
  CAR_DETAILS: '/car/:carId',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Customer routes
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  BOOKING_PROCESS: '/booking/:carId',
  PAYMENT: '/payment/:bookingId',
  BOOKING_CONFIRMATION: '/booking/confirmation/:bookingId',
  MY_BOOKINGS: '/customer/bookings',
  BOOKING_DETAILS: '/customer/booking/:bookingId',
  CUSTOMER_PROFILE: '/customer/profile',
  WRITE_REVIEW: '/customer/review/:bookingId',

  // Agency routes
  AGENCY_REGISTER: '/agency/register',
  AGENCY_VERIFICATION: '/agency/verification/:agencyId',
  AGENCY_DASHBOARD: '/agency/dashboard',
  ADD_CAR: '/agency/car/add',
  MANAGE_CARS: '/agency/cars',
  EDIT_CAR: '/agency/car/edit/:carId',
  AGENCY_BOOKINGS: '/agency/bookings',
  BOOKING_MANAGEMENT: '/agency/booking/:bookingId',
  EARNINGS: '/agency/earnings',
  AGENCY_PROFILE: '/agency/profile',

  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  PENDING_VERIFICATIONS: '/admin/verifications',
  AGENCY_REVIEW: '/admin/verification/:agencyId',
  ALL_AGENCIES: '/admin/agencies',
  ALL_USERS: '/admin/users',
  PLATFORM_ANALYTICS: '/admin/analytics',
};
```

**AppRoutes.jsx:**
```javascript
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routeConfig';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import CustomerLayout from '../components/layout/CustomerLayout';
import AgencyLayout from '../components/layout/AgencyLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public pages
import HomePage from '../pages/public/HomePage';
import SearchResultsPage from '../pages/public/SearchResultsPage';
import CarDetailsPage from '../pages/public/CarDetailsPage';
import LoginPage from '../pages/public/LoginPage';
import SignUpPage from '../pages/public/SignUpPage';

// Customer pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import BookingProcessPage from '../pages/customer/BookingProcessPage';
import MyBookingsPage from '../pages/customer/MyBookingsPage';

// Agency pages
import AgencyDashboard from '../pages/agency/AgencyDashboard';
import AddCarPage from '../pages/agency/AddCarPage';
import ManageCarsPage from '../pages/agency/ManageCarsPage';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import PendingVerificationsPage from '../pages/admin/PendingVerificationsPage';

// Protected route wrapper
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
        <Route path={ROUTES.CAR_DETAILS} element={<CarDetailsPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Route>

      {/* Customer Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.CUSTOMER_DASHBOARD} element={<CustomerDashboard />} />
        <Route path={ROUTES.BOOKING_PROCESS} element={<BookingProcessPage />} />
        <Route path={ROUTES.MY_BOOKINGS} element={<MyBookingsPage />} />
        {/* Add more customer routes */}
      </Route>

      {/* Agency Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['provider']}>
            <AgencyLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.AGENCY_DASHBOARD} element={<AgencyDashboard />} />
        <Route path={ROUTES.ADD_CAR} element={<AddCarPage />} />
        <Route path={ROUTES.MANAGE_CARS} element={<ManageCarsPage />} />
        {/* Add more agency routes */}
      </Route>

      {/* Admin Protected Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.PENDING_VERIFICATIONS} element={<PendingVerificationsPage />} />
        {/* Add more admin routes */}
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRoutes;
```

**ProtectedRoute.jsx:**
```javascript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from './routeConfig';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.userType)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## 9. Responsive Design Guidelines

### 9.1 Breakpoints

**_breakpoints.scss:**
```scss
// Breakpoint values
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;

// Breakpoint map
$breakpoints: (
  'mobile': $breakpoint-xs,
  'mobile-lg': $breakpoint-sm,
  'tablet': $breakpoint-md,
  'desktop': $breakpoint-lg,
  'desktop-lg': $breakpoint-xl,
  'desktop-xl': $breakpoint-xxl,
);

// Mixin for media queries
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// Usage example:
// .element {
//   width: 100%;
//   
//   @include respond-to('tablet') {
//     width: 50%;
//   }
//   
//   @include respond-to('desktop') {
//     width: 33.333%;
//   }
// }
```

### 9.2 Mobile-First Approach

**Mobile-first styling example:**
```scss
.card {
  // Mobile styles (default)
  padding: $spacing-2;
  margin-bottom: $spacing-2;
  
  // Tablet and up
  @include respond-to('tablet') {
    padding: $spacing-3;
    margin-bottom: $spacing-3;
  }
  
  // Desktop and up
  @include respond-to('desktop') {
    padding: $spacing-4;
    margin-bottom: $spacing-4;
  }
}
```

### 9.3 Responsive Grid System

**_grid.scss:**
```scss
// Container
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: $spacing-2;
  padding-right: $spacing-2;

  @include respond-to('tablet') {
    padding-left: $spacing-3;
    padding-right: $spacing-3;
    max-width: 720px;
  }

  @include respond-to('desktop') {
    padding-left: $spacing-4;
    padding-right: $spacing-4;
    max-width: 960px;
  }

  @include respond-to('desktop-lg') {
    max-width: 1140px;
  }

  @include respond-to('desktop-xl') {
    max-width: 1320px;
  }

  &--fluid {
    max-width: 100%;
  }
}

// Grid system
.grid {
  display: grid;
  gap: $spacing-3;

  &--cols-1 { grid-template-columns: repeat(1, 1fr); }
  &--cols-2 { grid-template-columns: repeat(2, 1fr); }
  &--cols-3 { grid-template-columns: repeat(3, 1fr); }
  &--cols-4 { grid-template-columns: repeat(4, 1fr); }

  // Responsive grid
  &--responsive {
    grid-template-columns: repeat(1, 1fr);

    @include respond-to('mobile-lg') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('desktop') {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-to('desktop-lg') {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

// Flex utilities
.flex {
  display: flex;

  &--column { flex-direction: column; }
  &--wrap { flex-wrap: wrap; }
  &--center { 
    justify-content: center; 
    align-items: center; 
  }
  &--between { justify-content: space-between; }
  &--around { justify-content: space-around; }
  &--start { justify-content: flex-start; }
  &--end { justify-content: flex-end; }
}
```

### 9.4 Responsive Typography

```scss
// Fluid typography mixin
@mixin fluid-type($min-font-size, $max-font-size, $min-vw: 320px, $max-vw: 1200px) {
  font-size: $min-font-size;

  @media (min-width: $min-vw) {
    font-size: calc(
      #{$min-font-size} + 
      #{strip-unit($max-font-size - $min-font-size)} * 
      (100vw - #{$min-vw}) / 
      #{strip-unit($max-vw - $min-vw)}
    );
  }

  @media (min-width: $max-vw) {
    font-size: $max-font-size;
  }
}

// Helper function
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

// Usage
.heading--fluid {
  @include fluid-type(1.5rem, 3rem);
}
```

### 9.5 Responsive Images

```scss
.image {
  &--responsive {
    max-width: 100%;
    height: auto;
    display: block;
  }

  &--cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--contain {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
```

**React component:**
```javascript
const ResponsiveImage = ({ src, alt, className }) => {
  return (
    <picture>
      <source
        media="(max-width: 576px)"
        srcSet={`${src}-mobile.jpg`}
      />
      <source
        media="(max-width: 992px)"
        srcSet={`${src}-tablet.jpg`}
      />
      <img
        src={`${src}-desktop.jpg`}
        alt={alt}
        className={classNames('image--responsive', className)}
        loading="lazy"
      />
    </picture>
  );
};
```

### 9.6 Mobile Navigation Pattern

```javascript
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        
        {/* Mobile menu toggle */}
        <button
          className="header__menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="header__menu-icon" />
        </button>

        {/* Navigation */}
        <nav className={classNames(
          'header__nav',
          { 'header__nav--open': mobileMenuOpen }
        )}>
          <NavigationLinks />
        </nav>
      </div>
    </header>
  );
};
```

```scss
.header {
  &__menu-toggle {
    display: block;
    
    @include respond-to('desktop') {
      display: none;
    }
  }

  &__nav {
    // Mobile: hidden by default
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: $color-white;
    transition: left $duration-normal;
    z-index: 1000;

    &--open {
      left: 0;
    }

    // Desktop: always visible
    @include respond-to('desktop') {
      position: static;
      width: auto;
      height: auto;
    }
  }
}
```

---

## 10. Accessibility Standards

### 10.1 WCAG 2.1 AA Compliance

**Key Principles:**
1. **Perceivable**: Information must be presentable to users
2. **Operable**: UI components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough for assistive technologies

### 10.2 Semantic HTML

```javascript
// Good - Semantic HTML
const ArticleCard = ({ article }) => (
  <article className="article-card">
    <header>
      <h2>{article.title}</h2>
      <time dateTime={article.date}>
        {formatDate(article.date)}
      </time>
    </header>
    <p>{article.excerpt}</p>
    <footer>
      <a href={article.url}>Read more</a>
    </footer>
  </article>
);

// Bad - Non-semantic divs
const ArticleCard = ({ article }) => (
  <div className="article-card">
    <div>
      <div>{article.title}</div>
      <div>{formatDate(article.date)}</div>
    </div>
    <div>{article.excerpt}</div>
    <div>
      <div onClick={handleClick}>Read more</div>
    </div>
  </div>
);
```

### 10.3 ARIA Attributes

```javascript
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Trap focus within modal
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="modal__close"
          >
            ×
          </button>
        </header>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### 10.4 Keyboard Navigation

```javascript
const Dropdown = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => 
          Math.min(prev + 1, options.length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        className="dropdown__trigger"
      >
        <span id="dropdown-label">{label}:</span> {value}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="dropdown__menu"
          aria-activedescendant={
            focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
          }
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={classNames('dropdown__option', {
                'dropdown__option--focused': index === focusedIndex,
              })}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### 10.5 Color Contrast

```scss
// WCAG AA requires 4.5:1 contrast ratio for normal text
// WCAG AAA requires 7:1 contrast ratio

// Ensure sufficient contrast
.button--primary {
  background-color: $color-primary; // #213555
  color: $color-white;              // Contrast ratio: 12.6:1 ✓
}

.text--muted {
  color: $color-gray-600;           // #6C757D
  // Ensure this has 4.5:1 against background
}

// Mixin to check contrast (development helper)
@mixin ensure-contrast($bg, $fg, $ratio: 4.5) {
  // In practice, use a contrast checker tool
  background-color: $bg;
  color: $fg;
}
```

### 10.6 Focus Indicators

```scss
// Global focus styles
*:focus {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

// Custom focus ring
.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba($color-primary, 0.3);
}

// Remove focus for mouse users (but keep for keyboard)
.button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

### 10.7 Screen Reader Support

```javascript
const StatusMessage = ({ type, message }) => (
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className={`status-message status-message--${type}`}
  >
    <span className="sr-only">
      {type === 'error' ? 'Error: ' : 'Success: '}
    </span>
    {message}
  </div>
);
```
