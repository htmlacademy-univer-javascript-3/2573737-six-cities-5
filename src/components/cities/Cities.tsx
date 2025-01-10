import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {setCity} from '../../store/action.ts';
import {city as cityList} from '../../mocs/city.ts';

export const Locations = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.entries(cityList).map(([cityId, cityObj]) => (
            <li className="locations__item" key={cityId}>
              {
                cityObj.name === currentCity.name ?
                  <a className="locations__item-link tabs__item tabs__item--active"
                    onClick={() => dispatch(setCity(cityObj))}
                  >
                    <span>{cityObj.name}</span>
                  </a>
                  :
                  <a className="locations__item-link tabs__item"
                    onClick={() => dispatch(setCity(cityObj))}
                  >
                    <span>{cityObj.name}</span>
                  </a>
              }
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
