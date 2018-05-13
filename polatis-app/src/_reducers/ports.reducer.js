import { userConstants } from "constants/user.constants";
import { portsConstants } from "constants/ports.constants";

const initialState = {
    fetching: false,
    fetched: false,
    error: {},
    data: []
};

/**
 * ports reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function ports(state = initialState, action){
    let ports;
    ports = (state.data) ? state.data : [];

    switch(action.type){
        case portsConstants.PORTS_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                data: ports
            };
        case portsConstants.PORTS_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.ports
            };
        case portsConstants.PORTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case portsConstants.PORTS_CACHE:
            return {
                ...state,
                fetched: true,
                fetching: false,
                data: ports
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}