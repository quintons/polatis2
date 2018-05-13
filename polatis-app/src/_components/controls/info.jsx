/**
 * @fileoverview only shown if no connections/ports are selected in the left hand pane.
 */

import React, { Component } from 'react';

import { uiGeneralConstants } from "constants/ui.constants";


class Info extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        const { size, iconClass, containerClass, message } = this.props;
        let iconClassList = "info__icon";
        let containerClassList = "info";

        if (size) {
            // custom
            if (size === uiGeneralConstants.SMALL) {
                iconClassList += " info__icon--small"
            }
            if (size === uiGeneralConstants.XSMALL) {
                iconClassList += " info__icon--xsmall"
            }
            if (size === uiGeneralConstants.LARGE) {
                iconClassList += " info__icon--large"
            }
        } else {
            // default
            iconClassList += " info__icon--small"
        }

        iconClassList += (" " + iconClass);
        containerClassList += (" " + containerClass);

        return (
            <div className={containerClassList}>
                <span className={iconClassList}>&nbsp;</span>
                <div className={"info__text"}>{message}</div>
            </div>
        )


    }
}

export default Info;