import React, {useEffect} from 'react';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks/hooks.ts';
import {postComment} from '../../store/apiActions.ts';

type FormReviewFields = HTMLInputElement | HTMLTextAreaElement;

type ReviewFormProps = {
  offerId: string;
};

export const ReviewForm: React.FC<ReviewFormProps> = ({offerId}) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const handleCommentTextChange = (evt: React.ChangeEvent<FormReviewFields>) => {
    setText(evt.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      postComment({
        id: offerId,
        comment: text,
        rating: rating
      })
    );
  };
  useEffect(() => {
    if (rating === 0 || text.length < 50 || text.length > 300) {
      setSubmitDisabled(true);
      // console.log(submitDisabled, rating, text.length);
    } else {
      setSubmitDisabled(false);
    }
  }, [rating, text]);
  return (
    <div>
      <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onChange={() => setRating(5)}
          />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onChange={() => setRating(4)}
          />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onChange={() => setRating(3)}
          />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onChange={() => setRating(2)}
          />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onChange={() => setRating(1)}
          />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={handleCommentTextChange}
          value={text}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe
            your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={submitDisabled}>Submit</button>
        </div>
      </form>
    </div>
  );
};
