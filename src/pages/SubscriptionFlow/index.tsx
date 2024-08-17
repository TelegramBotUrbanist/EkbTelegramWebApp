import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { http, resetApiProvider } from '../../shared/http.ts';
import { motion } from 'framer-motion';
import './index.scss';
import Button from '../../shared/Button';
import { useResetAtom } from 'jotai/react/utils/useResetAtom';
import {
  allCategory,
  categoriesAtom,
  categoriesRefreshAtom,
  Category,
} from '../Main/components/CategoriesBar/categroies.atoms.ts';
import {
  establishmentsAtom,
  establishmentsRefreshAtom,
} from '../Main/components/CategorySection/categorySection.atoms.ts';
import { useAtom, useAtomValue } from 'jotai';
import { mapEstablishmentCategories, mapEstablishmentList } from '../Main/main.mapper.ts';
import { mapDto } from '../../utils/mapper.ts';

const SubscriptionFlow = () => {
  const [subscriptionState, setSubscriptionState] = useState('initial');
  const navigate = useNavigate();
  const [, setEstablishmentsRefresh] = useAtom(establishmentsRefreshAtom);
  const [, setCategoriesRefresh] = useAtom(categoriesRefreshAtom);

  useEffect(() => {
    debugger
    checkInitialAuth();
  }, []);

  const openTelegramChannel = (channel) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/${channel.replace('@', '')}`);
    } else {
      window.open(`https://t.me/${channel.replace('@', '')}`, '_blank');
    }
  };
  const renderLabel = (emoji, text, channelName,channelValue) => (
    <div className="subscription-flow__label">

      <div>
        {emoji}
        {channelName ? text.split(channelName).map((part, index, array) => (
          <React.Fragment key={index}>
            {part}
            {index < array.length - 1 && (
              <span
                onClick={() => openTelegramChannel(channelValue)}
                className="subscription-flow__channel-link"

              >
                {channelName}
              </span>
            )}
          </React.Fragment>
        )): text}
      </div>
    </div>
  );

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const refetchAtoms = () => {
    setEstablishmentsRefresh(n => n + 1);
    setCategoriesRefresh(n => n + 1);
  }
  const checkInitialAuth = async () => {
    try {
      resetApiProvider();
      const { initDataRaw } = retrieveLaunchParams();

      await http.post('/authentication', { initData: initDataRaw });
      await checkSubscription().then(()=>navigate('/'))

    } catch (error) {
      if (error.response?.status === 403) {
        const isSubscribed = await checkSubscription();
        if (!isSubscribed) {
          setSubscriptionState('needSubscribe');
        }
      } else if ([401, 407].includes(error.response?.status)) {
        setSubscriptionState('needSubscribe');
      }
    }
  };

  const checkSubscription = async () => {
    try {
      resetApiProvider();
      const response = await http.get('/subscription/check');
      return response.data.subscribeOnChannel;
    } catch (error) {
      if (error.response?.data?.errorCode === 'USER_IS_NOT_SUBSCRIBE_ON_CHANNEL') {
        return false;
      }
      throw error;
    }
  };

  const handleCheckSubscription = async () => {
    try {
      const isSubscribed = await checkSubscription();
      if (isSubscribed) {
        setSubscriptionState('confirmed');
      } else {
        setSubscriptionState('notSubscribed');
      }
    } catch (error) {
      console.error('Subscription check failed:', error);
    }
  };

  const handleNavigateToApp = async () => {
    // try {
    //   await checkInitialAuth();
    // } catch (error) {
    //   console.error('Navigation failed:', error);
    // }
    await refetchAtoms()
    debugger
    // resetCategories([])
    // resetEstablishments([])
    navigate('/')

  };

  const renderContent = () => {
    const defaultChannel = {
      value:'@urbanist_yekaterinburg',
      name:'ÚRBANIST ЕКАТЕРИНБУРГ'
    };


    switch (subscriptionState) {
      case 'initial':
      case 'needSubscribe':
        return (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="subscription-flow__content"
          >
            <motion.img
              variants={itemAnimation}
              className="subscription-flow__image"
              src="/subsribe.gif"
              alt="Subscribe"
            />
            <motion.div variants={itemAnimation}>
              {renderLabel('⌛️', `Чтобы пользоваться сервисом, подпишитесь на канал ${defaultChannel.name}`, defaultChannel.name,defaultChannel.value)}
            </motion.div>
            <motion.div className={"buttonContainer"} variants={itemAnimation}>
              <Button type="primary" onClick={handleCheckSubscription}>
                Проверить подписку
              </Button>
            </motion.div>
          </motion.div>
        );

      case 'notSubscribed':
        return (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="subscription-flow__content"
          >
            <motion.img
              variants={itemAnimation}
              className="subscription-flow__image"
              src="/empty.gif"
              alt="Not subscribed"
            />
            <motion.div variants={itemAnimation}>
              {renderLabel('❌', `Вы не подписаны на канал ${defaultChannel.name}`, defaultChannel.name,defaultChannel.value)}
            </motion.div>
            <motion.div className={"buttonContainer"} variants={itemAnimation}>
              <Button type="primary" onClick={handleCheckSubscription}>
                Проверить подписку
              </Button>
            </motion.div>
          </motion.div>
        );

      case 'confirmed':
        return (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="subscription-flow__content"
          >
            <motion.img
              variants={itemAnimation}
              className="subscription-flow__image"
              src="/subscribe-confirmed.gif"
              alt="Confirmed"
            />
            <motion.div variants={itemAnimation}>
              {renderLabel('🎉', 'Теперь вы можете пользоваться сервисом!','','')}
            </motion.div>
            <motion.div className={"buttonContainer"} variants={itemAnimation}>
              <Button type="primary" onClick={handleNavigateToApp}>
                Перейти в приложение
              </Button>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="subscription-flow">
      {renderContent()}
    </div>
  );
};

export default SubscriptionFlow;