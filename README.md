# SwiftCar – Car Rental Platform

SwiftCar is a React-based car rental booking platform that connects travelers with local car rental agencies. This repository contains the **frontend UI** built with Create React App, using **React 19**, **React Router v6**, **Sass**, and a small set of utilities and mock services.

**Status:** Customer + Agency flows are functionally complete for a demo; Admin and analytics features are partially scaffolded.

---

## 🚀 Quick Start

### Prerequisites
- Node.js **20.x** (recommended)
- npm (or yarn equivalent)

> ⚠️ `react-scripts@5` and the Babel toolchain used here are **not** compatible with Node 22+.
> If you see obscure Babel errors, switch to Node 20 (see `UPDATES_2025-11-10.md`).

### Installation & Running

```bash
# Navigate to project
cd swiftcar

# Install dependencies
npm install

# Start development server
npm start
```

By default the app runs at `http://localhost:3000`.

If you are also running the (optional) backend server documented in `UPDATES_2025-11-10.md` / `WARP.md`, use the combined dev script instead:

```bash
npm run dev
```

---

## 🎯 Features

### ✅ Implemented (UI / Frontend)

**Public / Marketing:**
- Home page with hero, feature highlights, and CTAs
- Search results page for browsing cars
- Car details page with specifications and pricing breakdown
- About, FAQ, and Contact pages

**Authentication & Access Control:**
- Login and sign-up pages, including role selection (customer / agency)
- Role-based protected routes using `ProtectedRoute` and `AuthContext`
- Basic notification system for success/error feedback

**Customer Experience:**
- Customer dashboard with quick access to bookings
- Multi-step booking flow (date selection, extras, summary)
- Payment step UI (card details form, summary, validation)
- "My Bookings" page for viewing existing reservations
- Profile page for editing customer information
- Write Review page for submitting reviews after a completed booking (stored locally via `storageService`)

**Agency Experience:**
- Agency registration page (post sign-up flow)
- Agency dashboard with high-level stats and quick links
- Add Car and Manage Cars pages based on `CarForm` and related components
- Booking requests page UI for handling incoming bookings

**Technical / Cross-cutting:**
- Global layout with `Header`, `Footer`, and app-level `Notification`
- Centralized routing in `src/routes/AppRoutes.js` using React Router v6
- Reusable UI components (Button, Input, Card, Modal, Loader, Notification)
- Shared utility layer (`src/utils/*`) for dates, validation, formatting, and pricing
- Mock data and services (`src/data/*`, `src/services/*`) for offline/demo flows

### ⏳ In Progress / Planned

As described in `docs/new/Features.md` and `docs/new/docs.md`, the following areas are either partially implemented or planned for future iterations:

- Deeper agency booking management workflows (status changes, messaging, etc.)
- Admin console for agency verification, content moderation, and platform configuration
- Earnings and analytics dashboards for agencies and admins
- Full review and rating system persisted to a backend instead of localStorage
- Multi-language support and more advanced accessibility coverage

---

## 🔐 Demo / Test Accounts

This project ships with **mocked data and services** rather than a full production authentication backend. If you wire it to a backend server, align credentials with your server configuration.

For local demos using a simple mock or dev server, typical patterns are:

**Customer Account (example):**
- Email: `customer@example.com`
- Password: `password123`

**Agency Account (example):**
- Email: `agency@example.com`
- Password: `password123`

**Admin Account (example):**
- Email: `admin@swiftcar.com`
- Password: `admin123`

> Treat these strictly as **example credentials**; they may live in mock JSON or seed data, not in a production identity system.

---

## 📁 Project Structure (Frontend)

High-level structure (actual files may vary slightly from the full architecture described in `docs/new/docs.md`):

```
swiftcar/
├── public/                       # CRA static assets (HTML, favicon, manifest, images)
├── src/
│   ├── App.js                    # Root component (Header, Footer, Notification, routes)
│   ├── App.css                   # Global styles
│   ├── components/
│   │   ├── booking/              # Booking flow components (DateRangePicker, Extras, Summary)
│   │   ├── cars/                 # CarForm, car-related UI
│   │   └── common/               # Button, Card, Header, Footer, Input, Loader, Modal, Notification
│   ├── context/                  # Auth/Notification/etc. contexts (e.g., `AuthContext` used by ProtectedRoute)
│   ├── data/                     # Mock JSON data (cars, bookings, reviews, commissions, payments)
│   ├── pages/
│   │   ├── public/               # Home, SearchResults, CarDetails, Login, SignUp, About, FAQ, Contact
│   │   ├── customer/             # Dashboard, BookingProcess, Payment, MyBookings, Profile, WriteReview
│   │   ├── agency/               # Dashboard, RegisterAgency, AddCar, ManageCars, BookingRequests
│   │   └── admin/                # AdminDashboard and related admin views
│   ├── routes/                   # AppRoutes + ProtectedRoute
│   ├── services/                 # storageService, dataService, mockAPI
│   ├── styles/                   # SCSS design system (variables, mixins, layout, typography)
│   ├── theme/                    # Mantine theme configuration (if used)
│   └── utils/                    # dateHelpers, validators, formatters, priceCalculator, constants
├── docs/
│   └── new/                      # Product docs, UX guidelines, feature specs, and roadmap
├── README.md
└── UPDATES_2025-11-10.md         # Recent changes and Node/tooling guidance
```

---

## 🛠️ Tech Stack

- **React `^19.2.0`** – UI library (Create React App)
- **React Router DOM `^6.30.1`** – Client-side routing
- **Sass/SCSS** – Styling with BEM methodology and a documented design system
- **Context API** – Authentication and app-level state (optionally extendable to Redux as per `docs/new/docs.md`)
- **Mock Data & Services** – JSON files and helper services for demo and offline flows
- **Mantine UI (core/hooks)** – Optional component primitives/themeing where used

---

## 📚 Additional Documentation

This README is a high-level overview. For deep technical and product documentation, see:

- `docs/new/Features.md` — Detailed feature breakdown (Customer, Agency, Admin, Technical)
- `docs/new/docs.md` — Full UI/UX and frontend architecture documentation
- `docs/new/roadmap.md` / `docs/new/detailed-roadmap.md` — Implementation roadmap
- `docs/new/PRD.md`, `docs/new/Product Description.md`, `docs/new/Target Audience.md` — Product-spec documents
- `UPDATES_2025-11-10.md` — Update log, Node/tooling guidance, and recently added utilities
- `TESTS_README.md` / `TEST_SUMMARY.md` — Testing notes and coverage summary (where applicable)

---

## 🎨 Design System (Summary)

The full design system (colors, typography, spacing, elevation, etc.) is documented in `docs/new/docs.md`. At a glance:

### Colors
- Primary: Navy Blue (`#213555`)
- Secondary: Slate Blue (`#3E5879`)
- Accent: Gold (`#E1C884`)
- Background: Light Cream (`#F5EFE7`)
- Semantic success/warning/error/info colors for status and feedback

### Core UI Components
- Button (primary, secondary, outline, ghost, danger; multiple sizes)
- Input (with validation states)
- Card (with header/body/footer subcomponents)
- Modal (different sizes and accessibility-friendly behavior)
- Loader (inline and full-screen variants)
- Notification / status messages (success, error, info, warning)

These components follow **BEM naming** and are designed to be responsive, accessible, and easy to extend.

---

## 🏗️ Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
