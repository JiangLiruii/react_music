import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './App';
import Reducer from './reducer';
import routes from './routes';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import registerSw from './registerServiceWorker';
// 注册offline plugin runtime
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

let store;

if (process.env.NODE_ENV === 'development') {
  const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware),
  );
  store = createStore(Reducer, enhancer);

} else {
  store = createStore(Reducer, applyMiddleware(thunkMiddleware));
}
registerSw();
ReactDOM.hydrate(
<Provider store={store}>
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
</Provider>, document.getElementById('root'));
