import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Connections from "components/manage-switches/content-pane/connections";
import { connectionsActions } from 'actions/connections.actions';
import Spinner from 'components/controls/spinner'
import FormattedMessageNoTag from "components/controls/formatted-message-notag";
import { uiActions } from "actions/ui.actions";
import {uiGeneralConstants} from "constants/ui.constants";


class ConnectionsContainer extends Component {

    constructor(props){
        super(props);

        this.handleConnectionClick = this.handleConnectionClick.bind(this);
    }

    handleConnectionClick (data, e) {
        const { dispatch } = this.props;
        dispatch(uiActions.showConnectionDetail(data));
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(connectionsActions.fetchConnections());
    }

    connectionLogic (data, e, selection) {

    }

    handleOnConnectionTouchStart () {
        console.log('touch start')
    }

    handleOnConnectionMouseEnter () {
        console.log('mouse enter')
    }

    handleOnConnectionMouseLeave () {
        console.log('mouse leave')
    }

    render() {
        const { fetching, fetched } = this.props;

        if(fetching){
            return (<Spinner type={uiGeneralConstants.SPINNER_PROGRESS} size={uiGeneralConstants.SMALL} speed={1.1} iconClass={""} containerClass={""} loadingMessage={<FormattedMessageNoTag id="polatis.connections.spinner.loadingMessage" />} />)
        }else if (fetched){

            const connections = this.props.connections;

            if (this.props.connections) {
                return ( <Connections type={this.props.type} connections={connections} onClick={this.handleConnectionClick} /> )
            } else {
                return ( <div>No Connections found</div> )
            }

        }else {
            return (
                <div />
            )
        }
    }
}

ConnectionsContainer.propTypes = {
    connections: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    const { data } = (state.connections.data === null) ? [] : state.connections;
    return {
        ...state,
        connections: data,
        fetching: state.connections.fetching,
        fetched: state.connections.fetched
    };
}

export default connect(mapStateToProps)(ConnectionsContainer);