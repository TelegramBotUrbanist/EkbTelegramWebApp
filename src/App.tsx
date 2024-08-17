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
  Routes, useNavigate,
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
import OutletLayout from './layouts/Establishment/EstablishmentLayout';
import EventPage from './pages/Events/components/EventPage';
import EstablishmentPageLayout from './layouts/Establishment/EstablishmentPageLayout';
import Selection from "./pages/Selection";
import AvailableTables from './pages/BookEstablishment/components/AvailableTables';
import WithBookDetail from './layouts/Establishment/WithBookDetail';
import EstablishmentWithIdLayout from './layouts/Establishment/EstablishmentWithIdLayout';
import AccountLayout from './layouts/AccountLayout';
import AccountPage from './pages/Account';
import Favorites from './pages/Account/components/Favorites';
import Promocodes from './pages/Account/components/Promocodes';
import MapPage from './pages/Map';
import { useWebAppLocation } from './hooks/useLocation.ts';
import SubscriptionFlow from './pages/SubscriptionFlow';
import { setNavigationCallback } from './shared/http.ts';

function App() {
  debugger
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const navigate = useNavigate()
  const {
    location:webLocation,
    requestLocation,
    error,
    isLoading,
    isInitialized
  } = useWebAppLocation();


  useEffect(() => {
    setNavigationCallback((path) => navigate(path));
  }, [navigate]);
  useEffect(() => {
    const requestLocationOnStart = async () => {
      // Ждем инициализации перед запросом
      if (isInitialized) {
        try {
          console.log('Requesting location on start');
          await requestLocation();
        } catch (e) {
          console.error('Failed to get location:', e);
        }
      }
    };

    requestLocationOnStart();
  }, [isInitialized]);

// Добавляем логи для отладки состояния
  useEffect(() => {
    console.log('Location state:', {
      webLocation,
      error,
      isLoading,
      isInitialized
    });
  }, [webLocation, error, isLoading, isInitialized]);


  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);


  return (
    <Suspense fallback={<></>}>

    <AppRoot
      appearance={miniApp?.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <LoadingProvider>

        <Routes>
          <Route path="/subscription" element={<SubscriptionFlow />} />
          <Route  path={'/'} element={<NavBarLayout/>}>
            <Route index element={<MainPage />} >
              {/*<Route path={'establishments/selection'} element={<Selection/>}></Route>*/}
            </Route>
            <Route path={'events'} element={<EventsPage />} >
              {/*<Route path={'selection'} element={<Selection/>}></Route>*/}
            </Route>
            <Route path={'map'} element={<MapPage />} >
              {/*<Route path={'selection'} element={<Selection/>}></Route>*/}
            </Route>
            <Route path={'/profile'} element={<AccountLayout/>} >
              <Route index element={<AccountPage/>}></Route>
              <Route path={'favorites'} element={<Favorites/>}></Route>
              <Route path={'promocodes'} element={<Promocodes/>}></Route>
            </Route>
            {/*<Route path={'/events'} element={<MapPage />} />*/}
          </Route>
          <Route path={'selection/:type/:id'} element={<Selection/>}/>

          <Route path={'establishment'} element={<OutletLayout/>}>
            <Route path={`:id`} element={<OutletLayout/>}>
              <Route index element={<EstablishmentPageLayout><EstablishmentPage/></EstablishmentPageLayout>}/>
              <Route path={'book'} element={<EstablishmentWithIdLayout/>}>
                <Route index element={<BookEstablishment type={'establishment'}/>}/>
                <Route  element={<WithBookDetail><AvailableTables/></WithBookDetail>} path={'tables'}/>
                <Route path={`info`} element={<WithBookDetail><BookInfo type={'establishment'}/></WithBookDetail>}/>
                <Route path={'tables/:tableId'} element={<WithBookDetail><CreateBook type={'establishment'}/></WithBookDetail>}/>
              </Route>
            </Route>
          </Route>
          <Route path={'events'} element={<OutletLayout/>}>
            <Route path={`:id`} element={<OutletLayout/>}>
              <Route index element={<EstablishmentPageLayout><EventPage/></EstablishmentPageLayout>}/>
              <Route path={'book'} element={<OutletLayout/>}>
                <Route index element={<BookEstablishment type={'events'}/>}/>
                <Route path={`info`} element={<BookInfo type={'events'}/>}/>
              </Route>
              <Route path={'contacts'} element={<CreateBook type={'events'} />}/>
            </Route>
          </Route>



          {/*<Route path={'*'} element={<Navigate to={'/'} />} />*/}
        </Routes>
      </LoadingProvider>
    </AppRoot>
    </Suspense>

  );
}

export default App;
