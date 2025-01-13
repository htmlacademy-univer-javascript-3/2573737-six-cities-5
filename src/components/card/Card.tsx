import React, {useCallback} from 'react';
import {AppRoute, TypePlacesInfo} from '../../types/types.ts';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import BookmarkButton from '../bookmark/Bookmark.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {postFavoriteOffers} from '../../store/apiActions.ts';

type placeProps = {
  place: TypePlacesInfo;
  setActiveOffer?: (id: string | null) => void;
};

export const Card: React.FC<placeProps> = ({place, setActiveOffer,}) => {
  const [isActiveCard, setActiveCard] = useState(false);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  // const [status, setStatus] = useState();
  const handleToggleFavoriteStatus = useCallback(() => {
    if (authorizationStatus) {
      dispatch(
        postFavoriteOffers({
          offerId: place.id,
          status: place.isFavorite ? 0 : 1,
        })
      );
    } else {
      navigateTo(AppRoute.Login);
    }
  }, [dispatch, navigateTo, place]);

  return (
    <article className="cities__card place-card"
      onMouseEnter={() => setActiveOffer && setActiveOffer(place.id)}
      onMouseLeave={() => setActiveOffer && setActiveOffer(null)}
      onMouseOver={() => setActiveCard(!isActiveCard)}
    >
      <Link to={{ pathname: `/offer/${place.id}`}}>

        {place.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={{ pathname: `/offer/${place.id}`}}>
            <img className="place-card__image" src={place.previewImage} width="260" height="200" alt={place.title}/>
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{place.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>

            <BookmarkButton isFavorite={place.isFavorite} handleToggleFavoriteStatus={handleToggleFavoriteStatus}/>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${place.rating * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {place.title}
          </h2>
          <p className="place-card__type">{place.type}</p>
        </div>
      </Link>
    </article>
  );
};
