# SWIFTCAR CAR RENTAL PLATFORM - REACT INTERFACE IMPLEMENTATION GUIDE

=====================================================================

## PROJECT OVERVIEW
-----------------
SwiftCar is a car rental booking platform that connects travelers with local car rental agencies.
- Car rental booking system
- Commission-based revenue model (5-7%)
- Agency verification system
- Customer booking and review system
- **Focus: UI/UX Demo - Frontend only with mock data**


## TECHNOLOGY STACK
-----------------
- **React** (Create React App - NOT Vite, NOT Next.js)
- **React Router DOM** for navigation
- **Sass/SCSS** for styling (with BEM methodology)
- **JSON files** for mock data (no backend)
- **State Management:** useState, useContext (or Redux if preferred)
- **File Extension:** .js (NOT .jsx)
- **Styling:** All styles in one folder (src/styles/)


## MAIN USER TYPES (ROLES)
------------------------
1. **Customer** - Can search and book cars
2. **Agency Owner (Provider)** - Can manage their agency and vehicles
3. **Administrator** - Can verify agencies and manage platform


## REQUIRED PAGES AND ROUTES
--------------------------

### PUBLIC PAGES (No Authentication Required):
-------------------------------------------

#### 1. Homepage (/)
- Hero section with headline: "Rent Your Perfect Car"
- Search bar (location, pickup date, return date)
- Featured cars section (carousel or grid of 3-6 cars)
- Popular destinations section
- How It Works section (3 steps)
- Testimonials section
- Footer with links

#### 2. Search Results Page (/search)
- Filter sidebar (price range, category, features, transmission, fuel type)
- Results grid/list view toggle
- Car cards showing:
  * Car image
  * Brand and model
  * Year and category
  * Location
  * Price per day
  * Rating
  * Key features (GPS, Automatic, etc.)
  * "View Details" button
- Pagination or infinite scroll
- Sort options (price low-high, price high-low, rating, popularity)

#### 3. Car Details Page (/car/:carId)
- Image gallery (main image + thumbnails)
- Car information panel:
  * Brand, Model, Year
  * Category (economy, luxury, SUV, etc.)
  * Location
  * Rating and review count
  * Description
  * Features list (GPS, Automatic, A/C, etc.)
  * License plate
- Pricing section:
  * Price per day
  * Total price calculation (based on dates)
- Availability calendar
- "Book Now" button
- Reviews section (rating breakdown, customer reviews)
- Agency information:
  * Agency name
  * Agency rating
  * Contact information
  * Agency location
- Similar cars recommendations

#### 4. Login Page (/login)
- Email and password fields
- "Remember me" checkbox
- "Forgot password?" link (optional)
- "Login" button
- "Don't have an account? Sign up" link
- Link to agency registration

#### 5. Sign Up Page (/signup)
- Registration form:
  * First name, Last name
  * Email
  * Phone
  * Password, Confirm password
- User type selection:
  * Customer
  * Agency Owner (redirects to agency registration)
- Terms and conditions checkbox
- "Create Account" button
- "Already have an account? Login" link

#### 6. About Us Page (/about)
- Company mission: "Empowering Local Car Rental Businesses"
- How the platform works
- Platform benefits
- Platform statistics

#### 7. Contact Page (/contact)
- Contact form (name, email, subject, message)
- Contact information (email, phone, address)
- FAQ section (optional)


### CUSTOMER PAGES (Authentication Required):
------------------------------------------

#### 8. Customer Dashboard (/customer/dashboard)
- Welcome message with customer name
- Quick stats:
  * Upcoming bookings count
  * Past bookings count
  * Total spent
- Upcoming bookings list (next 3 bookings)
- Quick actions:
  * Search cars
  * View all bookings
  * View profile

#### 9. Booking Process Page (/booking/:carId)
- **Step 1: Select Dates**
  * Car summary (image, name, price per day)
  * Pickup date selection
  * Return date selection
  * Number of days calculation
  * Base price calculation
  * "Continue" button
  
- **Step 2: Add Extras & Review**
  * Booking summary (dates, car, base price)
  * Extras selection:
    - Insurance (optional)
    - GPS (optional)
    - Child seat (optional)
    - Additional driver (optional)
  * Price breakdown:
    * Base price
    * Extras
    * Total price
  * "Continue to Payment" button
  * "Back" button to edit dates

#### 10. Payment Page (/payment/:bookingId)
- Booking summary (car, dates, total price)
- Payment method selection (credit card, PayPal)
- Card information form:
  * Card number
  * Cardholder name
  * Expiry date
  * CVV
- Billing address
- Terms and conditions checkbox
- "Complete Payment" button
- Secure payment badge

#### 11. Booking Confirmation Page (/booking/confirmation/:bookingId)
- Success message with checkmark icon
- Booking reference number
- Booking details:
  * Car information
  * Pickup and return dates
  * Pickup and return locations
  * Total price paid
- Agency contact information
- "Download Voucher" button (PDF)
- "View Booking Details" button
- "Add to Calendar" button (optional)
- Next steps information

#### 12. My Bookings Page (/customer/bookings)
- Tabs: All, Upcoming, Past, Cancelled
- Booking cards showing:
  * Car image
  * Car name (Brand Model)
  * Booking date
  * Rental dates (pickup - return)
  * Status badge (Confirmed, Completed, Cancelled)
  * Total price
  * Action buttons:
    - View Details
    - Cancel (if allowed)
    - Write Review (if completed)
- Filter and search options
- Empty state message when no bookings

