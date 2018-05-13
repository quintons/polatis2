import { productInfoConstants } from "constants/system.constants";


/**
 * product information reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function productInfo(state = {data: {}}, action){

    switch(action.type){
        case productInfoConstants.PRODUCTINFO_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                data: action.productInfo
            };
        case productInfoConstants.PRODUCTINFO_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.productInfo
            };
        case productInfoConstants.PRODUCTINFO_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        default:
            return state;
    }
}