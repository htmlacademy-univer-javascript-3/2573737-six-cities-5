import {Link} from 'react-router-dom';
import React, {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {AuthorizationStatus} from '../../types/types.ts';
import {logoutAction} from '../../store/apiActions.ts';

type HeaderProps = {
  isMainPage: boolean;
}

export const Header: React.FC<HeaderProps> = ({isMainPage}) => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userData?.email);
  const dispatch = useAppDispatch();
  // todo перерисовка fav
  const favorite = useAppSelector((state) => state.favoriteOffers);
  const handleClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isMainPage ? (
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            ) : (
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            )}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favorite.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/login">
                        <span className="header__signout" onClick={handleClick}>Sign out</span>
                      </Link>
                    </li>
                  </>
                  :
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
