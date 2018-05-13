
import constants from "constants";

const initialState = {};

/**
 * example of a basic reducer
 * @param state
 * @param action
 * @returns {*}
 */
export function reducer(state = initialState, action){
    switch(action.type){
        case constants.TYPE_REQUEST:
            return {
                ...state,
                addedState: true,
                user: action.data
            };
        case constants.TYPE_SUCCESS:
            return {
                addedState: true,
                user: action.data
            };
        case constants.TYPE_FAILURE:
            return {
                addedState: false,
                error: action.error
            };
        default:
            return state;
    }
}