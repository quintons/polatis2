/**
 * @fileoverview shows a list of ports using the dependency 'Port' component
 */

import React, {Component} from 'react';

import Port from '../content-pane/port';

class Ports extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { portsOutput, portsInput, onClick } = this.props;


        if ((portsInput && portsInput.length > 0) && (portsOutput && portsOutput.length > 0)) {

            return (
                <div>
                    <div className={"ports"}>
                        {portsOutput.map((port, index) => {
                            let enabledClass = (port['status'] === 'ENABLED') ? 'ports__port--enabled' : 'ports__port--disabled';

                            let data = {
                                id: port['port-id'],
                                type: 'input'
                            };

                            return (
                                <Port data={data} className={enabledClass} blockName={"ports"} key={data.id} id={data.id} onClick={onClick} />
                            )
                        })}
                    </div>
                    <div className={"ports"}>

                        {portsInput.map((port, index) => {
                            let enabledClass = (port['status'] === 'ENABLED') ? 'ports__port--enabled' : 'ports__port--disabled';

                            let data = {
                                id: port['port-id'],
                                type: 'output'
                            };

                            return (
                                <Port data={data} className={enabledClass} blockName={"ports"} key={data.id} id={data.id} onClick={onClick} />
                            )
                        })}
                    </div>
                </div>
            );
        } else {
            return (<div />)
        }
    }
}

export default Ports;