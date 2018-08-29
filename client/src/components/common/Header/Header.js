import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiLogIn, FiLogOut } from 'react-icons/fi';
import './Header.scss';

class Header extends Component {
  render() {
    const { logged, onLogout } = this.props;
    const loginButton = (
      <NavLink to="/login" className="HeaderIcon">
        <FiLogIn />
      </NavLink>
    );
    const logoutButton = (
      <div className="HeaderIcon" onClick={onLogout}>
        <FiLogOut />
      </div>
    );
    return (
      <header className="Header">
        <div className="left">
          <div className="HeaderIcon">
            <FiMenu />
          </div>
        </div>
        <div className="center">
          <NavLink to="/" className="logo">
            Logo
          </NavLink>
        </div>
        <div className="right">{logged ? logoutButton : loginButton}</div>
      </header>
    );
  }
}

export default Header;
