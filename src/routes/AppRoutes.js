import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import HomePage from '../pages/public/HomePage';
import SearchResultsPage from '../pages/public/SearchResultsPage';
import CarDetailsPage from '../pages/public/CarDetailsPage';
import LoginPage from '../pages/public/LoginPage';
import NotFoundPage from '../pages/public/NotFoundPage';
import AboutPage from '../pages/public/AboutPage';
import FAQPage from '../pages/public/FAQPage';
import ContactPage from '../pages/public/ContactPage';

// Customer Pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import BookingProcessPage from '../pages/customer/BookingProcessPage';
import PaymentPage from '../pages/customer/PaymentPage';
import MyBookingsPage from '../pages/customer/MyBookingsPage';
import ProfilePage from '../pages/customer/ProfilePage';
import WriteReviewPage from '../pages/customer/WriteReviewPage';

// Agency Pages
import AgencyDashboard from '../pages/agency/AgencyDashboard';
import RegisterAgencyPage from '../pages/agency/RegisterAgencyPage';
import AddCarPage from '../pages/agency/AddCarPage';
import ManageCarsPage from '../pages/agency/ManageCarsPage';
import BookingRequestsPage from '../pages/agency/BookingRequestsPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

// Protected Route Component
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/car/:carId" element={<CarDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute requiredRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/booking-process"
        element={
          <ProtectedRoute requiredRole="customer">
            <BookingProcessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/payment"
        element={
          <ProtectedRoute requiredRole="customer">
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/bookings"
        element={
          <ProtectedRoute requiredRole="customer">
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute requiredRole="customer">
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/write-review/:bookingId"
        element={
          <ProtectedRoute requiredRole="customer">
            <WriteReviewPage />
          </ProtectedRoute>
        }
      />

      {/* Agency Routes */}
      <Route path="/agency/register" element={<RegisterAgencyPage />} />
      <Route
        path="/agency/dashboard"
        element={
          <ProtectedRoute requiredRole="agency">
            <AgencyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/add-car"
        element={
          <ProtectedRoute requiredRole="agency">
            <AddCarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/manage-cars"
        element={
          <ProtectedRoute requiredRole="agency">
            <ManageCarsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/booking-requests"
        element={
          <ProtectedRoute requiredRole="agency">
            <BookingRequestsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
