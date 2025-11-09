# SwiftCar - Car Rental Platform

A modern React-based car rental booking platform connecting travelers with local car rental agencies.

**Status:** 75% Complete ✅ | **Development In Progress**

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

```bash
# Navigate to project
cd swiftcar

# Install dependencies (if needed)
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

---

## 🎯 Features

### ✅ Implemented
**Customer Features:**
- Authentication System - Login with role-based access
- Search & Browse - Find cars by location and dates
- Car Details - View specifications and book cars
- Customer Dashboard - Stats, bookings, and quick actions
- Complete Booking Flow - 3-step wizard with validation
- Payment Processing - Card payment with security
- Booking Management - View, filter, and cancel bookings
- Profile Management - Edit personal info and settings

**Agency Features:**
- Agency Registration - 4-step onboarding with document upload
- Agency Dashboard - Fleet stats, bookings, and earnings
- Vehicle Management - Add, edit, delete cars (full CRUD)
- Fleet Overview - View and manage all vehicles
- Availability Control - Toggle car availability

**Platform Features:**
- Responsive Design - Mobile, tablet, desktop support
- Toast Notifications - User feedback system
- Protected Routes - Role-based page access
- Modern UI - Professional design with BEM methodology

### ⏳ In Progress
- Agency booking management
- Admin panel and agency verification
- Earnings dashboard
- Review system

---

## 🔐 Demo Credentials

**Customer Account:**
- Email: `customer@example.com`
- Password: `password123`

**Agency Account:**
- Email: `agency@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@swiftcar.com`
- Password: `admin123`

---

## 📁 Project Structure

```
swiftcar/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── context/        # React Context providers
│   ├── routes/         # Routing configuration
│   ├── styles/         # SCSS stylesheets
│   ├── data/           # Mock JSON data
│   └── utils/          # Utility functions
└── public/             # Static assets
```

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Navigation
- **Sass/SCSS** - Styling with BEM methodology
- **Context API** - State management
- **Mock Data** - JSON files for demo

---

## 📚 Documentation

- **PROJECT_STATUS.md** - Current status and immediate next steps
- **DEVELOPMENT_GUIDE.md** - Complete phase-by-phase roadmap
- **COMPLETION_SUMMARY.md** - Detailed list of completed features
- **docs/new/instructions.md** - Comprehensive specifications

---

## 🎨 Design System

### Colors
- Primary: Navy Blue (#213555)
- Secondary: Slate Blue (#3E5879)
- Accent: Gold (#E1C884)
- Background: Light Cream (#F5EFE7)

### Components
- Button (6 variants, 3 sizes)
- Input (with validation)
- Card (with subcomponents)
- Modal (4 sizes)
- Loader (3 sizes)
- Notification (4 types)

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
