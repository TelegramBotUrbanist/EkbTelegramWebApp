import { Suspense, useEffect, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.scss';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
} from '@telegram-apps/sdk';
import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import MainPage from './pages/Main';
import {
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import Loader from './shared/Loader';

function App() {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);
  return (
    <AppRoot
      appearance={miniApp?.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </AppRoot>
  );
}

export default App;
