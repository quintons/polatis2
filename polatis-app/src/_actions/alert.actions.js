/**
 * @fileoverview alert actions used in tracking the alert state
 * @todo move to ui.actions.js file
 */

import { alertConstants } from "constants/alert.constants";

export const alertActions = {
    success,
    error,
    clear
};

function success(msg){
    return { type: alertConstants.SUCCESS, msg }
}

function error(msg){
    return { type: alertConstants.ERROR, msg }
}

function clear(){
    return { type: alertConstants.CLEAR }
}