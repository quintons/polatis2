
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Ports from "components/manage-switches/content-pane/ports";
import { portsActions } from 'actions/ports.actions';
import Spinner from 'components/controls/spinner'
import FormattedMessageNoTag from "components/controls/formatted-message-notag";
import { uiActions } from "actions/ui.actions";
import { uiGeneralConstants } from "constants/ui.constants";

class PortsContainer extends Component {

    constructor(props){
        super(props);

        this.setPortSelectionState();
        this.handleOnPortClick = this.handleOnPortClick.bind(this);
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(portsActions.fetchPorts());
    }

    setPortSelectionState () {
        this.portSelection = {
            portInput: {
                element: null,
                index: -1,
                type: null
            },
            portOutput: {
                element: null,
                index: -1,
                type: null
            },
            connectionDone: false,
            disconnectPortId: -1
        };
    }

    /**
     * port logic to determin if it is a disconnection, first time selection, or a connection of a port
     * @param data data passed from the handler, contains the index of the port ID
     * @param e event passed from the DOM
     * @param selection object literal containing the footer 'message', and number
     */
    portLogic (data, e, selection) {
        let element = e.target.parentElement;
        let portId = data.id;

        let portIdSelection = this.portSelection['port' + selection.type].index;
        let portIdOther = this.portSelection['port' + ((selection.type === 'Input') ? 'Output' : 'Input')].index;

        // console.log('portIdSelection...');
        // console.log(portIdSelection);

        if (portId !== portIdSelection && portIdSelection > -1) {
            // show message...
            let message = selection.message;
        } else {
            if (e.target.tagName === 'SPAN' || element.classList.contains('ports__port')) {
                //if (element.classList.contains('ports__port')) element = e.target;

                (element.classList.contains('ports__port--selected')) ? element.classList.remove('ports__port--selected') : element.classList.add('ports__port--selected');

                if (portId === portIdSelection) {
                    // reset current storage of ports
                    if(portIdOther !== -1) this.portSelection.disconnectPortId = portIdSelection;

                    this.portSelection['port' + selection.type] = {
                        index: -1,
                        element: null,
                        type: null
                    };
                } else {
                    // change current storage of ports
                    this.portSelection['port' + selection.type] = {
                        index: data.id,
                        element: element,
                        type: data.type
                    };
                }
            }
        }
    }

    clearPortsSelected () {
        if (this.portSelection) {
            if (this.portSelection.portInput && this.portSelection.portInput.element) {
                let element = this.portSelection.portInput.element;
                element.classList.remove('ports__port--selected');
            }

            if (this.portSelection.portOutput && this.portSelection.portOutput.element) {
                let element = this.portSelection.portOutput.element;
                element.classList.remove('ports__port--selected');
            }
        }
    }

    handleOnPortClick (data, e){
        const { dispatch } = this.props;

        if (this.portSelection.connectionDone) {
            // reset object
            this.clearPortsSelected();
            this.setPortSelectionState();
        }

        if (data.type === 'input') {
            this.portLogic(data, e, {
                type: 'Input',
                message: '',
            })
        }

        if (data.type === 'output') {
            this.portLogic(data, e, {
                type: 'Output',
                message: '',
            })
        }

        if (this.portSelection.portInput.index > -1 && this.portSelection.portOutput.index > -1 && !this.portSelection.connectionDone) {
            dispatch(portsActions.connectPorts(this.portSelection.portInput.index, this.portSelection.portOutput.index));
            this.portSelection.disconnectPortId = -1;
            this.portSelection.connectionDone = true;
        } else {

            if (this.portSelection.disconnectPortId > -1) {
                dispatch(portsActions.disconnectPorts(this.portSelection.disconnectPortId));
                this.portSelection.disconnectPortId = -1;
                this.portSelection.connectionDone = false;
            }
        }

        dispatch(uiActions.setMessage('Port has been clicked.'));
        dispatch(uiActions.showPortDetail({
            data: {inputId: this.portSelection.portInput.index, outputId: this.portSelection.portOutput.index}
        }));
    }

    handleOnPortTouchStart () {
        console.log('touch start')
    }

    handleOnPortMouseEnter () {
        console.log('mouse enter')
    }

    handleOnPortMouseLeave () {
        console.log('mouse leave')
    }

    render() {
        const { fetching, fetched } = this.props;

        if(fetching){
            return (<Spinner type={uiGeneralConstants.SPINNER_PROGRESS} size={uiGeneralConstants.SMALL} speed={1.1} iconClass={""} containerClass={""} loadingMessage={<FormattedMessageNoTag id="polatis.ports.spinner.loadingMessage" />} />)
        }else if (fetched){

            if (this.props.ports) {
                const ports = this.props.ports.slice(0);

                let result = this.props.productInfo['model-name'].match(/[+]?\d+/g);
                let portsOutput = ports.splice(0, result[0]);
                let portsInput = ports;

                return ( <Ports portsOutput={portsOutput} portsInput={portsInput} onClick={this.handleOnPortClick} /> )
            } else {
                return ( <div>No Ports found</div> )
            }

        }else {
            return (
                <div></div>
            )
        }
    }
}

PortsContainer.propTypes = {
    ports: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    const { data } = state.ports.data ? state.ports.data : [];
    return {
        ...state,
        productInfo: state.productInfo.data,
        ports: state.ports.data,
        fetching: state.ports.fetching,
        fetched: state.ports.fetched
    };
}

export default connect(mapStateToProps)(PortsContainer);