#### 13. Booking Details Page (/customer/booking/:bookingId)
- Full booking information
- Car details with image
- Agency information
- Payment information
- Booking status timeline
- Download invoice button
- Cancel booking button (if policy allows)
- Contact agency button
- Write review button (after completion)

#### 14. Customer Profile Page (/customer/profile)
- Personal information form (editable):
  * First name, Last name
  * Email
  * Phone
  * Address
- Change password section
- Email preferences
- "Save Changes" button
- Delete account option (optional)

#### 15. Write Review Page (/customer/review/:bookingId)
- Booking information (car, dates)
- Rating selection (1-5 stars)
  * Overall rating
  * Car condition rating
  * Agency service rating
- Review text area
- Photo upload (optional, max 3 photos)
- "Submit Review" button
- Terms: "Only verified bookings can be reviewed"


### AGENCY PAGES (Authentication Required):
------------------------------------------

#### 16. Agency Registration Page (/agency/register)
- Agency information form:
  * Agency name
  * Business email
  * Business phone
  * Business address (street, city, country)
  * Business license number
  * Agency description
  * Agency logo upload
- "Continue to Document Upload" button
- Form validation

#### 17. Agency Verification Page (/agency/verification/:agencyId)
- Document upload section:
  * Business license (required)
  * Tax registration (required)
  * Insurance certificate (required)
  * Owner ID (required)
- File upload with drag & drop
- Upload progress indicators
- Preview uploaded documents
- "Submit for Verification" button
- Verification status display:
  * Pending (yellow) - "Your application is pending review"
  * Under Review (blue) - "Your documents are being reviewed (1-3 days)"
  * Approved (green) - "Your agency is verified!"
  * Rejected (red) - "Your application was rejected. Reason: [reason]"
  * More Info Needed (orange) - "Please provide: [requirements]"
- Estimated verification time: 1-3 days
- Resubmit documents option (if rejected or more info needed)

#### 18. Agency Dashboard (/agency/dashboard)
- Welcome message with agency name
- Verification status badge
- Quick stats:
  * Total bookings (today, this week, this month)
  * Total revenue
  * Commission paid
  * Pending payout
  * Active vehicles
- Recent bookings list (last 5 bookings)
- Quick actions:
  * Add new car
  * View all cars
  * View all bookings
  * View earnings
  * Manage profile

#### 19. Add Car Page (/agency/car/add)
- Car information form:
  * Brand (dropdown or input)
  * Model
  * Year
  * Category (economy, luxury, SUV, compact, etc.)
  * License plate
  * Price per day
  * Location (pickup location)
  * Description
- Features selection (checkboxes):
  * GPS
  * Automatic transmission
  * Manual transmission
  * Air conditioning
  * Bluetooth
  * Child seat available
  * Leather seats
  * Sunroof
  * USB charger
- Photo upload (minimum 3 photos, maximum 10)
- Image preview and delete option
- "Save and Publish" button
- "Save as Draft" button (optional)
- Form validation

#### 20. My Cars Page (/agency/cars)
- Tabs: All, Active, Inactive, Maintenance
- Car cards showing:
  * Car image
  * Brand and model
  * Category
  * Price per day
  * Status badge (active, inactive, maintenance)
  * Total bookings count
  * Total earnings
  * Action buttons:
    - Edit
    - Delete
    - View Details
- "Add New Car" button
- Search and filter options
- Empty state when no cars

#### 21. Edit Car Page (/agency/car/edit/:carId)
- Same form as Add Car but pre-filled with existing data
- "Update Car" button
- "Delete Car" button (with confirmation)
- Warning if car has active bookings

#### 22. Agency Bookings Page (/agency/bookings)
- Tabs: New, Confirmed, In Progress, Completed, Cancelled
- Booking cards showing:
  * Customer name
  * Car booked (image, brand, model)
  * Booking dates
  * Rental dates (pickup - return)
  * Total price
  * Commission amount
  * Net amount (after commission)
  * Status badge
  * Action buttons:
    - View Details
    - Confirm (for new bookings)
    - Decline (for new bookings)
    - Contact Customer
- Calendar view toggle (optional)
- Filter options (by date, status, car)
- Search functionality

#### 23. Booking Management Page (/agency/booking/:bookingId)
- Full booking details
- Customer information
- Car details
- Booking timeline
- Confirm/Decline buttons (for new bookings)
- Cancel booking button
- Message customer button
- Mark as completed button (when car is returned)

#### 24. Earnings Dashboard Page (/agency/earnings)
- Time period selector (Today, This Week, This Month, This Year, Custom Range)
- Summary cards:
  * Total bookings
  * Gross revenue
  * Total commission paid
  * Net earnings (after commission)
  * Pending payout
- Revenue chart (line graph or bar chart)
- Breakdown table:
  * Booking ID
  * Date
  * Car
  * Customer
  * Price
  * Commission (5-7%)
  * Net amount
- Car performance section:
  * Most booked cars
  * Revenue by car
- "Request Payout" button (if threshold met)
- "Download Report" button (PDF/CSV export)
- Commission rate display (5-7%)

#### 25. Agency Profile Page (/agency/profile)
- Agency information (editable):
  * Agency name
  * Business email
  * Business phone
  * Business address
  * Agency description
  * Agency logo upload
- Business information (read-only):
  * Business license number
  * Verification status
  * Commission rate
  * Registration date
  * Verification date
- Account settings:
  * Change password
  * Email notification preferences
- "Save Changes" button


### ADMINISTRATOR PAGES (Authentication Required):
----------------------------------------------

