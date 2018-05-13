/**
 * @fileoverview actions specific to the system and generic across the app
 */

import { productInfoConstants, messageConstants } from "constants/system.constants";
import { systemService } from "services/system.service";

export const systemActions = {
    fetchProductInfo
};

/**
 * fetch the product info from the switch, then dispatch the status of that request
 * @returns {Function}
 */
function fetchProductInfo () {
    return (dispatch) => {
        dispatch(request());

        // if 304 unmodified response, no dispatch
        systemService.getProductInfo().then((productInfo) => {
            dispatch(success(productInfo.data));
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request() { return {type: productInfoConstants.PRODUCTINFO_REQUEST} }
    function success(productInfo) { return {type: productInfoConstants.PRODUCTINFO_SUCCESS, productInfo} }
    function failure(error) { return {type: productInfoConstants.PRODUCTINFO_FAILURE, error} }
}
