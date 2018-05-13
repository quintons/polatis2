/**
 * @fileOverview library of methods to
 */

import Cookies from 'js-cookie';
import { sessionConstants } from 'constants/session.constants'

const session = {
    /**
     * saves the username into the session
     * @param username
     */
    saveUsername: function (username) {
        sessionStorage.setItem(sessionConstants.USERNAME, username);
    },
    /**
     * get the username from the session
     * @returns {any} undefined if username not found in the session
     */
    getUsername: function () {
        let username = sessionStorage.getItem(sessionConstants.USERNAME);
        return (username)? username : undefined;
    },
    /**
     * get session id from the client cookie
     * @returns {*|{}}
     */
    getToken: function () {
        let token = Cookies.get(sessionConstants.SESSIONID);
        if(token && token.length > 0){
            return token;
        }else{
            // TODO: add in a dispatch to Error Action?
            return;
        }
    },
    /**
     *
     * @returns {boolean}
     */
    isLoggedIn: function() {
        let username = lib.session.getUsername();
        return !!(username && username.length > 0);
    },
    /**
     *
     * @param storageJson
     */
    saveState: function (storageJson) {
        sessionStorage.setItem(sessionConstants.STATE, JSON.stringify(storageJson));
    },

    /**
     *
     * @param context
     */
    loadState: function(context) {
        let state = sessionStorage.getItem(sessionConstants.STATE);
        if(state && state.length > 0) {
            context.setState(JSON.parse(state));
        }
    },

    /**
     *
     * @param stateName
     */
    deleteState: function (stateName) {
        sessionStorage.removeItem(sessionConstants.STATE);
    }
};

const ports = {
    /**
     * save the etag in session
     * @param etag
     */
    saveEtag: function (etag) {
        sessionStorage.setItem(sessionConstants.PORTS_ETAG, etag);
    },
    /**
     * get the etag from session
     * @returns {any} undefined if etag not found
     */
    getEtag: function () {
        let etag = ''; //sessionStorage.getItem(sessionConstants.PORTS_ETAG);
        return (etag) ? etag : undefined;
    }
};

const connections = {
    /**
     * save the etag in session
     * @param etag
     */
    saveEtag: function (etag) {
        sessionStorage.setItem(sessionConstants.CONNECTIONS_ETAG, etag);
    },
    /**
     * get the etag from session
     * @returns {any} undefined if etag not found
     */
    getEtag: function () {
        let etag = ''; //sessionStorage.getItem(sessionConstants.CONNECTIONS_ETAG);
        return (etag) ? etag : undefined;
    }
};

const users = {
    /**
     * save the etag in session
     * @param etag
     */
    saveEtag: function (etag) {
        sessionStorage.setItem(sessionConstants.USERS_ETAG, etag);
    },
    /**
     * get the etag from session
     * @returns {any} undefined if etag not found
     */
    getEtag: function () {
        let etag = sessionStorage.getItem(sessionConstants.USERS_ETAG);
        return (etag) ? etag : undefined;
    }
};

// possible etag code?
const etag = {
    _getEtagSessionData: function(type) {
        switch (type) {
            case 'connection':
                return sessionConstants.CONNECTIONS_ETAG;
            case 'port':
                return sessionConstants.PORTS_ETAG;
            case 'user':
                return sessionConstants.USERS_ETAG;
            default:
                return;
        }
    },
    /**
     * save the etag in session
     * @param etag
     */
    saveEtag: function (etag, type) {
        let etag_value = this._getEtagSessionData(type);
        if (etag_value) sessionStorage.setItem(sessionConstants.CONNECTIONS_ETAG, etag);
    },
    /**
     * get the etag from session
     * @returns {any} undefined if etag not found
     */
    getEtag: function (type) {
        let etag_value = this._getEtagSessionData(type);
        return sessionStorage.getItem(etag_value);
    }
};

export const lib = {
    intlContext: null,
    session,
    ports,
    users,
    connections,
    /**
     * returns object with 2 boolean properties:
     *      - showLang returns true if found to have 'lang' query to be 'show'
     *      - showId returns true if found to have 'lang' query to be 'id'
     * @returns {{lang: Boolean.foundLang, id: Boolean.foundId}}
     */
    _showFormattedMessages() {
        let params = window.location.search.match(/[^&?]*?=[^&?]*/);
        let { foundLang,foundId } = false;

        if(params && params.length > 0) {
            params.map((param) => {
                let p = param.split('=');
                if (p[0] === 'msg' && p[1] === 'show') {
                    foundLang = true;
                }
                if(p[0] === 'msg' && p[1] === 'id') {
                    foundId = true;
                }
            })
        }
        return { showLang: foundLang, showId: foundId };
    },
    getFormatMessage (id) {
        let context =  lib.intlContext || null;
        if (!context || context === null) {
            console.error(`did not find passed in intl object. method: getFormatMessage of id: ${id}`);
            return '[--error--]';
        }

        // found passed in intl within passed in context
        const query = lib._showFormattedMessages();
        const formattedMessage = context.formatMessage({ id: id });

        if (query.showLang) {
            return (`[--${formattedMessage}--]`)
        } else if (query.showId) {
            return (`[--${id}--]`)
        } else {
            return (`${formattedMessage}`)
        }
    }
};

// const ALARM = {
//     'ALARM_OFF_MESSAGE' : 'polatis.ports.controls-container.alarm-off',
//     'ALARM_ARMED_MESSAGE' : ''
// };
//
// const messageEnums = {
//     getAlarm : function (enum_value) {
//         switch (enum_value) {
//             case 0:
//                 return ALARM.ALARM_OFF_MESSAGE;
//             case 1:
//                 return ALARM.ALARM_ARMED_MESSAGE;
//         }
//     }
// };
//
// let message = lib.getFormatMessage(messageEnums.getAlarm(0));

