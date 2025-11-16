# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core commands

All commands are intended to be run from the project root (`swiftcar/`). This is a Create React App (CRA) project using `react-scripts`.

- Install dependencies (if not already installed):
  - `npm install`
- Start development server (includes basic linting via console warnings):
  - `npm start`
- Run the full test suite (Jest via CRA, in watch mode):
  - `npm test`
- Run a single test file or pattern (Jest filter via CRA):
  - `npm test -- priceCalculator.test.js`
  - or more generally: `npm test -- <name-or-regex>`
- Create a production build:
  - `npm run build`

> Note: There is no dedicated lint script defined in `package.json`; lint feedback appears in the dev server and test output. If a standalone lint command is needed, add one explicitly to `package.json` rather than assuming an existing script.

## Documentation to consult first

- `README.md` — high-level overview, feature list, tech stack, and standard CRA scripts.
- `docs/new/instructions.md` — **authoritative product & UI specification** for SwiftCar, including:
  - Full page/route catalog for public, customer, agency, and admin flows.
  - Shared component library design and expected props/behaviors.
  - Mock data schemas for `src/data/*.json` and how the frontend should simulate backend behavior.
  - Styling system (colors, typography, SCSS structure, BEM usage).
  - Phased implementation roadmap and testing journeys.
<<<<<<< HEAD

When implementing new features, align behavior and naming with `docs/new/instructions.md` and then fit them into the existing code structure described below.
=======
- `mantine-warp-rule.md` — **canonical Mantine integration and styling rules**. When Mantine is used, this file defines how components should be themed and how legacy styling should be migrated.

When implementing new features, align behavior and naming with `docs/new/instructions.md` and styling decisions with `mantine-warp-rule.md`, then fit them into the existing code structure described below.
>>>>>>> admin-update

## High-level architecture

### Application shell & entry

- Entry point: `src/index.js` mounts the React app and wires global styles and providers.
- Root component: `src/App.js` composes the global layout and sets up routing via `AppRoutes`.
- The app is a single-page application (SPA) built with React and React Router DOM.

### Routing, roles, and layouts

- Route configuration lives in `src/routes/`:
  - `AppRoutes.js` defines the main `<BrowserRouter>` tree.
  - `ProtectedRoute.js` wraps routes that require authentication and enforces **role-based access control** (e.g., `allowedRoles={["customer"]}`, `"agency"`, or `"admin"`).
- High-level separation of page groups (each under `src/pages/`):
  - `pages/public/` — marketing and unauthenticated flows (home, search, car details, login, etc.).
  - `pages/customer/` — customer dashboards and booking-related flows.
  - `pages/agency/` — agency onboarding, fleet management, bookings, and earnings views.
  - `pages/admin/` — platform administration and analytics (currently more limited than the full spec in `docs/new/instructions.md`).
- Layout components (as described in the spec and partially present in code) wrap each role’s routes to provide consistent chrome:
  - `PublicLayout`, `CustomerLayout`, `AgencyLayout`, `AdminLayout` under `src/components/layout/` (check existing implementation before adding new files; the spec in `instructions.md` shows the intended structure).

### State management & context

Global cross-cutting state is handled via React Context in `src/context/`:

- `AuthContext.js`
  - Stores the current user, their role (`customer` / `agency` / `admin`), and authentication status.
  - Exposes login/logout helpers and is used by `ProtectedRoute` and role-specific sections.
  - Expected to integrate with localStorage for session persistence (as described in `instructions.md`).

- `BookingContext.js`
  - Tracks the current booking in progress: selected car, dates, extras, and derived pricing.
  - Used across the booking flow pages (date selection, extras, payment, confirmation) to maintain continuity.

- `NotificationContext.js`
  - Manages global toast/notification state and exposes `showNotification`-style helpers.
  - Drives the `Notification` UI component under `src/components/common/`.

When adding new global behaviors (e.g., additional user preferences), prefer extending or adding Context providers in this directory and wiring them at the top level (around `AppRoutes`).

### Data layer & backend simulation

This is a **frontend-only** project. All "backend" behavior is simulated using JSON files and services:

- Static/mock data lives in `src/data/` (e.g., `users.json`, `agencies.json`, `cars.json`, `bookings.json`, `reviews.json`, `commissions.json`, `payments.json`, `notifications.json`). The exact schema and intended semantics are documented in `docs/new/instructions.md`.
- Service layer in `src/services/` abstracts data access and side effects:
  - `dataService.js` — convenience functions for reading and querying the mock JSON data.
  - `storageService.js` (and tests) — encapsulates localStorage operations (e.g., persisting sessions, bookings, or user preferences) behind a testable API.
  - `entityStore.js` — centralizes CRUD-style operations and in-memory representations for entities (cars, bookings, etc.).
  - `mockAPI.js` — simulates asynchronous API calls and latency (via `setTimeout` or similar), intended to mimic real network requests.
