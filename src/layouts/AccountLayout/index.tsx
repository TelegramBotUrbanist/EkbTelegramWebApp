// layouts/Account/AccountLayout.tsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { retrieveLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import { formatTelegramUser } from '../../utils/telegram.ts';
import {
  accountDataAtom,
  accountStateAtom,
  loadReservationsAtom,
  userProfileAtom,
} from '../../pages/Account/account.atom.ts';

const AccountLayout = () => {
  useAtomValue(accountDataAtom);
  const [, setUserProfile] = useAtom(userProfileAtom);
  const launchParams = retrieveLaunchParams();
  debugger
  useEffect(() => {
    // Загружаем данные бронирований через http-запрос

    // Получаем данные пользователя из Telegram
    if (launchParams?.initData.user) {
      const telegramUser = launchParams.initData.user;
      const formattedUser = formatTelegramUser(telegramUser);
      setUserProfile(formattedUser);
    }
  }, []);

  return (
    <div className="account-layout">
      <Outlet />
    </div>
  );
};

export default AccountLayout;