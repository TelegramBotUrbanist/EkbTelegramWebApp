import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './shared/mockEnv.ts';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Root } from './components/Root.tsx';

createRoot(document.getElementById('root')!).render(<Root />);