#### 26. Admin Dashboard (/admin/dashboard)
- Platform statistics:
  * Total users (customers, agencies, admins)
  * Total agencies (verified, pending, rejected)
  * Total bookings (today, this week, this month)
  * Total revenue and commission
- Pending verifications count (alert badge)
- Recent activities list
- Quick actions:
  * Review pending agencies
  * Manage users
  * Manage agencies
  * View analytics

#### 27. Pending Verifications Page (/admin/verifications)
- List of agencies awaiting verification
- Agency cards showing:
  * Agency name
  * Owner name
  * Submission date
  * Days pending
  * "Review" button
- Filter by status and date
- Sort options

#### 28. Agency Review Page (/admin/verification/:agencyId)
- Agency details:
  * Name, Location
  * Owner information
  * Contact details
  * Business license number
- Uploaded documents viewer:
  * Business license (image/PDF viewer)
  * Tax registration
  * Insurance certificates
  * Owner ID
- Document verification checklist
- Admin notes text area
- Action buttons:
  * Approve Agency (green) - Set commission rate (5-7%)
  * Reject Agency (red) - Require rejection reason
  * Request More Info (orange) - Specify required documents
- Commission rate selection (5-7% dropdown)

#### 29. All Agencies Page (/admin/agencies)
- Tabs: All, Verified, Pending, Rejected, Suspended
- Agency list table:
  * Agency ID
  * Agency name
  * Owner name
  * Location
  * Verification status
  * Registration date
  * Total cars
  * Total bookings
  * Total revenue
  * Actions (View, Suspend, Deactivate, Delete)
- Search and filter options
- Export data button (CSV)

#### 30. All Users Page (/admin/users)
- Tabs: All, Customers, Agencies, Admins
- User list table:
  * User ID
  * Name
  * Email
  * User type
  * Registration date
  * Status (active, suspended)
  * Actions (View, Suspend, Delete)
- Search and filter options

#### 31. Platform Analytics Page (/admin/analytics)
- Overview cards:
  * Total bookings
  * Total revenue
  * Total commission earned
  * Active users
  * Active agencies
- Charts and graphs:
  * Bookings over time (line chart)
  * Revenue by month (bar chart)
  * Top performing agencies (bar chart)
  * User growth (line chart)
  * Agency growth (line chart)
- Date range selector
- Export reports button (PDF/CSV)


## SHARED COMPONENTS TO CREATE
----------------------------

### 1. Header/Navbar Component
- Logo (clickable, links to home)
- Navigation menu:
  * Home
  * Search Cars
  * How It Works
  * About Us
  * Contact
- User menu (if logged in):
  * Customer: Dashboard, My Bookings, Profile, Logout
  * Agency: Dashboard, My Cars, Bookings, Earnings, Profile, Logout
  * Admin: Dashboard, Verifications, Agencies, Users, Analytics, Logout
- Login/Signup buttons (if not logged in)
- "Become a Provider" button (if not logged in as agency)
- Responsive mobile menu (hamburger)

### 2. Footer Component
- Four columns:
  * Company (About, How It Works, Contact, Careers)
  * For Agencies (Become a Provider, Agency Dashboard, Help Center)
  * Services (Search Cars, Popular Destinations, FAQs)
  * Legal (Terms of Service, Privacy Policy, Cookie Policy)
- Social media icons
- Copyright text
- Newsletter signup (optional)

### 3. Search Bar Component
- Location input (autocomplete or dropdown)
- Pickup date picker
- Return date picker
- "Search" button
- Responsive design (stack on mobile)

### 4. Car Card Component
- Car image
- Brand and model
- Year and category badge
- Location
- Price per day
- Rating stars
- Key features tags (GPS, Automatic, etc.)
- "View Details" button
- Hover effect

### 5. Booking Card Component
- Car image
- Car name (Brand Model)
- Booking date
- Rental dates (pickup - return)
- Status badge with color coding:
  * Pending (yellow)
  * Confirmed (green)
  * In Progress (blue)
  * Completed (gray)
  * Cancelled (red)
- Total price
- Action buttons
- Expandable details section

### 6. Rating Component
- Star display (filled/empty stars)
- Numeric rating (e.g., "4.5")
- Total reviews count (e.g., "(120 reviews)")
- Clickable for filtering
- Half-star support

### 7. Filter Sidebar Component
- Price range slider (min-max)
- Category filter (checkboxes: economy, luxury, SUV, etc.)
- Features filter (checkboxes: GPS, Automatic, A/C, etc.)
- Transmission filter (Automatic, Manual)
- Fuel type filter (Petrol, Diesel, Electric, Hybrid)
- Agency rating filter (4+, 4.5+, 5 stars)
- Location filter
- "Apply Filters" button
- "Clear All" button
- Responsive (collapsible on mobile)

### 8. Image Gallery Component
- Main large image display
- Thumbnail strip below
- Next/Previous arrows
- Fullscreen view option
- Zoom functionality
- Image counter (e.g., "1 / 5")

### 9. Date Picker Component
- Calendar display
- Start date and end date selection
- Disabled dates (already booked or past dates)
- Minimum rental period (1 day)
- "Clear Dates" button
- Date range validation

### 10. Price Breakdown Component
- Line items:
  * Base price (price per day × number of days)
  * Insurance (if selected)
  * GPS (if selected)
  * Child seat (if selected)
  * Additional driver (if selected)
  * Subtotal
- Total with emphasis
- Currency symbol (€, $, etc.)
- Commission breakdown (for agency view only)

