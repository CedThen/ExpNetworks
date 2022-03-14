import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EuiProvider } from '@elastic/eui'
import '@elastic/eui/dist/eui_theme_light.css';

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider colorMode='light'>
      <App />
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
