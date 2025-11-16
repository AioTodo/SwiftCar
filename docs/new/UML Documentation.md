# SwiftCar Car Rental Platform - UML Documentation (Mermaid)

## Table of Contents

1. [Class Diagram](#class-diagram)
2. [Use Case Diagram](#use-case-diagram)
3. [Sequence Diagrams](#sequence-diagrams)
4. [Activity Diagrams](#activity-diagrams)
5. [State Diagrams](#state-diagrams)

---

## 1. Class Diagram

### Core Domain Model for Car Rental Platform

```mermaid
classDiagram
    class User {
        -int userId
        -string email
        -string password
        -string firstName
        -string lastName
        -string phone
        -date registrationDate
        -enum userType
        -enum accountStatus
        +register()
        +login()
        +updateProfile()
        +searchCars()
        +viewBookings()
    }

    class Agency {
        -int agencyId
        -int ownerId
        -string agencyName
        -string email
        -string phone
        -string address
        -string city
        -string country
        -string logo
        -string businessLicense
        -enum verificationStatus
        -date registrationDate
        -date verificationDate
        -float commissionRate
        -boolean isActive
        +createAgency()
        +updateAgency()
        +submitDocuments()
        +manageCars()
        +viewBookings()
        +viewEarnings()
    }

    class AgencyVerification {
        -int verificationId
        -int agencyId
        -json documents
        -enum status
        -text adminNotes
        -date submissionDate
        -date reviewDate
        -int reviewedBy
        +submitForVerification()
        +approveAgency()
        +rejectAgency()
        +requestAdditionalDocs()
    }

    class Car {
        -int carId
        -int agencyId
        -string brand
        -string model
        -int year
        -enum category
        -string licensePlate
        -float pricePerDay
        -string location
        -boolean available
        -array features
        -array photos
        -enum status
        -date createdDate
        +addCar()
        +updateCar()
        +deleteCar()
        +checkAvailability()
        +calculateRentalPrice()
    }

    class Booking {
        -int bookingId
        -int userId
        -int carId
        -int agencyId
        -date bookingDate
        -date pickupDate
        -date returnDate
        -string pickupLocation
        -string returnLocation
        -int numberOfDays
        -float basePrice
        -float insurancePrice
        -float extraFees
        -float commissionAmount
        -float totalPrice
        -enum status
        -text cancellationReason
        +createBooking()
        +confirmBooking()
        +modifyBooking()
        +cancelBooking()
        +calculateTotalPrice()
        +calculateCommission()
    }

    class Payment {
        -int paymentId
        -int bookingId
        -float totalAmount
        -float commissionAmount
        -float agencyAmount
        -string paymentMethod
        -date paymentDate
        -enum status
        -string transactionId
        -float refundAmount
        -date refundDate
        +processPayment()
        +refundPayment()
        +transferToAgency()
    }

    class Commission {
        -int commissionId
        -int bookingId
        -int agencyId
        -float amount
        -float rate
        -enum status
        -date calculatedDate
        -date paidDate
        +calculateCommission()
        +recordCommission()
        +processPayoutToAgency()
    }

    class Review {
        -int reviewId
        -int userId
        -int carId
        -int agencyId
        -int bookingId
        -int rating
        -text comment
        -array photos
        -date reviewDate
        -boolean verified
        +createReview()
        +updateReview()
        +deleteReview()
    }

    %% Relationships
    User "1" --> "0..*" Agency : owns
    User "1" --> "0..*" Booking : makes
    User "1" --> "0..*" Review : writes
    
    Agency "1" --> "1" AgencyVerification : requires
    Agency "1" --> "0..*" Car : manages
    Agency "1" --> "0..*" Booking : receives
    Agency "1" --> "0..*" Commission : earns
    Agency "1" <-- "0..*" Review : receives
    
    Car "1" --> "0..*" Booking : booked_in
    Car "1" <-- "0..*" Review : receives
    
    Booking "1" --> "1" Payment : has
    Booking "1" --> "1" Commission : generates
    Booking "1" --> "0..1" Review : can_have
```

---

## 2. Use Case Diagram

### Customer Use Cases

```mermaid
graph TB
    Customer((Customer))
    
    Customer --> SearchCars[Search & Browse Cars]
    Customer --> ViewDetails[View Car Details]
    Customer --> CompareCars[Compare Cars]
    Customer --> MakeBooking[Make Booking]
    Customer --> ViewBookings[View My Bookings]
    Customer --> ModifyBooking[Modify Booking]
    Customer --> CancelBooking[Cancel Booking]
    Customer --> MakePayment[Process Payment]
    Customer --> WriteReview[Write Review]
    Customer --> ContactAgency[Contact Agency]
    
    SearchCars --> FilterResults[Filter by Price/Category]
    SearchCars --> SortResults[Sort Results]
    ViewDetails --> CheckAvailability[Check Availability]
    ViewDetails --> ViewReviews[View Reviews]
    MakeBooking --> SelectDates[Select Dates]
    MakeBooking --> AddInsurance[Add Insurance/Extras]
```

### Agency Owner Use Cases

```mermaid
graph TB
    Agency((Agency Owner))
    
    Agency --> RegisterAgency[Register Agency]
    Agency --> SubmitDocs[Submit Verification Documents]
    Agency --> ManageCars[Manage Car Inventory]
    Agency --> ViewBookings[View Bookings]
    Agency --> ManageBookings[Manage Bookings]
    Agency --> ViewEarnings[View Earnings Dashboard]
    Agency --> RequestPayout[Request Payout]
    Agency --> RespondReviews[Respond to Reviews]
    Agency --> UpdateProfile[Update Agency Profile]
    
    ManageCars --> AddCar[Add New Car]
    ManageCars --> EditCar[Edit Car Details]
    ManageCars --> DeleteCar[Delete Car]
    ManageCars --> SetPricing[Set Dynamic Pricing]
    ManageCars --> ManageAvailability[Manage Availability]
    
    ManageBookings --> ConfirmBooking[Confirm Booking]
    ManageBookings --> CommunicateCustomer[Message Customer]
```

### Administrator Use Cases

```mermaid
graph TB
    Admin((Administrator))
    
    Admin --> ReviewAgencies[Review Agency Applications]
    Admin --> ManageUsers[Manage Users]
    Admin --> ManageAgencies[Manage Agencies]
    Admin --> ModerateContent[Moderate Content]
    Admin --> ViewAnalytics[View Platform Analytics]
    Admin --> ConfigurePlatform[Configure Platform Settings]
    Admin --> HandleDisputes[Handle Disputes]
    
    ReviewAgencies --> ApproveAgency[Approve Agency]
    ReviewAgencies --> RejectAgency[Reject Agency]
    ReviewAgencies --> RequestMoreInfo[Request Additional Docs]
    
    ManageAgencies --> SuspendAgency[Suspend Agency]
    ManageAgencies --> DeactivateAgency[Deactivate Agency]
```

---

## 3. Sequence Diagrams

### 3.1 Agency Registration & Verification

```mermaid
sequenceDiagram
    participant AO as Agency Owner
    participant Sys as System
    participant VerSvc as Verification Service
    participant DB as Database
    participant Admin as Administrator
    participant Email as Email Service

    AO->>Sys: Navigate to "Become Provider"
    Sys->>AO: Display registration form
    AO->>Sys: Submit agency details
    Sys->>DB: Create agency (status: pending)
    DB-->>Sys: Agency created (agencyId)
    Sys->>AO: Request document upload
    
    AO->>Sys: Upload documents (license, tax, insurance)
    Sys->>VerSvc: Store documents
    VerSvc->>DB: Create verification record
    DB-->>VerSvc: Verification ID
    Sys->>Email: Send confirmation email
    Email-->>AO: Confirmation received
    Sys->>AO: Display "Pending verification (1-3 days)"
    
    Note over Admin,VerSvc: Admin Review Process (1-3 days)
    
    Admin->>Sys: Login to admin panel
    Sys->>Admin: Display pending verifications
    Admin->>Sys: Select agency to review
    Sys->>DB: Fetch agency details & documents
    DB-->>Sys: Return data
    Sys->>Admin: Display review interface
    
    Admin->>Admin: Review documents
    Admin->>Admin: Verify business license
    
    alt Approve
        Admin->>Sys: Approve agency
        Sys->>DB: Update status to "verified"
        Sys->>DB: Set commission rate (6%)
        DB-->>Sys: Confirmation
        Sys->>Email: Send approval email
        Email-->>AO: "Agency approved!"
    else Reject
        Admin->>Sys: Reject with reason
        Sys->>DB: Update status to "rejected"
        Sys->>Email: Send rejection email
        Email-->>AO: "Application rejected"
    else Request More Info
        Admin->>Sys: Request additional documents
        Sys->>DB: Update status to "more_info_needed"
        Sys->>Email: Send request email
        Email-->>AO: "Please upload additional docs"
    end
```

### 3.2 Customer Booking a Car

```mermaid
sequenceDiagram
    participant C as Customer
    participant Sys as System
    participant CarSvc as Car Service
    participant BookSvc as Booking Service
    participant PayGW as Payment Gateway
    participant DB as Database
    participant Agency as Agency Owner
    participant Email as Email Service

    C->>Sys: Search cars (location, dates)
    Sys->>CarSvc: Query available cars
    CarSvc->>DB: Fetch available cars
    DB-->>CarSvc: Return car list
    CarSvc-->>Sys: Car results
    Sys->>C: Display search results
    
    C->>Sys: Select car & view details
    Sys->>CarSvc: Get car details
    CarSvc->>DB: Fetch car data
    DB-->>CarSvc: Car details
    Sys->>C: Display car details page
    
    C->>Sys: Click "Book Now"
    
    alt Not logged in
        Sys->>C: Redirect to login
        C->>Sys: Login/Register
    end
    
    Sys->>CarSvc: Check real-time availability
    CarSvc->>DB: Query availability
    DB-->>CarSvc: Available
    
    Sys->>BookSvc: Calculate total price
    Note over BookSvc: Base: €250, Insurance: €25<br/>Commission: €16.50 (6%)<br/>Total: €275
    BookSvc-->>Sys: Price breakdown
    
    Sys->>C: Display booking form with pricing
    C->>Sys: Confirm booking details
    
    Sys->>BookSvc: Create booking (status: pending)
    BookSvc->>DB: Insert booking record
    DB-->>BookSvc: Booking ID
    
    Sys->>C: Redirect to payment
    C->>Sys: Enter payment details
    Sys->>PayGW: Process payment (€275)
    PayGW-->>Sys: Payment successful
    
    Sys->>BookSvc: Update booking (status: confirmed)
    BookSvc->>DB: Update booking
    BookSvc->>DB: Block car dates
    BookSvc->>DB: Record commission (€16.50)
    
    Sys->>Email: Send confirmation to customer
    Email-->>C: Booking confirmed!
    Sys->>Email: Notify agency of new booking
    Email-->>Agency: New booking received
    
    Sys->>C: Display confirmation page
```

### 3.3 Agency Adding a Car

```mermaid
sequenceDiagram
    participant AO as Agency Owner
    participant Sys as System
    participant CarSvc as Car Service
    participant FileSvc as File Upload Service
    participant DB as Database
    participant Email as Email Service

    AO->>Sys: Login to agency account
    Sys->>AO: Display provider dashboard
    AO->>Sys: Navigate to "Add Car"
    Sys->>AO: Display car entry form
    
    AO->>Sys: Fill car details
    Note over AO,Sys: Brand, Model, Year<br/>Category, License Plate<br/>Price, Location, Features
    
    AO->>Sys: Upload photos (5 images)
    Sys->>FileSvc: Process & optimize images
    FileSvc-->>Sys: Return image URLs
    
    AO->>Sys: Submit form
    Sys->>Sys: Validate data
    
    Sys->>DB: Check agency verification status
    DB-->>Sys: Status: verified
    
    Sys->>CarSvc: Create car record
    CarSvc->>DB: Insert car data (status: active)
    DB-->>CarSvc: Car ID
    CarSvc-->>Sys: Car created successfully
    
    Sys->>Email: Send confirmation email
    Email-->>AO: "Car successfully listed!"
    
    Sys->>AO: Display success message
    Sys->>AO: Redirect to "My Cars" page
    
    Note over Sys: Car is now searchable by customers
```

### 3.4 Admin Verifying Agency

```mermaid
sequenceDiagram
    participant Admin as Administrator
    participant Sys as System
    participant VerSvc as Verification Service
    participant DB as Database
    participant Email as Email Service
    participant AO as Agency Owner

    Admin->>Sys: Login to admin panel
    Sys->>Admin: Display admin dashboard
    Admin->>Sys: Navigate to "Pending Verifications"
    
    Sys->>VerSvc: Get pending agencies
    VerSvc->>DB: Query pending verifications
    DB-->>VerSvc: Return list (5 agencies)
    VerSvc-->>Sys: Pending list
    Sys->>Admin: Display pending agencies
    
    Admin->>Sys: Select agency #3 to review
    Sys->>VerSvc: Fetch agency details
    VerSvc->>DB: Get agency + documents
    DB-->>VerSvc: Complete data
    VerSvc-->>Sys: Agency data + docs
    
    Sys->>Admin: Display review interface
    Note over Admin: Business License<br/>Tax Registration<br/>Insurance<br/>Owner ID
    
    Admin->>Admin: Review documents
    Admin->>Admin: Verify license in gov database
    Admin->>Admin: Check contact information
    
    alt Approve
        Admin->>Sys: Click "Approve Agency"
        Sys->>Admin: Confirm approval
        Admin->>Sys: Confirm
        Sys->>VerSvc: Approve agency
        VerSvc->>DB: Update status to "verified"
        VerSvc->>DB: Set verificationDate
        VerSvc->>DB: Assign commissionRate (6%)
        DB-->>VerSvc: Updated
        Sys->>Email: Send approval email
        Email-->>AO: "Your agency is approved!"
        Sys->>Admin: Display "Agency approved"
    else Reject
        Admin->>Sys: Click "Reject Agency"
        Sys->>Admin: Request rejection reason
        Admin->>Sys: Enter reason
        Sys->>VerSvc: Reject agency
        VerSvc->>DB: Update status to "rejected"
        VerSvc->>DB: Save admin notes
        Sys->>Email: Send rejection email with reasons
        Email-->>AO: "Application rejected"
        Sys->>Admin: Display "Agency rejected"
    else Request More Info
        Admin->>Sys: Click "Request Additional Documents"
        Sys->>Admin: Request document list
        Admin->>Sys: Specify needed documents
        Sys->>VerSvc: Update status to "more_info_needed"
        VerSvc->>DB: Update status
        Sys->>Email: Send request email
        Email-->>AO: "Please upload: [list]"
        Sys->>Admin: Display "Request sent"
    end
```

---

## 4. Activity Diagrams

### 4.1 Complete Agency Registration & First Car Listing

```mermaid
flowchart TD
    Start([User wants to become provider]) --> HasAccount{Has user<br/>account?}
    HasAccount -->|No| CreateAccount[Create user account]
    CreateAccount --> Login[Login]
    HasAccount -->|Yes| Login
    
    Login --> Navigate[Navigate to 'Become Provider']
    Navigate --> FillForm[Fill agency registration form]
    FillForm --> UploadLogo[Upload agency logo]
    UploadLogo --> SubmitBasic[Submit basic information]
    
    SubmitBasic --> ValidForm{Form valid?}
    ValidForm -->|No| ShowErrors[Display errors]
    ShowErrors --> FillForm
    ValidForm -->|Yes| CreateAgency[Create agency record<br/>status: pending]
    
    CreateAgency --> ShowDocPage[Display document upload page]
    ShowDocPage --> UploadDocs[Upload verification documents<br/>License, Tax, Insurance, ID]
    UploadDocs --> SubmitDocs[Submit documents]
    
    SubmitDocs --> CreateVerification[Create verification request]
    CreateVerification --> SendConfirm[Send confirmation email]
    SendConfirm --> ShowWait[Display: Wait 1-3 days]
    
    ShowWait --> AdminReview[Admin reviews documents]
    AdminReview --> Decision{Admin<br/>decision?}
    
    Decision -->|Rejected| SendRejection[Send rejection email]
    SendRejection --> End1([End])
    
    Decision -->|More Info| RequestMoreDocs[Request additional documents]
    RequestMoreDocs --> UploadDocs
    
    Decision -->|Approved| UpdateStatus[Update status to 'verified']
    UpdateStatus --> AssignCommission[Assign commission rate 6%]
    AssignCommission --> SendApproval[Send approval email]
    
    SendApproval --> AgencyLogin[Agency owner logs in]
    AgencyLogin --> NavAddCar[Navigate to 'Add Car']
    NavAddCar --> FillCarForm[Fill car details form<br/>Brand, Model, Year, Category<br/>Price, Location, Features]
    
    FillCarForm --> UploadPhotos[Upload car photos<br/>minimum 3]
    UploadPhotos --> EnterDesc[Enter car description]
    EnterDesc --> SubmitCar[Submit car information]
    
    SubmitCar --> ValidCar{Car data<br/>valid?}
    ValidCar -->|No| ShowCarErrors[Display errors]
    ShowCarErrors --> FillCarForm
    
    ValidCar -->|Yes| CreateCar[Create car record<br/>status: active]
    CreateCar --> CarSearchable[Car becomes searchable]
    CarSearchable --> ShowSuccess[Display success notification]
    ShowSuccess --> SendCarEmail[Send confirmation email]
    SendCarEmail --> RedirectMyCars[Redirect to 'My Cars']
    RedirectMyCars --> End2([End: Agency verified<br/>+ First car listed])
```

### 4.2 Customer Booking Flow

```mermaid
flowchart TD
    Start([Customer visits homepage]) --> Search[Search for cars<br/>Enter location, dates]
    Search --> Submit[Click 'Search']
    Submit --> Retrieve[System retrieves available cars]
    Retrieve --> Display[Display search results]
    
    Display --> ApplyFilter{Apply<br/>filters?}
    ApplyFilter -->|Yes| Filter[Filter by price/category/features]
    Filter --> Display
    ApplyFilter -->|No| Browse[Browse car list]
    
    Browse --> SelectCar[Select a car]
    SelectCar --> ViewDetails[View car details<br/>Photos, specs, reviews, price]
    
    ViewDetails --> Satisfied{Satisfied<br/>with car?}
    Satisfied -->|No| Display
    Satisfied -->|Yes| ClickBook[Click 'Book Now']
    
    ClickBook --> LoggedIn{User<br/>logged in?}
    LoggedIn -->|No| RedirectLogin[Redirect to Login/Register]
    RedirectLogin --> LoginProcess[Login/Register]
    LoginProcess --> CheckAvail
    LoggedIn -->|Yes| CheckAvail[Check real-time availability]
    
    CheckAvail --> Available{Car<br/>available?}
    Available -->|No| ShowError[Show error + back to search]
    ShowError --> Display
    Available -->|Yes| ShowBooking[Booking Details Page<br/>Confirm dates, locations, pricing]
    
    ShowBooking --> AddInsurance{Add<br/>insurance?}
    AddInsurance -->|Yes| AddInsuranceFee[Add insurance fee]
    AddInsurance -->|No| ReviewTotal[Review total price]
    AddInsuranceFee --> ReviewTotal
    
    ReviewTotal --> ConfirmBook{Confirm<br/>booking?}
    ConfirmBook -->|No| Cancel1[Cancel]
    Cancel1 --> End1([End])
    ConfirmBook -->|Yes| CreateBooking[Create booking record<br/>status: pending]
    
    CreateBooking --> RedirectPay[Redirect to payment page]
    RedirectPay --> EnterPayment[Enter payment details<br/>Card, CVV, Billing]
    EnterPayment --> SubmitPay[Submit payment]
    SubmitPay --> ProcessPay[Process payment]
    
    ProcessPay --> PaySuccess{Payment<br/>successful?}
    PaySuccess -->|No| PayFailed[Payment failed]
    PayFailed --> Retry{Retry?}
    Retry -->|Yes| EnterPayment
    Retry -->|No| CancelBook[Cancel booking]
    CancelBook --> End2([End])
    
    PaySuccess -->|Yes| UpdateBooking[Update booking status: confirmed]
    UpdateBooking --> BlockDates[Block car dates in calendar]
    BlockDates --> RecordCommission[Calculate & record commission]
    RecordCommission --> NotifyCustomer[Send confirmation email to customer]
    NotifyCustomer --> NotifyAgency[Send booking notification to agency]
    NotifyAgency --> ShowConfirm[Display confirmation page<br/>Reference number, Details, Receipt]
    ShowConfirm --> End3([End: Booking completed])
```

### 4.3 Agency Managing Daily Operations

```mermaid
flowchart TD
    Start([Agency owner starts day]) --> Login[Login to agency account]
    Login --> Dashboard[View dashboard overview<br/>Today's bookings, earnings, notifications]
    
    Dashboard --> CheckNew{New<br/>bookings?}
    CheckNew -->|Yes| ReviewBookings[Review booking details]
    ReviewBookings --> PrepareService[Prepare service, mark acknowledged]
    PrepareService --> CheckMessages
    CheckNew -->|No| CheckMessages{Pending<br/>messages?}
    
    CheckMessages -->|Yes| ReadMessages[Read customer messages]
    ReadMessages --> RespondMessages[Respond to inquiries]
    RespondMessages --> ReviewAvail
    CheckMessages -->|No| ReviewAvail[Review service availability]
    
    ReviewAvail --> UpdateAvail[Update availability calendar<br/>Mark maintenance, Update pricing]
    UpdateAvail --> CheckPerf[Check service performance<br/>Most booked, Low-performing]
    
    CheckPerf --> AddNew{Need to add<br/>new services?}
    AddNew -->|Yes| AddService[Add new car/service<br/>Upload photos, Set pricing]
    AddService --> CheckReviews
    AddNew -->|No| CheckReviews{New<br/>reviews?}
    
    CheckReviews -->|Yes| ReadReviews[Read customer reviews]
    ReadReviews --> RespondRev{Need to<br/>respond?}
    RespondRev -->|Yes| WriteResponse[Write response to review]
    WriteResponse --> CheckEarnings
    RespondRev -->|No| CheckEarnings
    CheckReviews -->|No| CheckEarnings[Check earnings dashboard<br/>Today/Week/Month revenue]
    
    CheckEarnings --> PayoutAvail{Payout<br/>available?}
    PayoutAvail -->|Yes| RequestPayout[Request payout to bank]
    RequestPayout --> ViewAnalytics
    PayoutAvail -->|No| ViewAnalytics[View analytics<br/>Trends, Popular services, Demographics]
    
    ViewAnalytics --> UpdateServices{Need to update<br/>services?}
    UpdateServices -->|Yes| UpdateCar[Update car details<br/>Change pricing, Update photos]
    UpdateServices -->|No| Logout[Logout]
    UpdateCar --> Logout
    
    Logout --> End([End: Daily operations complete])
```

---

## 5. State Diagrams

### 5.1 Agency Verification States

```mermaid
stateDiagram-v2
    [*] --> NotRegistered
    NotRegistered --> PendingSubmission: User creates agency profile
    PendingSubmission --> DocumentsSubmitted: Upload verification documents
    DocumentsSubmitted --> UnderReview: Admin starts review
    
    UnderReview --> Approved: Admin approves (1-3 days)
    UnderReview --> Rejected: Admin rejects
    UnderReview --> MoreInfoNeeded: Admin requests more info
    
    MoreInfoNeeded --> DocumentsSubmitted: Agency uploads additional docs
    
    Approved --> Suspended: Violations/Complaints
    Suspended --> Approved: Issues resolved
    Approved --> Deactivated: Agency closes business
    
    Rejected --> [*]
    Deactivated --> [*]
    
    note right of Approved
        Agency can now:
        - Add cars
        - Receive bookings
        - Earn commission
    end note
    
    note right of UnderReview
        Timeline: 1-3 business days
        Admin checks:
        - Business license
        - Tax registration
        - Insurance
    end note
```

### 5.2 Car States

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Active: Agency completes car listing
    
    Active --> Booked: Customer makes booking
    Booked --> InUse: Rental start date reached
    InUse --> Active: Rental end date, car returned
    
    Active --> Maintenance: Agency marks for maintenance
    Maintenance --> Active: Maintenance completed
    
    Active --> Inactive: Agency temporarily removes
    Inactive --> Active: Agency reactivates
    
    Active --> Deleted: Agency permanently removes
    Maintenance --> Deleted: Agency permanently removes
    Inactive --> Deleted: Agency permanently removes
    
    Deleted --> [*]
    
    note right of Active
        Car is:
        - Searchable by customers
        - Available for booking
        - Visible in search results
    end note
    
    note right of Booked
        Dates are blocked
        Not available for other bookings
    end note
```

### 5.3 Booking States

```mermaid
stateDiagram-v2
    [*] --> NoBooking
    NoBooking --> Pending: Customer creates booking
    Pending --> PaymentProcessing: Customer enters payment
    
    PaymentProcessing --> Confirmed: Payment successful
    PaymentProcessing --> CancelledBySystem: Payment failed
    
    Confirmed --> Modified: Customer changes dates/details
    Modified --> Confirmed: Changes confirmed
    
    Confirmed --> CancelledByCustomer: Customer cancels
    Confirmed --> CancelledByAgency: Agency cancels (rare)
    Confirmed --> InProgress: Start date reached
    
    InProgress --> Completed: End date reached, car returned
    Completed --> Reviewed: Customer submits review
    
    Completed --> Archived: 30 days after completion
    Reviewed --> Archived: 30 days after completion
    
    CancelledBySystem --> [*]
    CancelledByCustomer --> [*]
    CancelledByAgency --> [*]
    Archived --> [*]
    
    note right of Confirmed
        - Agency notified
        - Commission calculated
        - Car dates blocked
        - Customer receives confirmation
    end note
    
    note right of Completed
        - Service finished
        - Commission finalized
        - Customer can write review
    end note
```

### 5.4 Payment States

```mermaid
stateDiagram-v2
    [*] --> NoPayment
    NoPayment --> Pending: Booking created
    Pending --> Processing: Customer submits payment
    
    Processing --> Authorized: Payment approved
    Processing --> Failed: Payment declined
    
    Authorized --> Completed: Funds captured
    
    Failed --> Pending: Customer retries payment
    Failed --> Cancelled: Customer gives up
    
    Completed --> RefundPending: Booking cancelled
    RefundPending --> Refunded: Refund processed
    
    Cancelled --> [*]
    Refunded --> [*]
    
    note right of Completed
        Payment breakdown:
        - Total amount
        - Commission amount
        - Agency amount (to be paid out)
    end note
    
    note right of RefundPending
        Refund policy:
        - Full refund if >48hrs
        - Partial if 24-48hrs
        - No refund if <24hrs
    end note
```

### 5.5 Commission States

```mermaid
stateDiagram-v2
    [*] --> NotCalculated
    NotCalculated --> PendingCalculation: Booking confirmed
    PendingCalculation --> Calculated: Booking completed successfully
    
    Calculated --> ReadyForPayout: Payout period reached (monthly)
    ReadyForPayout --> Paid: Payout processed to agency
    
    Calculated --> Refunded: Booking cancelled after completion
    
    Paid --> Final: Financial period closed
    Refunded --> Final: Financial period closed
    
    Final --> [*]
    
    note right of Calculated
        Commission rate: 5-7%
        Based on:
        - Service price
        - Agency tier
        - Booking volume
    end note
    
    note right of ReadyForPayout
        Payout schedule:
        - Monthly payout
        - Minimum threshold: €100
        - Transferred to agency bank
    end note
```

---

## Summary

This UML documentation provides a complete structural and behavioral view of the SwiftCar car rental platform using Mermaid syntax. The diagrams illustrate:

- **Class Diagram**: Data structure and relationships between core entities
- **Use Case Diagrams**: All user interactions organized by role (Customer, Agency, Admin)
- **Sequence Diagrams**: Step-by-step processes for key workflows
- **Activity Diagrams**: Decision flows and detailed process steps
- **State Diagrams**: Complete lifecycle of entities through various states

These diagrams serve as the blueprint for implementing the React frontend with proper data flow, user interactions, and state management for the SwiftCar platform.
