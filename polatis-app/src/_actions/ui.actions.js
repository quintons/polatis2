/**
 * @fileoverview list of ui specific actions used in sections of the app
 */

import { uiGeneralConstants, uiMessageConstants } from "constants/ui.constants";
import {ui} from "utils/ui";

// exported methods used for the uiAction requests
export const uiActions = {
    // Port management actions
    setMessage,
    registerLeftPaneTab,
    toggleHeader,
    toggleLeftPane,
    resizePortsContainers,
    resizeAdminContainers,
    showPortDetail,
    showConnectionDetail,
    showAPSDetail,

    // user actions
    showNewUserView,
    hideUserView,
    showCurrentUserView,
    showEditSessionsView,
    cancelUserAction,

    // password actions
};

/**
 * toggles the header and dispatches an action to track the UI state of open/close
 * @returns {Function}
 */
function toggleHeader () {
    return (dispatch, getState) => {
        ui.global.openCloseHeaderPanel();
        (getState().uiGeneral.headerOpen) ? dispatch({ type: uiGeneralConstants.HEADER_CLOSE }) : dispatch({ type: uiGeneralConstants.HEADER_OPEN });
    }
}

/**
 * toggles the left pane to be visible or not
 * @param toggleType
 * @returns {Function}
 */
function toggleLeftPane (toggleType) {
    return (dispatch) => { dispatch({ type: toggleType }) }
}

/**
 * Resize all UI containers for the ports management - toggles scroll bars correctly
 * @returns {function(*, *)}
 */
function resizePortsContainers () {
    return (dispatch, getState) => {
        if (getState().uiManageSubswitches && getState().uiManageSubswitches.tabDetailShow) {
            ui.resizeContentHeight('js-detail-tab', ['js-primary-tabs', 'login-detail']);
        } else {
            ui.resizeContentHeight('js-simple-search-tab', ['js-primary-tabs', 'js-simple-custom-tabs', 'login-detail']);
        }
        ui.resizeContentHeight('content', ['js-submenu']);
    }
}

/**
 * Resize all UI containers for the user management section - toggles scroll bars correctly
 * @returns {function(*, *)}
 */
function resizeAdminContainers () {
    return () => { ui.resizeContentHeight('js-admin-content', []); }
}

/**
 * dispatch a UI message to show the port detail tab
 * @param data
 * @returns {function(*)}
 */
function showPortDetail (data) {
    return (dispatch) => { dispatch({ type: uiMessageConstants.PORTS_DETAIL_VIEW, payload: data }) };
}

/**
 * dispatch a UI message to show the simple search tab
 * @param data
 * @returns {function(*)}
 */
function showPortSimpleSearch (data) {
    return (dispatch) => {
        dispatch({ type: uiMessageConstants.PORTS_SIMPLESEARCH_VIEW, payload: data })
    };
}

/**
 * dispatch a UI message to show the port custom search tab
 * @param data
 * @returns {function(*)}
 */
function showPortCustomSearch (data) {
    return (dispatch) => {
        dispatch({ type: uiMessageConstants.PORTS_CUSTOMSEARCH_VIEW, payload: data })
    };
}

/**
 * dispatch a UI message to show the connection detail tab
 * @param data
 * @returns {function(*)}
 */
function showConnectionDetail (data) {
    return (dispatch) => {
        dispatch({ type: uiMessageConstants.CONNECTIONS_DETAIL_VIEW, payload: data })
    };
}

/**
 *
 * @param dispatch a UI message to show the connection simple search tab
 * @returns {function(*)}
 */
function showConnectionSimpleSearch (data) {
    return (dispatch) => {
        dispatch({ type: uiMessageConstants.CONNECTIONS_SIMPLESEARCH_VIEW, payload: data })
    };
}

/**
 * dispatch a UI message to show the connection custom search
 * @param data
 * @returns {function(*)}
 */
function showConnectionCustomSearch (data) {
    return (dispatch) => { dispatch({ type: uiMessageConstants.CONNECTIONS_CUSTOMSEARCH_VIEW, payload: data }) };
}

/**
 * dispatch a UI message to show the APS detail tab
 * @param data
 * @returns {function(*)}
 */
function showAPSDetail (data) {
    return (dispatch) => { dispatch({ type: uiMessageConstants.CONNECTIONS_DETAIL_VIEW, payload: data }) };
}

/**
 * bootstrap deals with the UI functionality/behaviour, this logic registers which tab is visible in the browser
 * @param tabType passed uiManageSwitchesConstants type
 * @returns {function(*)}
 */
function registerLeftPaneTab (tabType) {
    return (dispatch) => { dispatch({type: tabType}) }
}

/**
 * dispatch a UI message to show a string/message on the footer
 * @string message
 * @returns {{type: string, message: *}}
 */
function setMessage (message) {
    return { type: uiMessageConstants.FOOTER_MESSAGE_CHANGE, message }
}

// User Management

/**
 * dispatch a UI message to show the new user view - clicking on the 'New User' button
 * @returns {Function}
 */
function showNewUserView () {
    return (dispatch) => { dispatch({ type: uiMessageConstants.MANAGEUSERS_NEWUSER_VIEW }) };
}

/**
 * dispatch a UI message to hide the new user view
 */
function hideUserView () {
    return (dispatch) => { dispatch({ type: uiMessageConstants.MANAGEUSERS_HIDEUSER_VIEW }) };
}

/**
 * dispatch a UI message to show current user view - clicking onto a username in the users component
 */
function showCurrentUserView (username) {
    return (dispatch) => { dispatch({ type: uiMessageConstants.MANAGEUSERS_CURRENTUSER_VIEW, payload: username }) };
}

/**
 * dispatch a UI message to show the list of sessions for a user
 */
function showEditSessionsView (permissionType) {
    return (dispatch) => { dispatch({ type: uiMessageConstants.MANAGEUSERS_EDITSESSIONS_VIEW, payload: permissionType }) };
}

/**
 * dispatch a UI message to cancel and hide the user detail
 */
function cancelUserAction () {
    return (dispatch) => { dispatch({ type: uiMessageConstants.MANAGEUSERS_CANCELUSER_ACTION }) };
}