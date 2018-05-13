/**
 * @fileoverview Spinner capable to be different sizes, and used in different locations - within a button, or not.
 */

import React, { Component } from 'react';
import { TimelineLite, CSSPlugin } from 'gsap';
import {connect} from "react-redux";
import { uiGeneralConstants } from "constants/ui.constants";


class Spinner extends Component {

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        const { speed = 1 } = this.props;
        let animation = new TimelineLite();

        animation.to(document.getElementById('js-spinner__icon'), speed, { rotation: "+=360", repeat:-1, ease: Linear.easeNone, transformOrigin:"50% 50%" })
    }

    render () {

        const { size, type, iconClass, containerClass, loadingMessage } = this.props;
        let iconClassList = "spinner__icon";
        let containerClassList = "spinner";
        let _type = type;

        if (size) {
            // custom
            if (size === uiGeneralConstants.SMALL) {
                iconClassList += " spinner__icon--small"
            }
            if (size === uiGeneralConstants.XSMALL) {
                iconClassList += " spinner__icon--xsmall"
            }
            if (size === uiGeneralConstants.LARGE) {
                iconClassList += " spinner__icon--large"
            }
        } else {
            // default
            iconClassList += " spinner__icon--small"
        }

        if (type) {
            // custom
            if (type === uiGeneralConstants.SPINNER_BUTTON) {
                iconClassList += " spinner__icon--button";
            }
            if (type === uiGeneralConstants.SPINNER_PROGRESS) {
                iconClassList += " spinner__icon--progress";
            }
        } else {
            // default
            iconClassList += " spinner__icon--progress";
            _type = uiGeneralConstants.SPINNER_PROGRESS;
        }

        iconClassList += (" " + iconClass);
        containerClassList += (" " + containerClass);

        return (
            <div className={containerClassList}>
                <span id={"js-spinner__icon"} className={iconClassList}></span>
                {loadingMessage && <span className={"spinner__text"}>{loadingMessage}</span>}
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Spinner);