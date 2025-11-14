# Unit Tests Documentation

This document describes the unit and integration tests currently implemented for the SwiftCar application.

## Test Files & Coverage (Current State)

### 1. App Shell Tests

**File**: `src/App.test.js`

- ✅ Renders the application header brand ("SwiftCar") inside the banner region.
- Wraps `App` with `AuthProvider`, `BookingProvider`, `NotificationProvider`, and `MemoryRouter` to ensure providers compose correctly.

### 2. Service Layer Tests

#### 2.1 `storageService`
**File**: `src/services/storageService.test.js`

Covers the `storage` wrapper around `localStorage`:
- ✅ `get` retrieves and parses stored items (primitives, arrays, nested objects).
- ✅ `get` returns fallback values when keys are missing, JSON is invalid, or `getItem` throws.
- ✅ `set` serializes values correctly (objects, arrays, primitives) and overwrites existing keys.
- ✅ `set` returns `false` when `setItem` throws.
- ✅ `remove` deletes items, is safe for missing keys, and swallows storage errors.
- ✅ Integration: complete workflow for `set → get → remove` across multiple keys.

#### 2.2 `carsAPI`
**File**: `src/services/carsAPI.test.js`

Covers the storage-backed car API in `src/services/api.js`:
- ✅ `list` returns an empty array when nothing is stored.
- ✅ `create` validates required fields and persists a car with generated `id` and timestamps.
- ✅ `getById` returns a car by id or `null` when not found.
- ✅ `update` merges patches, bumps `updatedAt`, and updates persisted data.
- ✅ `update` throws when the car does not exist.
- ✅ `remove` deletes a car and returns `true`, leaving other cars intact.

#### 2.3 `bookingsAPI`
**File**: `src/services/bookingsAPI.test.js`

Covers the storage-backed booking API in `src/services/api.js`:
- ✅ `create` validates required fields and persists a pending booking.
- ✅ `create` computes total price via `priceCalculator.totalPrice` and stores it.
- ✅ `listByUser` returns bookings for a specific user, ordered newest-first.
- ✅ `listByAgency` returns bookings for a specific agency, ordered newest-first.
- ✅ `updateStatus` updates `status` and `updatedAt` and persists changes.
- ✅ `cancel` sets status to `cancelled` and updates persisted data.

### 3. Utility Tests

#### 3.1 `priceCalculator`
**File**: `src/utils/priceCalculator.test.js`

Covers:
- **`rentalDays`** — day count across same day, multiple days, weeks, month/year boundaries, and `Date` object inputs.
- **`basePrice`** — base rental price over different durations, rounding behavior, zero/negative scenarios.
- **`extrasCost`** — costs for individual extras (insurance, GPS, child seat, additional driver), combinations, all extras, and unknown/false extras.
- **`totalPrice`** — aggregation of base price + extras across several scenarios (with/without extras).
- **`commission`** — commission with default/custom rates, rounding, zero totals/rates, large and decimal amounts.
- **Integration** — complete booking price calculations with and without extras, including commission.

#### 3.2 `validators`
**File**: `src/utils/validators.test.js`

Covers form-validation helpers:
- **`required`** — strings (including whitespace), numbers, booleans, arrays, objects, `null`/`undefined` handling and trimming.
- **`email`** — valid/invalid addresses, casing, missing parts, extra `@`, spaces, and empty/null/undefined.
- **`minLength`** — various lengths, empty strings, `null`/`undefined`, numeric coercion, zero/negative minimums.
- **`passwordMatch`** — matches vs mismatches, empty values, case sensitivity, whitespace, special characters, numeric and long passwords, `null`/`undefined`.
- **Integration scenarios** — validating a full signup form and edge-case combinations.

### 4. Page & Component Tests

These tests exercise higher-level UI behavior using React Testing Library.

#### 4.1 Public pages

- **AboutPage** — `src/pages/public/AboutPage/AboutPage.test.js`
- **CarDetailsPage** — `src/pages/public/CarDetailsPage/CarDetailsPage.test.js`
- **ContactPage** — `src/pages/public/ContactPage/ContactPage.test.js`
- **NotFoundPage** — `src/pages/public/NotFoundPage/NotFoundPage.test.js`
- **SignUpPage** — `src/pages/public/SignUpPage/SignUpPage.test.js`

