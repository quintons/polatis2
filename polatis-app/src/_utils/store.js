/**
 * @fileOverview used for the store object
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import projectConfig from 'config/project.config';
import rootReducer from '_reducers';

export const history = createHistory();

/**
 * setting up the middleware array
 * @type {Array}
 */
const middleware = [];
middleware.push(thunk);
middleware.push(routerMiddleware(history));

if(projectConfig.env === 'development'){
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

/**
 * exports store object
 * @type {Store<any>}
 */
export const store = createStore(rootReducer, applyMiddleware(...middleware));