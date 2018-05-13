/**
 * @fileoverview Component for the Port, used within component 'Ports'
 */

import React, {Component} from 'react';

class Port extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { data, id, onClick, className = '', blockName = '' } = this.props;

        if (data && id) {
            return (
                <div
                    onClick={onClick.bind(this, data)}
                    className={blockName + "__port " + className}
                ><span className={blockName + "__port__text"}>{id}</span></div>
            )
        } else {
            return (<div />)
        }
    }
}

export default Port;