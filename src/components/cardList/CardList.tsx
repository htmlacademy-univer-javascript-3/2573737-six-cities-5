import React from 'react';
import {TypePlacesInfo} from '../../types/types.ts';
import {Card} from '../card/Card.tsx';

type ListOffersProps = {
  offers: TypePlacesInfo[];
}

export const CardList: React.FC<ListOffersProps> = ({
  offers
}) => (
  offers.map((offer: TypePlacesInfo) => (<Card key={offer.id} place={offer}/>))
);
