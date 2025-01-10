import React from 'react';
import {TypePlacesInfo} from '../../types/types.ts';
import { useState } from 'react';
import {Link} from 'react-router-dom';

type placeProps = {
  place: TypePlacesInfo;
};

export const Card: React.FC<placeProps> = ({place}) => {
  const [isActiveCard, setActiveCard] = useState(false);

  return (
    <article className="cities__card place-card" onMouseOver={() =>
      setActiveCard(!isActiveCard)}
    >
      <Link to='/offer/:id'>

        {place.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href={place.href}>
            <img className="place-card__image" src={place.image} width="260" height="200" alt={place.imageAlt}/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{place.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button ${place.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${place.rating * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {/*<Link to='/offer/:id'>*/}
            {place.title}
            {/*</Link>*/}
          </h2>
          <p className="place-card__type">{place.type}</p>
        </div>
      </Link>
    </article>
  );
};
