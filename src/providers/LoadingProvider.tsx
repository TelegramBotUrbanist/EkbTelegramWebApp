import React, { createContext, useContext, useMemo } from 'react';
import Loader from '../shared/Loader';

const LoadingContext = createContext({});

export const LoadingProvider = ({ children, isLoading, isError }) => {
  const value = useMemo(() => ({
    renderLoader: () => <Loader />,
    renderError: (error) => <div>Error: {error.message}</div>,
}), []);

  if(isLoading){
    return value.renderLoader()
  }
  if(isError){
    return value.renderError('Ошибка 123')
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
