/**
 * @fileoverview the starting point of the app
 */

// cAF and rAF polyfills
import 'raf/polyfill';
import 'classlist-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl';
import { withRouter } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import App from './containers/app';
import projectConfig from 'config/project.config';
import { store, history } from "utils/store";


/**
 * global internationalisation
 */
if(!global.Intl) {
    import('intl');
    import(`intl/locale-data/jsonp/${projectConfig.lang}.js`)
}

import(`react-intl/locale-data/${projectConfig.lang}`).then((lang) => { addLocaleData([...lang]); }).catch(err => {
    console.error(`unable to import local data: react-intl/locale-data/${projectConfig.lang}`)
});
import(`../messages/${projectConfig.lang}.json`).then((localData) => { RenderApp(localData); }).catch(err => {
    console.error(`unable to import message store data: ${projectConfig.lang}.json` )
});

// wrapping the router around the APP object
const WrappedApp = withRouter(App);

const RenderApp = localData => {
    render (
        <Provider store={store}>
            { /* ConnectedRouter will use the store from Provider automatically */ }
            <IntlProvider locale={projectConfig.lang} messages={localData}>
                <ConnectedRouter history={history}>
                    <WrappedApp />
                </ConnectedRouter>
            </IntlProvider>
        </Provider>,
        document.querySelector('.root')
    )
};

//global.requestAnimationFrame = function(callback) { setTimeout(callback, 0); };