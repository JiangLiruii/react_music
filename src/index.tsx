import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Reducer from './reducer';
let loggerMiddleware;
let store;
if (process.env.NODE_ENV === 'development') {
  loggerMiddleware = createLogger();
  store = createStore(Reducer, applyMiddleware(thunkMiddleware));
}
store = createStore(Reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
