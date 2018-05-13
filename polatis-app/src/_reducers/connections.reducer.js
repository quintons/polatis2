import {connectionsConstants} from "constants/connections.constants";
import {userConstants} from "constants/user.constants";

const initialState = {
    fetching: false,
    fetched: false,
    error: {},
    data: []
};

/**
 * connections reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function connections(state = initialState, action){
    let connections;
    connections = (state.data) ? state.data : [];

    switch(action.type){
        case connectionsConstants.CONNECTIONS_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                data: connections
            };
        case connectionsConstants.CONNECTIONS_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.connections
            };
        case connectionsConstants.CONNECTIONS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case connectionsConstants.CONNECTIONS_CACHE:
            return {
                ...state,
                fetched: true,
                fetching: false,
                data: connections
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}