### 11. Status Badge Component
- Color-coded badges:
  * Pending (yellow/orange)
  * Confirmed (green)
  * In Progress (blue)
  * Completed (gray)
  * Cancelled (red)
  * Under Review (blue)
  * Approved (green)
  * Rejected (red)
- Icon + text
- Small and large variants

### 12. Loading Spinner Component
- Centered spinner
- Loading text (optional)
- Overlay background (optional)
- Full screen or inline variants

### 13. Modal Component
- Backdrop overlay
- Close button (X)
- Dynamic content area
- Action buttons in footer
- Escape key to close
- Click outside to close (optional)

### 14. Notification/Toast Component
- Success (green) - "Booking confirmed!"
- Error (red) - "Payment failed. Please try again."
- Warning (orange) - "Please fill all required fields."
- Info (blue) - "Your verification is under review."
- Auto-dismiss after 3-5 seconds
- Close button
- Stack multiple notifications

### 15. Pagination Component
- Page numbers
- Previous/Next buttons
- "..." for skipped pages
- Current page highlight
- "Showing 1-10 of 50 results"

### 16. Breadcrumb Component
- Navigation path (Home > Search > Car Details)
- Clickable links
- Home icon
- Separator arrows (>/)

### 17. Review Card Component
- User avatar/initials
- User name (or "Anonymous")
- Rating stars
- Review date
- Review text
- Photos (if any) - thumbnail gallery
- Helpful buttons (thumbs up/down)
- Agency response (if any)

### 18. Document Upload Component
- Drag and drop area
- File type validation (PDF, JPG, PNG)
- File size validation (max 5MB)
- Upload progress bar
- Preview uploaded files
- Delete uploaded file button
- Multiple file support

### 19. Stats Card Component
- Icon
- Value (number with formatting)
- Label
- Trend indicator (up/down arrow with percentage)
- Color coding
- Clickable (optional)

### 20. Timeline Component
- Vertical timeline
- Status points with icons:
  * Booking created
  * Payment confirmed
  * Booking confirmed by agency
  * Car picked up
  * Car returned
  * Review submitted
- Timestamps
- Status descriptions


## MOCK DATA STRUCTURE (JSON FILES)
---------------------------------

Create these JSON files in src/data/ folder:

### 1. users.json
```json
[
  {
    "userId": 1,
    "email": "customer@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+212600000000",
    "registrationDate": "2024-01-15",
    "userType": "customer",
    "accountStatus": "active"
  },
  {
    "userId": 2,
    "email": "agency@example.com",
    "password": "password123",
    "firstName": "Sarah",
    "lastName": "Smith",
    "phone": "+212600000001",
    "registrationDate": "2024-02-20",
    "userType": "agency",
    "accountStatus": "active"
  },
  {
    "userId": 3,
    "email": "admin@example.com",
    "password": "admin123",
    "firstName": "Admin",
    "lastName": "User",
    "phone": "+212600000002",
    "registrationDate": "2024-01-01",
    "userType": "admin",
    "accountStatus": "active"
  }
]
```

### 2. agencies.json
```json
[
  {
    "agencyId": 1,
    "ownerId": 2,
    "agencyName": "Agadir Car Rentals",
    "email": "info@agadircars.com",
    "phone": "+212600111111",
    "address": "123 Avenue Hassan II",
    "city": "Agadir",
    "country": "Morocco",
    "logo": "/images/agencies/agadir-cars-logo.png",
    "businessLicense": "BL123456",
    "verificationStatus": "verified",
    "registrationDate": "2024-02-21",
    "verificationDate": "2024-02-24",
    "commissionRate": 6.0,
    "isActive": true,
    "description": "Professional car rental service in Agadir",
    "rating": 4.5,
    "totalReviews": 120
  }
]
```

### 3. cars.json
```json
[
  {
    "carId": 1,
    "agencyId": 1,
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2022,
    "category": "economy",
    "licensePlate": "12345-A-67",
    "pricePerDay": 50.00,
    "location": "Agadir Airport",
    "available": true,
    "features": ["GPS", "Automatic", "A/C", "Bluetooth"],
    "photos": [
      "/images/cars/toyota-corolla-1.jpg",
      "/images/cars/toyota-corolla-2.jpg",
      "/images/cars/toyota-corolla-3.jpg"
    ],
    "status": "active",
    "createdDate": "2024-03-01",
    "description": "Reliable and fuel-efficient Toyota Corolla perfect for city driving.",
    "transmission": "automatic",
    "fuelType": "petrol",
    "seats": 5
  },
  {
    "carId": 2,
    "agencyId": 1,
    "brand": "BMW",
    "model": "X5",
    "year": 2023,
    "category": "luxury",
    "licensePlate": "98765-B-43",
    "pricePerDay": 120.00,
    "location": "Marrakech City Center",
    "available": true,
    "features": ["GPS", "Automatic", "A/C", "Leather Seats", "Sunroof"],
    "photos": [
      "/images/cars/bmw-x5-1.jpg",
      "/images/cars/bmw-x5-2.jpg"
    ],
    "status": "active",
    "createdDate": "2024-03-05",
    "description": "Luxury SUV with premium features and spacious interior.",
    "transmission": "automatic",
    "fuelType": "petrol",
    "seats": 7
  }
]
```

