import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
    <div>
      <h1> 404 </h1>
      <h2> page not found</h2>
      <Link to="/" className='header__logo-link'>Вернуться на домашнюю</Link>
    </div>
  </div>
);
