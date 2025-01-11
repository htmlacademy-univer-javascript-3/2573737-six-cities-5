import {TypeReviewInfo} from '../../types/types.ts';
import {Review} from './Review.tsx';

type ReviewsListProps = {
  reviews: TypeReviewInfo[];
};

function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewList;

