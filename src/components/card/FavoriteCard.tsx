import React from 'react';
import {TypePlacesInfo} from '../../types/types.ts';
import {Card} from './Card.tsx';
import {useState} from 'react';

type placeProps = {
  place: TypePlacesInfo;
};

export const FavoriteCard: React.FC<placeProps> = ({place}) => {
  const [isActiveCard, setActiveCard] = useState(false);

  return (
    <article className="favorites__locations-items" onMouseOver={() =>
      setActiveCard(!isActiveCard)}
    >
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
            {/*  TODO CITY Name через пропс*/}
          </a>
        </div>
      </div>
      <Card key={place.id} place={place}/>
    </article>
  );
};
