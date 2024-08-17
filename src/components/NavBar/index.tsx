import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './NavBar.scss';

import HomeIcon_active  from './images/main_active.svg?react';
import HomeIcon  from './images/main.svg?react';
import EventsIcon from './images/afisha.svg?react';
import EventsIcon_active from './images/afisha_active.svg?react';
import MapIcon from './images/map.svg?react';
import ProfileIcon  from './images/profile.svg?react';
import ProfileIcon_active  from './images/profile_active.svg?react';
import CustomLink from '../../shared/Link';

const NavBar = () => {
  const location = useLocation(); // Получаем текущий путь
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>('home');

  // Обновляем activeTab на основе текущего маршрута
  useEffect(() => {
    const path = location.pathname;
      // if(path === '/') navigate('/establishments')
    if (path === '/') {
      setActiveTab('home');
    } else if (path.startsWith('/events')) {
      setActiveTab('events');
    } else if (path.startsWith('/map')) {
      setActiveTab('map');
    } else if (path.startsWith('/profile')) {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  return (
    <div className={'bottomNavBar'}>
      <Link to="/" onClick={() => setActiveTab('home')}>
        {activeTab === 'home' ? <HomeIcon_active className={'homeIcon'}/> : <HomeIcon/>}
        <span>Главная</span>
      </Link>
      <CustomLink disabled={true} to="/events" onClick={() => setActiveTab('events')}>
        {activeTab === 'events' ? <EventsIcon_active/> : <EventsIcon/>}
        <span>Афиша</span>
      </CustomLink>
      <Link to="/map" onClick={() => setActiveTab('map')}>
        <MapIcon className={activeTab === 'map' ? 'activeIcon' : ''} />
        <span>Карта</span>
      </Link>
      <Link to="/profile" onClick={() => setActiveTab('profile')}>
        {activeTab === 'profile' ? <ProfileIcon_active/> : <ProfileIcon/>}
        <span>Профиль</span>
      </Link>
    </div>
  );
};

export default NavBar;