### 4. bookings.json
```json
[
  {
    "bookingId": 1,
    "userId": 1,
    "carId": 1,
    "agencyId": 1,
    "bookingDate": "2024-10-01",
    "pickupDate": "2024-10-15",
    "returnDate": "2024-10-20",
    "pickupLocation": "Agadir Airport",
    "returnLocation": "Agadir Airport",
    "numberOfDays": 5,
    "basePrice": 250.00,
    "insurancePrice": 25.00,
    "gpsPrice": 15.00,
    "extraFees": 0.00,
    "commissionAmount": 17.40,
    "totalPrice": 290.00,
    "status": "confirmed",
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "cancellationReason": null
  }
]
```

### 5. reviews.json
```json
[
  {
    "reviewId": 1,
    "userId": 1,
    "carId": 1,
    "agencyId": 1,
    "bookingId": 1,
    "rating": 5,
    "carRating": 5,
    "agencyRating": 5,
    "comment": "Excellent service! The car was clean and well-maintained.",
    "photos": [],
    "reviewDate": "2024-10-21",
    "verified": true,
    "helpfulCount": 5
  }
]
```

### 6. commissions.json
```json
[
  {
    "commissionId": 1,
    "bookingId": 1,
    "agencyId": 1,
    "amount": 17.40,
    "rate": 6.0,
    "status": "calculated",
    "calculatedDate": "2024-10-15",
    "paidDate": null
  }
]
```

### 7. payments.json
```json
[
  {
    "paymentId": 1,
    "bookingId": 1,
    "totalAmount": 290.00,
    "commissionAmount": 17.40,
    "agencyAmount": 272.60,
    "paymentMethod": "credit_card",
    "paymentDate": "2024-10-01",
    "status": "completed",
    "transactionId": "TXN123456789"
  }
]
```

### 8. notifications.json
```json
[
  {
    "notificationId": 1,
    "userId": 1,
    "type": "booking_confirmation",
    "title": "Booking Confirmed",
    "message": "Your booking for Toyota Corolla has been confirmed.",
    "date": "2024-10-01",
    "read": false
  }
]
```


## REACT PROJECT STRUCTURE
-----------------------

```
swiftcar/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
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
│   │
│   ├── components/                 # Reusable components
│   │   ├── common/                 # Shared components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Card.js
│   │   │   ├── Modal.js
│   │   │   ├── Loader.js
│   │   │   ├── Notification.js
│   │   │   ├── StatusBadge.js
│   │   │   ├── Pagination.js
│   │   │   ├── Breadcrumb.js
│   │   │   └── StatsCard.js
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── PublicLayout.js
│   │   │   ├── CustomerLayout.js
│   │   │   ├── AgencyLayout.js
│   │   │   └── AdminLayout.js
│   │   │
│   │   ├── search/                 # Search components
│   │   │   ├── SearchBar.js
│   │   │   ├── FilterSidebar.js
│   │   │   └── DatePicker.js
│   │   │
│   │   ├── car/                    # Car components
│   │   │   ├── CarCard.js
│   │   │   ├── CarDetails.js
│   │   │   ├── ImageGallery.js
│   │   │   └── CarForm.js
│   │   │
│   │   ├── booking/                # Booking components
│   │   │   ├── BookingCard.js
│   │   │   ├── BookingForm.js
│   │   │   ├── PriceBreakdown.js
│   │   │   └── Timeline.js
│   │   │
│   │   ├── review/                 # Review components
│   │   │   ├── ReviewCard.js
│   │   │   ├── ReviewForm.js
│   │   │   └── Rating.js
│   │   │
│   │   └── agency/                 # Agency components
│   │       ├── AgencyCard.js
│   │       ├── AgencyForm.js
│   │       ├── VerificationStatus.js
│   │       └── DocumentUpload.js
│   │
│   ├── pages/                      # Page components
│   │   ├── public/
│   │   │   ├── HomePage.js
│   │   │   ├── SearchResultsPage.js
│   │   │   ├── CarDetailsPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SignUpPage.js
│   │   │   ├── AboutPage.js
│   │   │   └── ContactPage.js
│   │   │
│   │   ├── customer/
│   │   │   ├── CustomerDashboard.js
│   │   │   ├── BookingProcessPage.js
│   │   │   ├── PaymentPage.js
│   │   │   ├── BookingConfirmationPage.js
│   │   │   ├── MyBookingsPage.js
│   │   │   ├── BookingDetailsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   └── WriteReviewPage.js
│   │   │
│   │   ├── agency/
│   │   │   ├── AgencyDashboard.js
│   │   │   ├── RegisterAgencyPage.js
│   │   │   ├── VerificationPage.js
│   │   │   ├── AddCarPage.js
│   │   │   ├── ManageCarsPage.js
│   │   │   ├── EditCarPage.js
│   │   │   ├── BookingsPage.js
│   │   │   ├── BookingManagementPage.js
│   │   │   ├── EarningsPage.js
│   │   │   └── AgencyProfilePage.js
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.js
│   │       ├── PendingVerificationsPage.js
│   │       ├── AgencyReviewPage.js
│   │       ├── AllAgenciesPage.js
│   │       ├── AllUsersPage.js
│   │       └── AnalyticsPage.js
│   │
│   ├── styles/                     # ALL STYLES IN ONE FOLDER
│   │   ├── abstracts/
│   │   │   ├── _variables.scss     # SCSS variables (colors, fonts, spacing)
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
│   │   ├── components/             # Component styles (BEM methodology)
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _button.scss
│   │   │   ├── _input.scss
│   │   │   ├── _card.scss
│   │   │   ├── _modal.scss
│   │   │   ├── _loader.scss
│   │   │   ├── _notification.scss
│   │   │   ├── _searchbar.scss
│   │   │   ├── _filter.scss
│   │   │   ├── _carcard.scss
│   │   │   ├── _bookingcard.scss
│   │   │   ├── _rating.scss
│   │   │   ├── _gallery.scss
│   │   │   ├── _datepicker.scss
│   │   │   ├── _pricebreakdown.scss
│   │   │   ├── _statusbadge.scss
│   │   │   ├── _pagination.scss
│   │   │   ├── _breadcrumb.scss
│   │   │   ├── _reviewcard.scss
│   │   │   ├── _documentupload.scss
│   │   │   ├── _statscard.scss
│   │   │   └── _timeline.scss
│   │   │
│   │   ├── pages/                  # Page-specific styles
│   │   │   ├── _homepage.scss
│   │   │   ├── _searchresults.scss
│   │   │   ├── _cardetails.scss
│   │   │   ├── _login.scss
│   │   │   ├── _signup.scss
│   │   │   ├── _dashboard.scss
│   │   │   ├── _booking.scss
│   │   │   ├── _payment.scss
│   │   │   ├── _profile.scss
│   │   │   ├── _agency.scss
│   │   │   └── _admin.scss
│   │   │
│   │   └── main.scss               # Main SCSS file (imports all)
│   │
│   ├── data/                       # Mock JSON data
│   │   ├── users.json
│   │   ├── agencies.json
│   │   ├── cars.json
│   │   ├── bookings.json
│   │   ├── reviews.json
│   │   ├── commissions.json
│   │   ├── payments.json
│   │   └── notifications.json
│   │
│   ├── context/                    # React Context
│   │   ├── AuthContext.js
│   │   ├── BookingContext.js
│   │   └── NotificationContext.js
│   │
│   ├── utils/                      # Utility functions
│   │   ├── dateHelpers.js
│   │   ├── priceCalculator.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── services/                   # Data services
│   │   ├── dataService.js          # Mock data handler
│   │   ├── storageService.js       # LocalStorage handler
│   │   └── mockAPI.js              # Simulated API calls
│   │
│   └── routes/                     # Route configuration
│       ├── AppRoutes.js
│       ├── ProtectedRoute.js
│       └── routeConfig.js
│
├── .env                            # Environment variables
├── .gitignore
├── package.json
└── README.md
```


