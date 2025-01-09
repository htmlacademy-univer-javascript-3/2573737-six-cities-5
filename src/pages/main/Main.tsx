import React, {useEffect, useState} from 'react';
import {CardList} from '../../components/cardList/CardList.tsx';
import {Header} from '../../components/header/Header.tsx';
import {Map} from '../../components/map/Map.tsx';
import {Locations} from '../../components/cities/Cities.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import getCityOffersCount from '../../utils/getCityOffersCount.ts';
import {setOffers} from '../../store/action.ts';
import getCityOffers from '../../utils/getCityOffers.ts';
import {Point} from '../../types/types.ts';
import getPoints from '../../utils/getPoints.ts';


export const Main: React.FC = () => {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const placesCount = getCityOffersCount(currentCity.title);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOffers(getCityOffers(currentCity.title)));
  }, [dispatch, currentCity.title]);

  const [Points, setOffersPoints] = useState<Point[]>(
    getPoints(offers)
  );

  useEffect(() => {
    setOffersPoints(getPoints(offers));
  }, [offers]);

  return (
    <div className="page page--gray page--main">
      <Header isMainPage/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {currentCity.title}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList offers={offers}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {/*TODO перерисовка карты (зум, перерисовка поинтов), мб убрать getPoints и отдельную сущность поинта*/}
                <Map points={Points} currentCity={currentCity}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
