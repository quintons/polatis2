
import React, {Component} from 'react';
import { actions } from 'action';

class ChildComponent extends Component {
    constructor(props){
        super(props);
    }

    _handleMyClick(data) {
        const { dispatch } = this.props;
        dispatch(actions.actionMethod(data));
    }

    render() {
        const { propertyName, stateChangeMe } = this.props;

        return (
            <div className={"parent"}>
                {propertyName && <span className={"parent__child"} onClick={() => { this._handleMyClick(propertyName) }}>{propertyName}</span>}
                {stateChangeMe && <div>{stateChangeMe}</div>}
            </div>
        )
    }
}

export default ChildComponent;