## ROUTING STRUCTURE (React Router DOM)
-------------------------------------

```javascript
// src/routes/AppRoutes.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routeConfig';

// Public routes
import HomePage from '../pages/public/HomePage';
import SearchResultsPage from '../pages/public/SearchResultsPage';
import CarDetailsPage from '../pages/public/CarDetailsPage';
import LoginPage from '../pages/public/LoginPage';
import SignUpPage from '../pages/public/SignUpPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';

// Customer routes
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import BookingProcessPage from '../pages/customer/BookingProcessPage';
import PaymentPage from '../pages/customer/PaymentPage';
import BookingConfirmationPage from '../pages/customer/BookingConfirmationPage';
import MyBookingsPage from '../pages/customer/MyBookingsPage';
import BookingDetailsPage from '../pages/customer/BookingDetailsPage';
import ProfilePage from '../pages/customer/ProfilePage';
import WriteReviewPage from '../pages/customer/WriteReviewPage';

// Agency routes
import AgencyDashboard from '../pages/agency/AgencyDashboard';
import RegisterAgencyPage from '../pages/agency/RegisterAgencyPage';
import VerificationPage from '../pages/agency/VerificationPage';
import AddCarPage from '../pages/agency/AddCarPage';
import ManageCarsPage from '../pages/agency/ManageCarsPage';
import EditCarPage from '../pages/agency/EditCarPage';
import BookingsPage from '../pages/agency/BookingsPage';
import BookingManagementPage from '../pages/agency/BookingManagementPage';
import EarningsPage from '../pages/agency/EarningsPage';
import AgencyProfilePage from '../pages/agency/AgencyProfilePage';

// Admin routes
import AdminDashboard from '../pages/admin/AdminDashboard';
import PendingVerificationsPage from '../pages/admin/PendingVerificationsPage';
import AgencyReviewPage from '../pages/admin/AgencyReviewPage';
import AllAgenciesPage from '../pages/admin/AllAgenciesPage';
import AllUsersPage from '../pages/admin/AllUsersPage';
import AnalyticsPage from '../pages/admin/AnalyticsPage';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import CustomerLayout from '../components/layout/CustomerLayout';
import AgencyLayout from '../components/layout/AgencyLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Protected route wrapper
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
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
          <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
          <Route path={ROUTES.BOOKING_CONFIRMATION} element={<BookingConfirmationPage />} />
          <Route path={ROUTES.MY_BOOKINGS} element={<MyBookingsPage />} />
          <Route path={ROUTES.BOOKING_DETAILS} element={<BookingDetailsPage />} />
          <Route path={ROUTES.CUSTOMER_PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.WRITE_REVIEW} element={<WriteReviewPage />} />
        </Route>

        {/* Agency Protected Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['agency']}>
              <AgencyLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.AGENCY_REGISTER} element={<RegisterAgencyPage />} />
          <Route path={ROUTES.AGENCY_VERIFICATION} element={<VerificationPage />} />
          <Route path={ROUTES.AGENCY_DASHBOARD} element={<AgencyDashboard />} />
          <Route path={ROUTES.ADD_CAR} element={<AddCarPage />} />
          <Route path={ROUTES.MANAGE_CARS} element={<ManageCarsPage />} />
          <Route path={ROUTES.EDIT_CAR} element={<EditCarPage />} />
          <Route path={ROUTES.AGENCY_BOOKINGS} element={<BookingsPage />} />
          <Route path={ROUTES.BOOKING_MANAGEMENT} element={<BookingManagementPage />} />
          <Route path={ROUTES.EARNINGS} element={<EarningsPage />} />
          <Route path={ROUTES.AGENCY_PROFILE} element={<AgencyProfilePage />} />
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
          <Route path={ROUTES.AGENCY_REVIEW} element={<AgencyReviewPage />} />
          <Route path={ROUTES.ALL_AGENCIES} element={<AllAgenciesPage />} />
          <Route path={ROUTES.ALL_USERS} element={<AllUsersPage />} />
          <Route path={ROUTES.PLATFORM_ANALYTICS} element={<AnalyticsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
```

