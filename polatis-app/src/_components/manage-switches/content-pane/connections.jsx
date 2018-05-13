/**
 * @fileoverview right hand content pain for port management Connections sub section.
 *  the past type (grid or table) determines the view of the connections data.
 */

import React, { Component } from 'react';

import Port from '../content-pane/port';
import FormattedMessageNoTag  from 'components/controls/formatted-message-notag';

class Connections extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { connections, onClick, type } = this.props;

        if (connections && connections.length > 0) {
            if (type === 'grid') {
                return (
                    <div className={"connections"}>

                        {connections.map((connection, index) => {
                            //let enabledClass = (port['status'] === 'ENABLED') ? 'ports__port--enabled' : 'ports__port--disabled';

                            let data = {
                                ingress: connection.ingress,
                                egress: connection.egress
                            };

                            return (
                                <div className={"connections__pair"} key={index}>
                                    <Port data={data} id={data.ingress} key={data.ingress} blockName={"connections"}
                                          onClick={onClick}/>
                                    <span className={"connections__pair__line"}>&nbsp;</span>
                                    <Port data={data} id={data.egress} key={data.egress} blockName={"connections"}
                                          onClick={onClick}/>
                                </div>
                            )
                        })}
                    </div>
                )
            } else if (type === 'table') {
                return (
                    <table className={"connections--table"}>
                        <thead>
                            <tr>
                                <th className={"connections--table__heading"}><FormattedMessageNoTag id="polatis.ports.connections-container.ingress" /></th>
                                <th className={"connections--table__heading"}><FormattedMessageNoTag id="polatis.ports.connections-container.engress" /></th>
                            </tr>
                        </thead>
                        <tbody>
                        {connections.map((connection, index) => {
                            let data = {
                                ingress: connection.ingress,
                                egress: connection.egress
                            };
                            return (
                                <tr className={"connections--table__pair"}>
                                    <td><Port data={data} id={data.ingress} key={data.ingress} blockName={"connections--table"} onClick={onClick} /></td>
                                    <td><Port data={data} id={data.egress} key={data.egress} blockName={"connections--table"} onClick={onClick} /></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )
            }
        } else {
            return (<div />)
        }
    }
}

export default Connections;