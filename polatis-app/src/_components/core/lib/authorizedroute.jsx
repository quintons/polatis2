/**
 * @fileoverview used for router to decide if logged in and en-wrapping the use of error boundaries
 */

import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import ErrorBoundary from 'components/core/lib/error-boundary';
import { uiActions } from "actions/ui.actions";

class AuthorizedRoute extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(uiActions.setMessage(''));
    }

    render() {
        const { component: Component, pending, loggedIn, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                if (pending) return <div>Loading...</div>
                return loggedIn
                    ? <ErrorBoundary><Component {...props} /></ErrorBoundary>
                    : <Redirect to="/login" />
            }} />
        )
    }
}

function mapStateToProps(state){
    return {
        pending: false,
        loggedIn: state.authentication.loggedIn
    }
}

export default connect(mapStateToProps)(AuthorizedRoute)