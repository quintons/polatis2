import { uiGeneralConstants, uiManageSubswitchesConstants, uiMessageConstants } from "constants/ui.constants";
import {userConstants} from "constants/user.constants";

// MS = Manage Switches
// MU = Manage Users

const ManageSubswitchesInitialState = {
    tabDetailShow: false,
    tabSearchSimpleShow: true,
    tabSearchCustomShow: false
};

/**
 * ui specific left hand pane tabbing reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function uiManageSubswitches(state = ManageSubswitchesInitialState, action) {
    switch(action.type){
        case uiManageSubswitchesConstants.RESET_SUBSWITCHES_UI:
            return {
                ...state,
                tabDetailShow: false,
                tabSearchCustomShow: false,
                tabSearchSimpleShow: false
            };
        case uiManageSubswitchesConstants.TAB_DETAIL:
            return {
                ...state,
                tabDetailShow: true,
                tabSearchShow: false,
                tabSearchCustomShow: false,
                tabSearchSimpleShow: false
            };
        case uiManageSubswitchesConstants.TAB_SEARCH:
        case uiManageSubswitchesConstants.TAB_SEARCH_CUSTOM:
            return {
                ...state,
                tabDetailShow: false,
                tabSearchShow: false,
                tabSearchCustomShow: true,
                tabSearchSimpleShow: false
            };
        case uiManageSubswitchesConstants.TAB_SEARCH_SIMPLE:
            return {
                ...state,
                tabDetailShow: false,
                tabSearchShow: false,
                tabSearchCustomShow: false,
                tabSearchSimpleShow: true
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}

const GeneralInitialState = {
    navLeftOpen: true,
    headerOpen: true
};


/**
 * general ui reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function uiGeneral(state = GeneralInitialState, action) {
    switch(action.type){
        case uiGeneralConstants.RESET_GENERAL_UI:
            return {
                ...state,
                navLeftOpen: false,
                headerOpen: false
            };
        case uiGeneralConstants.NAV_LEFT_OPEN:
            return {
                ...state,
                navLeftOpen: true
            };
        case uiGeneralConstants.NAV_LEFT_CLOSE:
            return {
                ...state,
                navLeftOpen: false
            };
        case uiGeneralConstants.HEADER_OPEN:
            return {
                ...state,
                headerOpen: true
            };
        case uiGeneralConstants.HEADER_CLOSE:
            return {
                ...state,
                headerOpen: false
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}

const MSViewMessagesState = {
    data: {
        id: -1,
        viewType: ''
    }
};

/**
 * manage switches ports/connections/APS reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function uiMSViewPortsMessages(state = MSViewMessagesState, action) {
    switch (action.type) {
        case uiMessageConstants.CONNECTIONS_DETAIL_VIEW:
        case uiMessageConstants.CONNECTIONS_SIMPLESEARCH_VIEW:
        case uiMessageConstants.CONNECTIONS_CUSTOMSEARCH_VIEW:
        case uiMessageConstants.PORTS_DETAIL_VIEW:
        case uiMessageConstants.PORTS_SIMPLESEARCH_VIEW:
        case uiMessageConstants.PORTS_CUSTOMSEARCH_VIEW:
        case uiMessageConstants.APS_DETAIL_VIEW:
        case uiMessageConstants.APS_SIMPLESEARCH_VIEW:
        case uiMessageConstants.APS_CUSTOMSEARCH_VIEW:
            return {
                ...state,
                data: action.payload,
                type: action.type
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}

/**
 * manage switches reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function uiMSViewUserManagementMessages(state = {data: '', type: null}, action) {

    switch (action.type) {
        case uiMessageConstants.MANAGEUSERS_NEWUSER_VIEW:
        case uiMessageConstants.MANAGEUSERS_EDITUSER_VIEW:
        case uiMessageConstants.MANAGEUSERS_CURRENTUSER_VIEW:
        case uiMessageConstants.MANAGEUSERS_EDITSESSIONS_VIEW:

        case uiMessageConstants.MANAGEUSERS_SAVEUSER_ACTION:
        case uiMessageConstants.MANAGEUSERS_DELETEUSER_ACTION:
        case uiMessageConstants.MANAGEUSERS_CANCELUSER_ACTION:
        case uiMessageConstants.MANAGEUSERS_DELETESESSION_ACTION:
            return {
                ...state,
                data: action.payload,
                type: action.type
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}

/**
 * ui message (footer) constants reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function uiMessage(state = {message: ''}, action) {
    switch(action.type){
        case uiMessageConstants.FOOTER_MESSAGE_CHANGE:
            return {
                ...state,
                data: action.message
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}