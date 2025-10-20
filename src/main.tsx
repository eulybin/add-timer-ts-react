import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TimersProvider } from './store/timers-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TimersProvider>
            <App />
        </TimersProvider>
    </React.StrictMode>
);
