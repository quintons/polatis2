
import React, { Component } from 'react'
import { connect } from 'react-redux';

import MainRoutes from 'routes/main.routes'
import Header from './core/header';
import Footer from './core/footer';
import ErrorBoundary from 'containers/../_components/core/lib/error-boundary';

import projectConfig from 'config/project.config';
import { uiGeneralConstants } from "constants/ui.constants";


class AppContainer extends Component
{
    constructor(props){
        super(props);
    }

    getOfflineMessage () {
        return projectConfig.offline ? ' (offline) ' : '';
    }

    render()
    {
        return (
            <div className={"pol-outer-container"}>
                <ErrorBoundary size={uiGeneralConstants.SMALL}>
                    <Header />
                </ErrorBoundary>
                <div className={"pol-container"}>
                    <MainRoutes />
                </div>
                <footer className={"footer"}>
                    <ErrorBoundary size={uiGeneralConstants.XSMALL}>
                        <Footer message={this.props.footerMessage} offlineText={this.getOfflineMessage()} />
                    </ErrorBoundary>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state,
        footerMessage: state.uiMessage.data
    };
}

export default connect(mapStateToProps)(AppContainer);