Typical coverage includes:
- Rendering of page headings and key sections.
- Presence of core content (copy, call-to-action elements).
- For `SignUpPage`, basic form rendering and initial UX expectations.

#### 4.2 Customer pages

- **BookingProcessPage** — `src/pages/customer/BookingProcessPage/BookingProcessPage.test.js`
- **PaymentPage** — `src/pages/customer/PaymentPage/PaymentPage.test.js`
- **MyBookingsPage** — `src/pages/customer/MyBookingsPage/MyBookingsPage.test.js`
- **WriteReviewPage** — `src/pages/customer/WriteReviewPage/WriteReviewPage.test.js`

These tests focus on:
- Rendering of key steps/sections (booking steps, payment summary, bookings list, review form).
- Interactions such as submitting a review, showing lists of bookings, and basic navigation flows.

#### 4.3 Agency pages

- **ManageCarsPage** — `src/pages/agency/ManageCarsPage/ManageCarsPage.test.js`
- **BookingRequestsPage** — `src/pages/agency/BookingRequestsPage/BookingRequestsPage.test.js`

Coverage includes:
- Rendering of tables/lists for cars and booking requests.
- Approve/decline actions for booking requests and resulting UI updates.

#### 4.4 Shared booking components

- **BookingSummary** — `src/components/booking/BookingSummary/BookingSummary.test.js`
- **DateRangePicker** — `src/components/booking/DateRangePicker/DateRangePicker.test.js`
- **ExtrasSelector** — `src/components/booking/ExtrasSelector/ExtrasSelector.test.js`

These tests check:
- Correct display of booking summary details.
- Date range selection behavior and callbacks.
- Extras toggle behavior and price-impact UI.

## Running the Tests

To run all tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm test -- --watch
```

To run a specific test file:
```bash
npm test -- App.test.js
npm test -- storageService.test.js
npm test -- carsAPI.test.js
npm test -- bookingsAPI.test.js
npm test -- priceCalculator.test.js
npm test -- validators.test.js
npm test -- AboutPage.test.js
npm test -- BookingProcessPage.test.js
npm test -- BookingRequestsPage.test.js
npm test -- CarDetailsPage.test.js
npm test -- ContactPage.test.js
npm test -- ManageCarsPage.test.js
npm test -- MyBookingsPage.test.js
npm test -- NotFoundPage.test.js
npm test -- PaymentPage.test.js
npm test -- SignUpPage.test.js
npm test -- WriteReviewPage.test.js
npm test -- BookingSummary.test.js
npm test -- DateRangePicker.test.js
npm test -- ExtrasSelector.test.js
```

To run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## Test Summary

- **Total Test Files**: 20+ (see list above)
- **Components/Pages Tested**: public pages, customer booking flow, agency management, and shared booking components
- **Services Tested**: storageService, carsAPI, bookingsAPI
- **Utilities Tested**: priceCalculator, validators

## Key Testing Patterns Used

1. **Mocking**: External dependencies (API calls, localStorage, navigation) are mocked
2. **Isolation**: Each test is independent and can run in any order
3. **Edge Cases**: Tests cover both happy paths and error scenarios
4. **Integration Tests**: Some tests verify multiple functions working together
5. **Validation**: All validation logic is thoroughly tested with various inputs

## Test Coverage (High Level)

Current tests cover:
- App shell rendering (header brand) and provider composition.
- Storage-backed services for cars and bookings (create, list, update, cancel/remove, validation).
- Storage service CRUD behavior and error handling.
- Price calculation logic including extras and commission.
- Form validation helpers for signup and general input validation.
- Core public pages (about, contact, car details, not-found).
- Customer booking flow pages (booking process, payment, my bookings, review submission).
- Agency management pages (manage cars, booking requests).
- Shared booking UI components (summary, date range picker, extras selector).

## Dependencies

The tests use:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- Jest (built-in with Create React App)

## Notes

- All tests are written in JavaScript using Jest and React Testing Library.
- Tests are independent and don't rely on execution order.
- Mocks (localStorage, Date.now, etc.) are reset between tests.
- Both happy paths and error/edge cases are covered for core utilities and services.
- Additional tests can be added alongside components as `*.test.js` files.
