import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WriteReviewPage from './WriteReviewPage';
import * as storageModule from '../../../services/storageService';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock date to ensure consistent test results
const MOCK_DATE = new Date('2025-01-15T10:00:00.000Z');
const MOCK_TIMESTAMP = MOCK_DATE.getTime();

describe('WriteReviewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(storageModule.storage, 'get').mockReturnValue([]);
    jest.spyOn(storageModule.storage, 'remove').mockReturnValue(undefined);

    // Mock Date.now() only
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_TIMESTAMP);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

const renderWriteReviewPage = (bookingId = 'booking-123') => {
    return render(
      <MemoryRouter initialEntries={[`/customer/write-review/${bookingId}`]}>
        <Routes>
          <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Review submission', () => {
    test('should allow customer to submit a review and store it in local storage', async () => {
      const existingReviews = [
        { id: 'review-1', bookingId: 'booking-999', rating: 4, comment: 'Good car' },
      ];
      storageModule.storage.get.mockReturnValue(existingReviews);

render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Fill in the review form
      const ratingSelect = screen.getByLabelText(/rating/i);
      fireEvent.change(ratingSelect, { target: { value: '4' } });

      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: 'Great experience' } });

      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: 'The car was clean and comfortable.' } });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      // Verify storage.get was called to retrieve existing reviews
      await waitFor(() => {
        expect(storageModule.storage.get).toHaveBeenCalledWith('reviews', []);
      });

      // Wait for navigation (happens after storing review)
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/customer/bookings');
      });
      const stored = JSON.parse(localStorage.getItem('reviews'));
      expect(stored[0]).toEqual(expect.objectContaining({
        id: `review-${MOCK_TIMESTAMP}`,
        bookingId: 'booking-123',
        rating: 4,
        title: 'Great experience',
        comment: 'The car was clean and comfortable.',
        photos: [],
        verified: true,
      }));
      expect(stored[0].reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(stored.slice(1)).toEqual(existingReviews);

      // Verify navigation after successful submission
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/customer/bookings');
      });
    });

    test('should trim whitespace from title and comment before submission', async () => {
      storageModule.storage.get.mockReturnValue([]);

render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: '  Great experience  ' } });

      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: '  The car was clean.  ' } });

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/customer/bookings');
      });
      const storedTrim = JSON.parse(localStorage.getItem('reviews'));
      expect(storedTrim[0]).toEqual(
        expect.objectContaining({
          title: 'Great experience',
          comment: 'The car was clean.',
        })
      );
    });

    test('should convert rating to number before storing', async () => {
      storageModule.storage.get.mockReturnValue([]);

render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const ratingSelect = screen.getByLabelText(/rating/i);
      fireEvent.change(ratingSelect, { target: { value: '3' } });

      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: 'Average service' } });

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/customer/bookings');
      });
      const storedRating = JSON.parse(localStorage.getItem('reviews'));
      expect(storedRating[0]).toEqual(
        expect.objectContaining({ rating: 3 })
      );
    });

    test('should store review with empty title when title is not provided', async () => {
      storageModule.storage.get.mockReturnValue([]);

render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Don't fill in title, only comment
      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: 'Good service' } });

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/customer/bookings');
      });
      const storedNoTitle = JSON.parse(localStorage.getItem('reviews'));
      expect(storedNoTitle[0]).toEqual(
        expect.objectContaining({ title: '', comment: 'Good service' })
      );
    });
  });

  describe('Validation', () => {
    test('should show error when comment is empty', async () => {
render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please write a short review/i)).toBeInTheDocument();
      });

      expect(localStorage.getItem('reviews')).toBeNull();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('should show error when comment contains only whitespace', async () => {
render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: '   ' } });

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please write a short review/i)).toBeInTheDocument();
      });

      expect(localStorage.getItem('reviews')).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('should display error message when storage fails', async () => {
      storageModule.storage.get.mockImplementation(() => {
        throw new Error('Storage error');
      });

render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const commentTextarea = screen.getByLabelText(/your review/i);
      fireEvent.change(commentTextarea, { target: { value: 'Good car' } });

      const submitButton = screen.getByRole('button', { name: /submit review/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to submit review/i)).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Cancel action', () => {
    test('should navigate back when cancel button is clicked', () => {
render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Default values', () => {
    test('should have default rating of 5 stars', () => {
render(
        <MemoryRouter initialEntries={[`/customer/write-review/booking-123`]}>
          <Routes>
            <Route path="/customer/write-review/:bookingId" element={<WriteReviewPage />} />
          </Routes>
        </MemoryRouter>
      );

      const ratingSelect = screen.getByLabelText(/rating/i);
      expect(ratingSelect.value).toBe('5');
    });
  });
});
