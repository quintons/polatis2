/**
 * @fileOverview system service methods
 */

import { restlib } from 'utils/restlib';

export const systemService = {
    getProductInfo
};

/**
 * get the product info
 * @returns {*}
 */
function getProductInfo(){

    return restlib.getInfo().then(productInfo => {
        return productInfo;
    })
}