### Route Constants (src/routes/routeConfig.js)
```javascript
export const ROUTES = {
  // Public routes
  HOME: '/',
  SEARCH: '/search',
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


## STATE MANAGEMENT APPROACH
--------------------------

Use React Context API for global state (or Redux if preferred):

### 1. AuthContext
- Current user data
- Login/logout functions
- User role (customer/agency/admin)
- Authentication status
- Check authentication on page load

### 2. BookingContext
- Current booking in progress
- Selected car
- Booking dates (pickup, return)
- Selected extras (insurance, GPS, etc.)
- Pricing information
- Clear booking on completion

### 3. NotificationContext
- Show notification function
- Hide notification function
- Current notification data
- Notification queue


## KEY FEATURES TO IMPLEMENT
--------------------------

### 1. Search Functionality
- Search by location
- Filter by price range, category, features
- Sort by price, rating, popularity
- Real-time filter updates
- URL parameters for filters (shareable links)

### 2. Booking Flow (3 Steps)
- Step 1: Select dates and verify availability
- Step 2: Add extras and review pricing
- Step 3: Payment and confirmation
- Progress indicator
- Back/Next navigation
- Form validation at each step

### 3. Price Calculation
- Base price = price per day × number of days
- Insurance fee (if selected)
- GPS fee (if selected)
- Child seat fee (if selected)
- Additional driver fee (if selected)
- Commission calculation (5-7% of total)
- Total price display
- Currency formatting

### 4. Availability Calendar
- Visual calendar showing available/booked dates
- Date range selection (pickup and return)
- Disable past dates
- Disable already booked dates
- Minimum rental period (1 day)
- Price per day display on hover

### 5. Image Gallery
- Thumbnail navigation
- Full-screen view
- Next/Previous navigation
- Touch/swipe support for mobile
- Image counter
- Lazy loading

### 6. Review System
- Star rating (1-5 stars)
- Separate ratings for car and agency
- Text review
- Photo upload (optional, max 3)
- Verified booking badge
- Helpful votes
- Agency responses

### 7. Agency Verification
- Document upload (drag & drop)
- File validation (type, size)
- Status tracking
- Admin review interface
- Approval/rejection notifications
- Resubmit documents option

### 8. Vehicle Management
- Add new car with photos
- Edit existing car
- Delete car (with confirmation)
- Toggle availability
- Set pricing
- View car performance (bookings, earnings)

### 9. Booking Management
- View all bookings
- Filter by status
- Confirm/decline bookings
- Contact customer
- Mark as completed
- Calendar view

### 10. Earnings Dashboard
- Revenue charts
- Commission breakdown
- Payout requests
- Export reports (PDF/CSV)
- Date range filtering
- Car performance metrics


## STYLING GUIDELINES
-------------------

### Color Palette (src/styles/abstracts/_variables.scss)
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
```

### Typography
- Font family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Headings: 24px, 20px, 18px, 16px
- Body: 16px (base)
- Small text: 14px, 12px

### Spacing System (8-point grid)
- Use multiples of 8px: 8px, 16px, 24px, 32px, 40px, 48px, 64px

### BEM Methodology
- Block: `.car-card`
- Element: `.car-card__image`, `.car-card__title`
- Modifier: `.car-card--featured`, `.car-card--large`

### Responsive Breakpoints
- Mobile: 0-767px
- Tablet: 768px-1023px
- Desktop: 1024px-1439px
- Large Desktop: 1440px+

