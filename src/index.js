import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

import { TranslateProvider } from 'translate-components'
import translations from './translations.json'



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <TranslateProvider translations={translations} defaultLanguage={'he'}>
      <App />
    </TranslateProvider>
  </Provider>,
  document.querySelector("#root")
);
