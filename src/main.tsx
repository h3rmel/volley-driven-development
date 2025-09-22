import { createRoot } from 'react-dom/client';

import App from '@/app';

import '@/assets/main.css';

import { ThemeProvider } from '@/components/theme-provider';

import { ThemeToggle } from './components/theme-toggle';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <ThemeProvider defaultTheme="dark">
    <ThemeToggle className="absolute top-4 right-4" />
    <App />
  </ThemeProvider>,
);