### Card Shadows
- Default: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.15)`
- Elevation: Use different shadow levels for depth

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px
- Full: 50% (for circles)


## IMPORTANT NOTES FOR IMPLEMENTATION
-----------------------------------

### 1. Frontend Only (No Backend)
- Store mock data in JSON files (src/data/)
- Use localStorage for simulating login sessions
- Use React state for data manipulation
- No actual API calls (simulate with setTimeout for loading states)
- Update JSON data in state (not actual files)

### 2. Authentication Simulation
- On login, store user data in localStorage
- Check localStorage on page load to restore session
- Clear localStorage on logout
- Validate credentials against users.json
- Set user role in AuthContext

### 3. Booking Simulation
- Update JSON data in state (not actual files)
- Generate mock booking IDs
- Show success messages
- Update car availability in state
- Calculate commission automatically
- Store booking in localStorage

### 4. File Uploads
- Show file preview
- Store file names/URLs in state
- Don't actually upload files (just simulate)
- Validate file type and size
- Show upload progress (simulated)

### 5. Search and Filtering
- Filter the JSON data arrays based on criteria
- Use JavaScript array methods (filter, sort, map)
- Update URL parameters for filters
- Preserve filter state in URL

### 6. Date Selection
- Use HTML5 date input or React date picker library
- Validate date ranges (return after pickup)
- Calculate number of days
- Disable past dates and booked dates
- Show price calculation based on dates

### 7. Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Hamburger menu for mobile
- Grid to flex layouts on small screens
- Touch-friendly buttons and inputs

### 8. Form Validation
- Client-side validation only
- Show error messages below fields
- Disable submit button until form is valid
- Required field indicators (*)
- Email format validation
- Password strength indicator

### 9. Loading States
- Show loading spinner during data fetch
- Simulate API delay with setTimeout (500ms-1s)
- Show skeleton screens for better UX
- Disable buttons during loading

### 10. Error Handling
- Show error messages for failed operations
- Handle empty states (no cars, no bookings)
- Show "Try again" buttons
- Log errors to console (for development)

### 11. Accessibility
- Use semantic HTML
- Add ARIA labels
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast compliance (WCAG AA)

### 12. Performance
- Lazy load images
- Code splitting for routes
- Memoize expensive calculations
- Debounce search inputs
- Optimize re-renders with React.memo


## IMPLEMENTATION PRIORITY ORDER
------------------------------

### Phase 1 - Core Foundation (Week 1-2):
1. Create project structure
2. Set up routing
3. Create design system (variables, mixins)
4. Create Header and Footer components
5. Create common components (Button, Input, Card, Modal, Loader)
6. Build HomePage with basic layout
7. Create SearchBar component
8. Build SearchResultsPage
9. Create CarCard component
10. Build CarDetailsPage

### Phase 2 - Authentication & User Flow (Week 2-3):
11. Create LoginPage and SignUpPage
12. Implement AuthContext
13. Create ProtectedRoute wrapper
14. Build Customer Dashboard
15. Create layout components (PublicLayout, CustomerLayout, AgencyLayout, AdminLayout)

### Phase 3 - Booking System (Week 3-5):
16. Build BookingProcessPage (3 steps)
17. Create DatePicker component
18. Create PriceBreakdown component
19. Create PaymentPage
20. Build BookingConfirmationPage
21. Create MyBookingsPage
22. Build BookingDetailsPage
23. Implement BookingContext

### Phase 4 - Agency Features (Week 5-7):
24. Create RegisterAgencyPage
25. Build VerificationPage
26. Create DocumentUpload component
27. Create AgencyDashboard
28. Build AddCarPage
29. Create ManageCarsPage
30. Build EditCarPage
31. Create BookingsPage
32. Build BookingManagementPage
33. Create EarningsPage
34. Build AgencyProfilePage

### Phase 5 - Admin Features (Week 7-8):
35. Build AdminDashboard
36. Create PendingVerificationsPage
37. Build AgencyReviewPage
38. Create AllAgenciesPage
39. Create AllUsersPage
40. Build AnalyticsPage

### Phase 6 - Enhanced Features (Week 8-9):
41. Add ReviewForm and display
42. Create ReviewCard component
43. Build WriteReviewPage
44. Improve search filters
45. Add car comparison feature (optional)

### Phase 7 - Polish & Enhancement (Week 9-10):
46. Improve mobile responsiveness
47. Add loading states
48. Implement error handling
49. Add animations and transitions
50. Test all user flows
51. Fix bugs and optimize
52. Add empty states
53. Improve accessibility


## TESTING SCENARIOS
------------------

### 1. Customer Journey:
- Visit homepage
- Search for a car in Agadir
- Filter by price and category
- View car details
- Create account/Login
- Book the car (3 steps)
- Make payment
- View confirmation
- Check bookings list
- Write a review

### 2. Agency Journey:
- Create account
- Register as agency
- Fill agency information
- Upload verification documents
- Wait for approval (simulate admin approval)
- Login to agency dashboard
- Add a new car
- View car in cars list
- Receive a booking notification
- View booking details
- Confirm booking
- Check earnings dashboard

### 3. Admin Journey:
- Login as admin
- View pending verifications
- Review agency documents
- Approve agency
- View all agencies
- View all users
- Check platform analytics

### 4. Edge Cases:
- Search with no results
- Book car with conflicting dates
- Cancel booking
- Modify booking
- Delete car with active bookings
- Reject agency application
- Handle form validation errors
- Test responsive design on different devices


## FINAL DELIVERABLES
-------------------

Your React project should include:

1. **Complete file structure** as outlined above
2. **All 31 pages** functional with navigation
3. **All 20 shared components** working
4. **Mock JSON data** for testing (users, agencies, cars, bookings, reviews, commissions, payments, notifications)
5. **Sass styling** with BEM methodology (all styles in src/styles/ folder)
6. **Responsive design** for mobile/tablet/desktop
7. **Working authentication simulation** (localStorage)
8. **Functional booking flow** (3 steps)
9. **Agency service management** (add, edit, delete cars)
10. **Admin verification system** (approve/reject agencies)
11. **Review and rating system**
12. **Earnings dashboard** with charts
13. **Platform analytics** (admin)
14. **Error handling** and empty states
15. **Loading states** and animations
16. **Accessibility features** (keyboard navigation, ARIA labels)

## SIMPLIFIED APPROACH
--------------------

Since this is a **UI/UX demo**, focus on:

1. **Visual Design** - Make it look professional and polished
2. **User Experience** - Smooth interactions and clear flows
3. **Responsive Design** - Works on all devices
4. **Functionality** - Core features work (even if simulated)
5. **Performance** - Fast loading and smooth animations

**Don't worry about:**
- Real backend integration
- Complex business logic
- Advanced security features
- Real payment processing
- Complex data validation
- Advanced error handling

**Keep it simple and focused on demonstrating the UI/UX!**

---

**Good luck with your SwiftCar project! 🚗✨**


