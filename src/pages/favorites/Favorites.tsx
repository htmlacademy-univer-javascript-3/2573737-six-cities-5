import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../../components/header/Header.tsx';
// import {FavoriteCard} from '../../components/card/FavoriteCard.tsx';
import {useAppSelector} from '../../hooks/hooks.ts';
import {FavoritesEmpty} from './FavoritesEmpty.tsx';
import {Card} from '../../components/card/Card.tsx';
import {TypePlacesInfo} from '../../types/types.ts';

export const Favorites: React.FC = () => {
  const favoritesOffers = useAppSelector((state) => state.favoriteOffers);

  const groupByCity = (offers: TypePlacesInfo[]) =>
    offers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      return {
        ...acc,
        [cityName]: [...(acc[cityName] ?? []), offer]
      };
    }, {} as {[key: string]: TypePlacesInfo[]});

  const groupedOffers = groupByCity(favoritesOffers);

  return (
    <div className="page">
      <Header isMainPage={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            Object.keys(groupedOffers).length > 0 ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(groupedOffers).map(([cityName, offers]) => (
                    <article className="favorites__locations-items" key={cityName}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{cityName}</span>
                          </a>
                        </div>
                      </div>
                      {offers.map((offer) => (
                        <Card key={offer.id} place={offer}/>
                      ))}
                    </article>
                  ))}
                </ul>
              </section>
              :
              <FavoritesEmpty/>
          }

        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};
