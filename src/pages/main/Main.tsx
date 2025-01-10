import React, {useEffect, useState} from 'react';
import {CardList} from '../../components/cardList/CardList.tsx';
import {Header} from '../../components/header/Header.tsx';
import {Map} from '../../components/map/Map.tsx';
import {Locations} from '../../components/cities/Cities.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import { setOffersByCity} from '../../store/action.ts';
import { TypePlacesInfo} from '../../types/types.ts';
import Spinner from '../../components/spinner/Spinner.tsx';


export const Main: React.FC = () => {
  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.offersLoading);
  const cityOffers = offers.filter((offer: TypePlacesInfo) => offer?.city?.name === currentCity.name);
  const [offerCount, setOfferCount] = useState<number>();

  useEffect(() => {
    if (!loading) {
      dispatch(setOffersByCity(cityOffers));
      setOfferCount(cityOffers.length);
    }
  }, [dispatch, loading, currentCity.name]);
  return (
    <div className="page page--gray page--main">
      <Header isMainPage/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations/>

        {loading ? (
          <Spinner />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offerCount} places to stay in {currentCity.name}</b>
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
                  <CardList offers={cityOffers}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  {/*TODO перерисовка карты (зум CurrentCity, перерисовка поинтов)*/}
                  <Map offers={cityOffers} currentCity={currentCity}/>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Main;
