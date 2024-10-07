import React, { createContext, useContext, useMemo } from 'react';
import Loader from '../shared/Loader';

// Создаем контекст для управления состояниями загрузки и ошибок
const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const value = useMemo(() => ({
    renderLoader: () => <Loader />,
    renderError: (error) => <div>Error: {error.message}</div>,
}), []);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      </LoadingContext.Provider>
  );
};

// Хук для получения значений контекста
export const useLoadingContext = () => useContext(LoadingContext);
