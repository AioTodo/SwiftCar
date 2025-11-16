import React from 'react';
import { StarFilledIcon } from '@radix-ui/react-icons';

const ReviewItem = ({ review }) => (
  <div className="review-item">
    <div className="review-item__header">
      <span className="review-item__rating">
        <StarFilledIcon aria-hidden="true" /> {review.rating}
      </span>
      <span className="review-item__date">{review.reviewDate}</span>
    </div>
    {review.title && <h4 className="review-item__title">{review.title}</h4>}
    <p className="review-item__comment">{review.comment}</p>
  </div>
);

const ReviewList = ({ items, average, count }) => (
  <div className="reviews">
    <h2>Customer Reviews</h2>
    <div className="reviews__summary">
      <strong>Average Rating:</strong> <span>{average}</span> <span>({count} reviews)</span>
    </div>
    <div className="reviews__items">
      {items.length === 0 ? (
        <p className="text-muted">No reviews yet.</p>
      ) : (
        items.map((r) => <ReviewItem key={r.id} review={r} />)
      )}
    </div>
  </div>
);

export default ReviewList;
