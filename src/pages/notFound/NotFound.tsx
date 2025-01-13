import React from 'react';
import { Link } from 'react-router-dom';
import {Header} from '../../components/header/Header.tsx';

export const NotFound: React.FC = () => (
  <div className="page page--gray page--login">
    <Header isMainPage={false}/>
    <div>
      <h1> 404 </h1>
      <h2> page not found</h2>
      <Link to="/" className='header__logo-link'>Go back to the home page</Link>
    </div>
  </div>
);
