import React, {useEffect, useState} from 'react';
import {ReviewForm} from '../../components/review/ReviewForm.tsx';
import {Header} from '../../components/header/Header.tsx';
import ReviewList from '../../components/review/ReviewsList.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {fetchComments, fetchNearby, fetchOfferById} from '../../store/apiActions.ts';
import {Map} from '../../components/map/Map.tsx';
import {Card} from '../../components/card/Card.tsx';
import Spinner from '../../components/spinner/Spinner.tsx';
import {AuthorizationStatus} from '../../types/types.ts';

export const Offer: React.FC = () => {
  const params = useParams<{ id: string }>();
  const offerId = params.id ?? 'default-offer-id';
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offerById);
  const reviews = useAppSelector((state) => state.reviews);
  const nearby = useAppSelector((state) => state.nearbyOffers);
  const loading = useAppSelector((state) => state.offersLoading);
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const error = useAppSelector((state) => state.error);
  useEffect(() => {
    dispatch(fetchOfferById(offerId));
    dispatch(fetchComments(offerId));
    dispatch(fetchNearby(offerId));
  }, [dispatch]);

  if (error) {
    return <Navigate to={'/404'} />;
  }
  return (
    <div className="page">
      <Header isMainPage={false}/>
      {loading ? (
        <Spinner/>
      ) : (
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {
                  offer.isPremium ?
                    <div className="offer__mark">
                      <span>Premium</span>
                    </div>
                    :
                    null
                }
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    {
                      offer.isFavorite ?
                        <span className="visually-hidden">To bookmarks</span>
                        :
                        null
                    }
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offer.rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">4.8</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {offer.maxAdults}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    {
                      offer.host.isPro ?
                        <>
                          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                            <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74"
                              height="74"
                              alt="Host avatar"
                            />
                          </div>
                          <span className="offer__user-name"> {offer.host.name} </span>
                          <span className="offer__user-status">  Pro  </span>
                        </>
                        :
                        <>
                          <div className="offer__avatar-wrapper user__avatar-wrapper">
                            <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74"
                              height="74"
                              alt="Host avatar"
                            />
                          </div>
                          <span className="offer__user-name"> {offer.host.name} </span>
                        </>
                    }
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewList reviews={reviews}/>
                  {
                    authorizationStatus === AuthorizationStatus.Auth ?
                      <ReviewForm offerId = {offer.id}/>
                      :
                      null
                  }
                </section>
              </div>
            </div>
            <section className="offer__map map">
              {/*TODO та же проблема с перерисовкой. в этот раз сюда не успевают передаться сити лок до рендера*/}
              {/*перерисовывает, но не всегда*/}
              <Map currentCity={offer.city} offers={nearby} activeOffer={activeOffer}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearby.slice(0, 3).map((item) => (
                  <Card key={item.id} place={item} setActiveOffer={setActiveOffer}/>
                ))}
                {/*TODO посмотреть различаются ли near стили от обычных что в Card*/}
                {/*<article className="near-places__card place-card">*/}
                {/*  <div className="place-card__mark">*/}
                {/*    <span>Premium</span>*/}
                {/*  </div>*/}
                {/*  <div className="near-places__image-wrapper place-card__image-wrapper">*/}
                {/*    <a href="#">*/}
                {/*      <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200"*/}
                {/*        alt="Place image"*/}
                {/*      />*/}
                {/*    </a>*/}
                {/*  </div>*/}
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};
