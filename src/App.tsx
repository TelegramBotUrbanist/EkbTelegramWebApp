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
import EstablishmentPage from './pages/Establishment';
import { LoadingProvider } from './providers/LoadingProvider.tsx';
import CreateBook from './pages/BookEstablishment/components/CreateBook/CreateBook.tsx';
import BookEstablishment from './pages/BookEstablishment';
import TableInfo from './components/TableInfo';
import BookInfo from './pages/BookEstablishment/components/BookInfo';
import NavBarLayout from './layouts/NavBarLayout';
import EventsPage from './pages/Events';
import EstablishmentLayout from './layouts/EstablishmentLayout';
import EventPage from './pages/Events/components/EventPage';

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
    <Suspense fallback={<></>}>

    <AppRoot
      appearance={miniApp?.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <LoadingProvider>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path={'/'} element={<NavBarLayout/>}>
            <Route index element={<MainPage />} />
            <Route path={'events'} element={<EventsPage />} />
            {/*<Route path={'/events'} element={<MapPage />} />*/}
          </Route>
          <Route path={'establishment'} element={<EstablishmentLayout/>}>
            <Route path={`:id`} element={<EstablishmentLayout/>}>
              <Route index element={<EstablishmentPage/>}/>
              <Route path={'book'} element={<EstablishmentLayout/>}>
                <Route index element={<BookEstablishment type={'establishment'}/>}/>
                <Route path={`info`} element={<BookInfo/>}/>

              </Route>
              <Route path={'tables/:tableId'} element={<CreateBook/>}/>
            </Route>
          </Route>
          <Route path={'events'} element={<EstablishmentLayout/>}>
            <Route path={`:id`} element={<EstablishmentLayout/>}>
              <Route index element={<EventPage/>}/>
              <Route path={'book'} element={<EstablishmentLayout/>}>
                <Route index element={<BookEstablishment type={'event'}/>}/>
                <Route path={`info`} element={<BookInfo/>}/>
              </Route>
              <Route path={'tables/:tableId'} element={<CreateBook/>}/>
            </Route>
          </Route>



          {/*<Route path={'*'} element={<Navigate to={'/'} />} />*/}
        </Routes>
      </Router>
      </LoadingProvider>
    </AppRoot>
    </Suspense>

  );
}

export default App;
