import React, {useEffect, useMemo, useState} from 'react';
import {CardList} from '../../components/cardList/CardList.tsx';
import {Header} from '../../components/header/Header.tsx';
import {Map} from '../../components/map/Map.tsx';
import {Locations} from '../../components/cities/Cities.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {setOffersByCity} from '../../store/action.ts';
import {TypeSortFilters} from '../../types/types.ts';
import Spinner from '../../components/spinner/Spinner.tsx';
import {PlacesSorting} from '../../components/placesSorting/placesSorting.tsx';
import useFilter from '../../hooks/useFilter.ts';


export const Main: React.FC = () => {
  const curCity = useAppSelector((state) => state.currentCity);
  const currentCity = useMemo(() => curCity, [curCity]);
  const offersList = useAppSelector((state) => state.offers);
  const offers = useMemo(() => offersList, [offersList]);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.offersLoading);
  const [sort, setSort] = useState<TypeSortFilters>(TypeSortFilters.POPULAR);
  const cityOffersFiltered = useFilter({offers, currentCity, sort});
  const cityOffers = useMemo(() => cityOffersFiltered, [cityOffersFiltered]);

  const [offerCount, setOfferCount] = useState<number>();
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const handleSortChange = (newSortType: TypeSortFilters) => {
    setSort(newSortType);
  };
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
          <Spinner/>
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offerCount} places to stay in {currentCity.name}</b>
                <PlacesSorting initialSort={sort} onChange={handleSortChange}/>
                <div className="cities__places-list places__list tabs__content">
                  <CardList offers={cityOffers} setActiveOffer={setActiveOffer}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={cityOffers} currentCity={currentCity} activeOffer={activeOffer}/>
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
