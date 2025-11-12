import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Card from '../../../components/common/Card';
import { formatDate } from '../../../utils/dateHelpers';
import { storage } from '../../../services/storageService';

const WriteReviewPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!comment.trim()) {
      setError('Please write a short review.');
      return;
    }

    try {
      setSubmitting(true);
      const reviews = storage.get('reviews', []);
      const newReview = {
        id: `review-${Date.now()}`,
        bookingId,
        rating: Number(rating),
        title: title.trim(),
        comment: comment.trim(),
        photos: [],
        reviewDate: formatDate(new Date()),
        verified: true,
      };
      storage.set('reviews', [newReview, ...reviews]);
      navigate('/customer/bookings');
    } catch (err) {
      setError('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page--narrow">
      <div className="container">
        <h1 className="page__title">Write a review</h1>
        <Card>
          <form onSubmit={handleSubmit} className="form">
            {error && <div className="alert alert--error">{error}</div>}

            <div className="form__group">
              <label className="form__label" htmlFor="rating">Rating</label>
              <select id="rating" className="input" value={rating} onChange={(e) => setRating(e.target.value)}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} stars</option>
                ))}
              </select>
            </div>

            <Input name="title" label="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />

            <div className="form__group">
              <label className="form__label" htmlFor="review">Your review</label>
              <textarea id="review" className="input" rows="6" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about the car and the agency..." />
            </div>

            <div className="form__actions">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                Submit Review
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default WriteReviewPage;
