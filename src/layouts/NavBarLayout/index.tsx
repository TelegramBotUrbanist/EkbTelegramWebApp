import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './layout.scss'

const NavBarLayout = () => {
  return (
    <div className={'navbar-layout'}>
      <Outlet />
      <NavBar />
    </div>
  );
};

export default NavBarLayout;
