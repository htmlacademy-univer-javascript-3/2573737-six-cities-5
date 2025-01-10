import {Main} from '../../pages/main/Main.tsx';
import {Login} from '../../pages/login/Login.tsx';
import {Offer} from '../../pages/offer/Offer.tsx';
import {NotFound} from '../../pages/notFound/NotFound.tsx';
import {Favorites} from '../../pages/favorites/Favorites.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from '../../pages/privateRoute/PrivateRoute.tsx';
import {AuthorizationStatus} from '../../types/types.ts';
import {useAppSelector, useInitApp} from '../../hooks/hooks.ts';
import React from 'react';

export const App: React.FC = () => {
  useInitApp();
  const offers = useAppSelector((state) => state.offers);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/favorites" element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            {/*TODO auth*/}
            <Favorites offers={offers}/>
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<Offer/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};
