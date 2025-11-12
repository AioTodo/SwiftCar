# Unit Tests Documentation

This document describes the comprehensive unit tests created for the SwiftCar application.

## Test Files Created

### 1. SignUpPage Component Tests
**File**: `src/pages/public/SignUpPage/SignUpPage.test.js`

Tests cover:
- ✅ Successfully register a new customer and redirect to `/login`
- ✅ Successfully register a new agency and redirect to `/agency/register`
- ✅ Trim whitespace from form fields before submitting
- ✅ Show error when required fields are missing
- ✅ Show error when passwords do not match
- ✅ Display error message when API call fails
- ✅ Display default error message when API error has no message
- ✅ Show loading state during submission

**Total Tests**: 8

### 2. WriteReviewPage Component Tests
**File**: `src/pages/customer/WriteReviewPage/WriteReviewPage.test.js`

Tests cover:
- ✅ Allow customer to submit a review and store it in local storage
- ✅ Trim whitespace from title and comment before submission
- ✅ Convert rating to number before storing
- ✅ Store review with empty title when title is not provided
- ✅ Show error when comment is empty
- ✅ Show error when comment contains only whitespace
- ✅ Display error message when storage fails
- ✅ Navigate back when cancel button is clicked
- ✅ Have default rating of 5 stars

**Total Tests**: 9

### 3. storageService Utility Tests
**File**: `src/services/storageService.test.js`

Tests cover:
- ✅ Retrieve and parse stored item from localStorage
- ✅ Return fallback value when item does not exist
- ✅ Return null as default fallback
- ✅ Handle arrays correctly
- ✅ Handle nested objects correctly
- ✅ Return fallback when localStorage contains invalid JSON
- ✅ Return fallback when localStorage throws error
- ✅ Store item in localStorage with JSON serialization
- ✅ Store arrays correctly
- ✅ Store primitive values
- ✅ Overwrite existing value
- ✅ Return false when localStorage throws error
- ✅ Handle null and undefined values
- ✅ Remove item from localStorage
- ✅ Not throw error when removing non-existent item
- ✅ Handle localStorage errors silently
- ✅ Remove multiple items independently
- ✅ Support complete workflow: set, get, remove
- ✅ Handle multiple key-value pairs independently

**Total Tests**: 19

### 4. priceCalculator Utility Tests
**File**: `src/utils/priceCalculator.test.js`

Tests cover:

**rentalDays**:
- ✅ Calculate rental days for single day
- ✅ Calculate rental days for multiple days
- ✅ Calculate rental days for week-long rental
- ✅ Handle same pickup and dropoff dates
- ✅ Handle dates across months
- ✅ Handle dates across years
- ✅ Handle Date objects as input

**basePrice**:
- ✅ Calculate base price for single day
- ✅ Calculate base price for multiple days
- ✅ Round the base price
- ✅ Return 0 for same pickup and dropoff dates
- ✅ Handle zero price per day
- ✅ Not return negative values

**extrasCost**:
- ✅ Calculate cost with no extras
- ✅ Calculate cost for insurance only
- ✅ Calculate cost for GPS only
- ✅ Calculate cost for child seat only
- ✅ Calculate cost for additional driver only
- ✅ Calculate cost for multiple extras
- ✅ Calculate cost for all extras
- ✅ Ignore extras with false value
- ✅ Handle undefined extras parameter
- ✅ Ignore unknown extras

**totalPrice**:
- ✅ Calculate total price without extras
- ✅ Calculate total price with extras
- ✅ Calculate total price with all extras
- ✅ Handle omitted extras parameter
- ✅ Calculate correctly for single day with extras

**commission**:
- ✅ Calculate commission with default rate
- ✅ Calculate commission with custom rate
- ✅ Round commission to nearest integer
- ✅ Use default rate from CONSTANTS
- ✅ Handle zero total
- ✅ Handle zero rate
- ✅ Calculate commission for large amounts
- ✅ Calculate commission for decimal amounts

**Integration**:
- ✅ Calculate complete booking price with all components
- ✅ Calculate complete booking price without extras

**Total Tests**: 37

### 5. validators Utility Tests
**File**: `src/utils/validators.test.js`

Tests cover:

**required**:
- ✅ Return true for non-empty string
- ✅ Return true for string with spaces
- ✅ Return false for empty string
- ✅ Return false for string with only whitespace
- ✅ Return true for number
- ✅ Return false for null
- ✅ Return false for undefined
- ✅ Return true for boolean false
- ✅ Return true for boolean true
- ✅ Return true for arrays
- ✅ Return true for objects
- ✅ Trim string before checking length

**email**:
- ✅ Return true for valid email addresses
- ✅ Return false for invalid email addresses
- ✅ Return false for empty string
- ✅ Return false for null
- ✅ Return false for undefined
- ✅ Handle lowercase conversion
- ✅ Return false for email without @ symbol
- ✅ Return false for email without dot after @
- ✅ Return false for email with multiple @ symbols
- ✅ Return false for email with spaces

**minLength**:
- ✅ Return true when string length meets minimum
- ✅ Return true when string length exceeds minimum
- ✅ Return false when string length is below minimum
- ✅ Return true for exact minimum length
- ✅ Return false for empty string with non-zero minimum
- ✅ Return true for empty string with zero minimum
- ✅ Handle null value
- ✅ Handle undefined value
- ✅ Convert numbers to strings
- ✅ Handle zero as minimum length
- ✅ Handle negative minimum length
- ✅ Count all characters including spaces

**passwordMatch**:
- ✅ Return true when passwords match and are non-empty
- ✅ Return false when passwords do not match
- ✅ Return false when both passwords are empty
- ✅ Return false when first password is empty
- ✅ Return false when second password is empty
- ✅ Be case-sensitive
- ✅ Consider whitespace differences
- ✅ Handle special characters
- ✅ Handle numeric passwords
- ✅ Handle very long passwords
- ✅ Return false for null values
- ✅ Return false for undefined values

**Integration**:
- ✅ Validate complete signup form
- ✅ Catch validation errors in signup form
- ✅ Validate form with edge case inputs

**Total Tests**: 48

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
npm test -- SignUpPage.test.js
npm test -- WriteReviewPage.test.js
npm test -- storageService.test.js
npm test -- priceCalculator.test.js
npm test -- validators.test.js
```

To run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## Test Summary

- **Total Test Files**: 5
- **Total Test Cases**: 121
- **Components Tested**: 2
- **Utilities Tested**: 3

## Key Testing Patterns Used

1. **Mocking**: External dependencies (API calls, localStorage, navigation) are mocked
2. **Isolation**: Each test is independent and can run in any order
3. **Edge Cases**: Tests cover both happy paths and error scenarios
4. **Integration Tests**: Some tests verify multiple functions working together
5. **Validation**: All validation logic is thoroughly tested with various inputs

## Test Coverage

The tests provide comprehensive coverage for:
- User registration flow with role-based redirection
- Review submission and local storage persistence
- Storage service CRUD operations
- Price calculation including extras and commission
- Form validation for various input types

## Dependencies

The tests use:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- Jest (built-in with Create React App)

## Notes

- All tests follow best practices for React Testing Library
- Tests are independent and don't rely on execution order
- Mocks are properly cleaned up between tests
- Error cases and edge cases are well covered
- Integration tests verify complete workflows
