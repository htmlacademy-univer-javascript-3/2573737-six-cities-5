import {Main} from '../../pages/main/Main.tsx';
import {Login} from '../../pages/login/Login.tsx';
import {Offer} from '../../pages/offer/Offer.tsx';
import {NotFound} from '../../pages/notFound/NotFound.tsx';
import {Favorites} from '../../pages/favorites/Favorites.tsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from '../../pages/privateRoute/PrivateRoute.tsx';

import {AuthorizationStatus, TypePlacesInfo} from '../../types/types.ts';

interface Props {
  placesCount: number;
  offers: TypePlacesInfo[];
}

// временный костыль. EELint ругается: placesCount и placesInfo is missing in props validation, хотя вот же выше они объявлены
// eslint-disable-next-line react/prop-types
export const App: React.FC<Props> = ({placesCount, offers}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main placesCount={placesCount} offers={offers}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/favorites" element={
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <Favorites offers={offers}/>
        </PrivateRoute>
      }
      />
      <Route path="/offer/:id" element={<Offer/>}/>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);
