import { useEffect, useState } from 'react';

export const useNativeTelegram = () => {
  const [isReady, setIsReady] = useState(false);

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // Сообщаем Telegram, что приложение готово к отображению
      window.Telegram.WebApp.ready();
      // window.Telegram.WebApp.isExpanded = true
      setIsReady(true);
    }
  }, []);
  useEffect(()=>{
    if(isReady){
      // window.Telegram.WebApp.lockOrientation()
    }
  },[isReady])

  

  return {
    isReady,
    webApp: window.Telegram?.WebApp
  };
};