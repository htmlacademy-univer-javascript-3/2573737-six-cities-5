import {TypeReviewInfo} from '../../types/types.ts';
import React from 'react';

type ReviewProps = {
  review: TypeReviewInfo;
};

export const Review: React.FC<ReviewProps> = ({ review, }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">

      <p className="reviews__text">{review.comment}</p>
      <time className="reviews__time" dateTime='2024-09-30'>
        {new Date(review.date).toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
        })}
      </time>
    </div>
  </li>
);

