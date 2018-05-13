/**
 * @fileoverview error boundary component, shows generic UI error if error occurs
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import { uiGeneralConstants } from "constants/ui.constants";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // record error?
        console.group('Polatis app: error boundary');
        console.log('--error--');
        console.error(error);
        if (info && info.componentStack) {

            console.log('--componentStack--');
            console.log(info.componentStack);

        } else if (info) {

            console.log('--info--');
            console.log(info);

        }
        console.groupEnd();

        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {

            const { size} = this.props;
            let typeClass = "error";

            if (size) {
                if (size === uiGeneralConstants.SMALL) { typeClass = "error error--small" }
                if (size === uiGeneralConstants.XSMALL) { typeClass = "error error--xsmall" }
            }

            return (
                <div className={typeClass}>
                    <span className={"error__icon icon-exclamation"}></span>
                    <p className={"error__text"}><FormattedMessageNoTag id={"polatis.error-boundary.errormessage.fatalerror"} /></p>
                </div>
            )
        }
        return this.props.children;
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default connect(mapStateToProps)(ErrorBoundary);