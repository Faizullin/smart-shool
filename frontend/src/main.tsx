import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import LangConfig from "./lang/LangConfig";
import { RouterProvider } from "react-router-dom";
import store from "./core/redux/store/store";
import router from "./router/router";
import DetailModal from "./shared/components/modal/DetailModal";
import PagePreloaderLoader from "./shared/components/loader/PagePreloader";
import { ToastsProvider as BootstrapToastsProvider } from "react-bootstrap-toasts";
import "./index.scss";

import global from "global";
import * as process from "process";
global.process = process;

const langData = LangConfig.getLangConfig();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider
      locale={langData.lang}
      defaultLocale="en"
      messages={langData.messages}
    >
      <Provider store={store}>
        <React.Suspense fallback={<PagePreloaderLoader active={true} />}>
          <BootstrapToastsProvider
            toastContainerProps={{ position: "top-end", className: "p-2" }}
          >
            <RouterProvider router={router} />
          </BootstrapToastsProvider>
        </React.Suspense>
        <DetailModal />
      </Provider>
    </IntlProvider>
  </React.StrictMode>
);
