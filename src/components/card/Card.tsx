import React from 'react';

export type PlacesInfo = {
  isPremium?: boolean;
  href: string;
  image: string;
  imageAlt?: string;
  price: number;
  isBookmarked?: boolean;
  rating: number;
  name: string;
  type: string;
};

export const Card: React.FC<PlacesInfo> = (
  {
    isPremium,
    href,
    image,
    imageAlt,
    price,
    isBookmarked,
    rating,
    name,
    type
  }) => (
  <article className="cities__card place-card">
    {isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href={href}>
        <img className="place-card__image" src={image} width="260" height="200" alt={imageAlt}/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button ${isBookmarked ? 'place-card__bookmark-button--active' : ''} button`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"/>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{name}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);
