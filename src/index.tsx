import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/App.tsx';
import {store} from './store/store.ts';
import { Provider } from 'react-redux';
// import {fetchOffers} from './store/apiActions.ts';

// store.dispatch(fetchOffers);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
