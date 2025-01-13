import React from 'react';
import {Link} from 'react-router-dom';
import {TypePlacesInfo} from '../../types/types.ts';
import {Header} from '../../components/header/Header.tsx';
import {CardList} from '../../components/cardList/CardList.tsx';

interface FavPlaces {
  offers: TypePlacesInfo[];
}

export const Favorites: React.FC<FavPlaces> = ({offers}) => (
  <div className="page">
    <Header isMainPage={false}/>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {/* todo свериться со стилями в оригинале, пересмотреть их и использование ul*/}
            <CardList offers={offers}/>
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);
