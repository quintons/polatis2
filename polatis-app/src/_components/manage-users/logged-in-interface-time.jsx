/**
 * @fileoverview plots the local time format for both web and other interface time in hours/mins
 */

import React, { Component } from 'react';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';

class LoggedInInterfaceTime extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        const { webHours, webMinutes, otherHours, otherMinutes } = this.props;

        if (webHours >= 0 && webMinutes >= 0 && otherHours >= 0 && otherMinutes >= 0) {
            return (
                <div className={"time-list"}>
                    <p><FormattedMessageNoTag id={"polatis.user-management.change-password.logged-through-web-interface"}/></p>
                    <ul className={"time-list__items styled-list"}>
                        <li className={"time-list__item"}>
                            <p>
                                <FormattedMessageNoTag
                                    id={"polatis.user-management.change-password.web-interface-for"}/>&nbsp;
                                <FormattedMessageNoTag id={"polatis.user-management.change-password.time-count"}
                                                  values={{durationHours: webHours, durationMinutes: webMinutes}}/>
                            </p>
                        </li>
                        <li className={"time-list__item"}>
                            <p>
                                <FormattedMessageNoTag
                                    id={"polatis.user-management.change-password.other-interface-for"}/>&nbsp;
                                <FormattedMessageNoTag id={"polatis.user-management.change-password.time-count"}
                                                       values={{durationHours: otherHours, durationMinutes: otherMinutes}}/>
                            </p>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>&nbsp;</div>
            )
        }
    }
}

export default LoggedInInterfaceTime;