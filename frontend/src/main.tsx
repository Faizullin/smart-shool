import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import router from './router/router';
import store from './redux/store/store';
import './assets/main'
import { IntlProvider } from 'react-intl';
import LangConfig from './lang/LangConfig';
import { RouterProvider } from 'react-router-dom';


const langData = new LangConfig().getLangConfig()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider 
      locale={langData.lang} defaultLocale="kk" messages={langData.messages}
       >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </IntlProvider>
  </React.StrictMode>,
)