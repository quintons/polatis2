/**
 * @fileOverview main router file to sety the routes for the sections of the site
 */

import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import LoginPage from 'containers/login.page';
import ManageSubswitchesHomePage from 'containers/manage-subswitches.page';
import ManageUsersHomePage from 'containers/manage-users.page';
import MaintenancePage from 'containers/maintenance.page';
import AboutPage from 'containers/about.page';
import ChangePasswordPage from 'containers/change-password.page';

import AuthorizedRoute from 'components/core/lib/authorizedroute';

const MainRoutes = (loggedIn) => (
    <Switch>
        <Route path='/login' component={LoginPage} />
        <AuthorizedRoute path='/app/about' component={AboutPage} />
        <AuthorizedRoute path='/app/subswitches' component={ManageSubswitchesHomePage} />
        <AuthorizedRoute path='/app/users' component={ManageUsersHomePage} />
        <AuthorizedRoute path='/app/maintenance' component={MaintenancePage} />
        <AuthorizedRoute path='/app/changepassword' component={ChangePasswordPage} />
        <Redirect from="/" to="/login" />
    </Switch>
);

function mapStateToProps(state){
    const loggedIn = state.authentication.loggedIn ? true : false;
    return {
        loggedIn
    };
}

export default withRouter(connect(mapStateToProps)(MainRoutes));


