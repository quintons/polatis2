
/**
 * @fileoverview combines all the reducers together as one single store/object
 */

import { combineReducers } from 'redux';
import {routerReducer} from "react-router-redux";

import { authentication } from "./authentication.reducer";
import { ports } from './ports.reducer';
import { users, userDataChange } from './users.reducer';
import { sessions, sessionDataChange } from './sessions.reducer';
import { connections } from './connections.reducer';
import { productInfo } from './system.reducer';
import { uiMessage, uiGeneral, uiManageSubswitches, uiMSViewPortsMessages, uiMSViewUserManagementMessages } from './ui.reducer';

const rootReducer = combineReducers({
    routerReducer,

    /* all general (custom) reducers */
    authentication,
    ports,
    users,
    userDataChange,
    sessions,
    sessionDataChange,
    connections,
    productInfo,

    /* all UI (custom) reducers */
    uiMessage,
    uiGeneral,
    uiManageSubswitches,
    uiMSViewPortsMessages,
    uiMSViewUserManagementMessages
});

// const rootReducer = (state, action) => {
//     // if (action.type === 'USERS_LOGOUT_REQUEST') {
//     //     state = undefined;
//     // }
//     return appReducer(state, action);
// };

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
// redux-persist usage
// const rootReducer = (state, action) => {
//     if (action.type === SIGNOUT_REQUEST) {
//         Object.keys(state).forEach(key => {
//             storage.removeItem(`persist:${key}`);
//         });
//         state = undefined;
//     }
//     return AppReducers(state, action);
// };

export default rootReducer;