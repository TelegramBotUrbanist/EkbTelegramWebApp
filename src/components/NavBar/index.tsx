import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.scss';

// Импорт SVG как компоненты
import HomeIcon  from './images/main.svg?react';
import EventsIcon from './images/ads.svg?react';
import MapIcon from './images/map.svg?react';
import ProfileIcon  from './images/profile.svg?react';

const NavBar = () => {
  const location = useLocation(); // Получаем текущий путь
  const [activeTab, setActiveTab] = useState<string>('home');

  // Обновляем activeTab на основе текущего маршрута
  useEffect(() => {
    const path = location.pathname;

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
        <HomeIcon className={activeTab === 'home' ? 'activeIcon homeIcon' : 'homeIcon'} />
        <span>Главная</span>
      </Link>
      <Link to="/events" onClick={() => setActiveTab('events')}>
        <EventsIcon className={activeTab === 'events' ? 'activeIcon' : ''} />
        <span>Афиша</span>
      </Link>
      <Link to="/map" onClick={() => setActiveTab('map')}>
        <MapIcon className={activeTab === 'map' ? 'activeIcon' : ''} />
        <span>Карта</span>
      </Link>
      <Link to="/profile" onClick={() => setActiveTab('profile')}>
        <ProfileIcon className={activeTab === 'profile' ? 'activeIcon' : ''} />
        <span>Профиль</span>
      </Link>
    </div>
  );
};

export default NavBar;
