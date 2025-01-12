import React from 'react';
import {TypePlacesInfo} from '../../types/types.ts';
import {Card} from '../card/Card.tsx';

type ListOffersProps = {
  offers: TypePlacesInfo[];
  setActiveOffer?: (id: string | null) => void;
}

export const CardList: React.FC<ListOffersProps> = ({
  offers,
  setActiveOffer
}) => (
  offers.map((offer: TypePlacesInfo) => (<Card key={offer.id} place={offer} {...(setActiveOffer && {setActiveOffer})}/>))
);