- When implementing new features, treat this service layer as the boundary between UI and data:
  - Keep React components free of direct JSON imports where possible; call the relevant service instead.
  - Simulate network behavior in `mockAPI`/services rather than scattering `setTimeout` logic in components.

### UI components & design system

- Shared UI components live under `src/components/`, with `common/` containing cross-cutting building blocks (header, footer, notifications, etc.).
- The **full intended component taxonomy** (e.g., cards, search/filter UI, rating, modals, stats cards, timelines) is defined in detail in `docs/new/instructions.md` under "Shared Components". The codebase currently implements only a subset of that list.
<<<<<<< HEAD
=======
- Official UI libraries used in this project:
  - **Mantine UI** (`@mantine/core`, `@mantine/hooks`) for components, layout primitives, and theming.
  - **Chart.js + react-chartjs-2** for analytics and dashboard charts.
  - **react-table** for rich data tables in admin/agency/customer dashboards.
  - **lucide-react** for iconography in sidebars and key UI elements.
>>>>>>> admin-update
- When adding new UI pieces:
  - Place re-usable building blocks under `components/common/` or a suitable subfolder (`search/`, `car/`, `booking/`, etc.), matching the structure described in `instructions.md`.
  - Keep page-level layout and composition logic in `src/pages/*`, and delegate display logic into smaller components.

### Styling system

<<<<<<< HEAD
- All styling is SCSS-based and centralized under `src/styles/`:
  - `abstracts/` — tokens and helpers, including `_variables.scss` (color palette, spacing, typography), `_mixins.scss`, and `_breakpoints.scss`.
  - `base/` — global resets, typography, and low-level utilities.
  - `layout/` — grid/container/layout rules.
  - `components/` — component-level styles following BEM (`.block`, `.block__element`, `.block--modifier`).
  - `pages/` — page-specific styles for each major screen/domain (home, search, dashboard, booking, payment, etc.).
  - `main.scss` — central SCSS entry that imports the rest.
- React components should use class names consistent with the BEM structure and rely on these SCSS modules rather than inlined styles.
=======
- **Mantine is the primary UI layer** for interactive components (buttons, cards, modals, badges, layout primitives) and should be the first choice when building new UI.
- SCSS is centralized under `src/styles/` and is used for:
  - `abstracts/` — tokens and helpers, including `_variables.scss` (color palette, spacing, typography), `_mixins.scss`, and `_breakpoints.scss`.
  - `base/` — global resets, typography, and low-level utilities.
  - `layout/` — grid/container/layout rules (e.g., dashboard layouts).
  - `components/` and `pages/` — **minimal overrides** and legacy BEM styles where Mantine does not yet cover the use case.
  - `main.scss` — central SCSS entry that imports the rest.
- For new work, prefer Mantine props/theming over adding new BEM classes; only fall back to SCSS when Mantine cannot express the required behavior.

### Mantine styling rules

- Treat the Mantine theme defined in `mantine-warp-rule.md` as the **source of truth** for colors, typography, spacing, and radius.
- When existing SCSS/CSS conflicts with Mantine, update the implementation to align with the Mantine theme and gradually refactor legacy styles instead of maintaining parallel design systems.
- Keep UX and layout behaviors consistent while updating visuals, and prefer Mantine theming APIs over ad-hoc custom CSS.
>>>>>>> admin-update

### Testing

- Testing is handled by Jest and React Testing Library via CRA:
  - Config/bootstrap: `src/setupTests.js`.
  - Example tests:
    - `src/App.test.js`
    - `src/services/storageService.test.js`
    - `src/utils/priceCalculator.test.js`
    - `src/utils/validators.test.js`
- New tests should follow the existing conventions:
  - colocate test files next to their implementation as `*.test.js`.
  - use React Testing Library for component behavior and Jest for pure utilities.

## Implementation status & alignment with spec

- `README.md` states the app is ~75% complete; `docs/new/instructions.md` describes a **more comprehensive** target system (31+ pages, 20+ shared components, extensive admin/agency features).
- The current `src/pages/` and `src/components/` tree implements only part of that plan (for example, the admin area currently centers on `AdminDashboard.js`, with many other admin pages remaining to be created).
- When extending the app:
  - Treat `docs/new/instructions.md` as the source of truth for what should exist.
  - Before creating new files, check whether a corresponding page/component already exists and extend it rather than duplicating.
  - Keep naming aligned with the route and component names specified in the documentation (e.g., `BookingProcessPage`, `AgencyDashboard`, `EarningsPage`).
