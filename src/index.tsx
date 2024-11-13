import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placesInfo = [
  {
    isPremium: true,
    href: '#',
    image: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    href: '#',
    isBookmarked: true,
    image: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
  {
    href: '#',
    image: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    isPremium: true,
    href: '#',
    image: 'img/apartment-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    href: '#',
    image: 'img/room.jpg',
    price: 80,
    isBookmarked: true,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
];


root.render(
  <React.StrictMode>
    <App placesCount = {321} placesInfo={placesInfo}/>
  </React.StrictMode>
);
