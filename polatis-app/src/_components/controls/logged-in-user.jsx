/**
 * @fileoverview shows the logged in user detail at the top left of the browser window
 */

import React, { Component } from 'react';
import FormattedMessageNoTag from '../controls/formatted-message-notag'

class LoggedInUser extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { username } = this.props;

        if (username && username.length > 0) {
            return (
                <span><FormattedMessageNoTag id="polatis.manage-switches.logged-in-user.logged-in-user" />: {username}</span>
            );
        } else {
            return (<span/>)
        }
    }

}

export default LoggedInUser;


