import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/App.tsx';
import {offers} from './mocs/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount = {321} offers={offers}/>
  </React.StrictMode>
);
