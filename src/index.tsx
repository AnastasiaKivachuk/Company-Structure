import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import MainPage from '@modules/MainPage/mainPage';
import store from '@redux/store';
import './index.css';
import Layout from '@modules/Layout/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <MainPage />
      </Layout>
    </Provider>
  </React.StrictMode>,
);
