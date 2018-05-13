

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import ChildComponent from 'childcomponent';
import { actions } from 'actions';
import { lib } from 'utils/lib';

class ContainerComponent extends Component {

    constructor(props){
        // must always pass props to the 'super' (top most parent)
        super(props);

        // so the library has the intl context and can be called in code.
        lib.intlContext = this.props.intl;

        // set state of a property for 'only' this components life cycle
        this.state = {
            stateProperty: 'value',
            stateMe: 'wait until I am activated'
        };

        // need to bind 'this' to the handler
        this.handleType = this.handleType.bind(this);
    }

    handleType(e) {
        // cancel default event behaviour
        e.preventDefault();
        // manipulate state
        this.setState({stateProperty: 'new value'});

        // dispatch an action
        const { dispatch } = this.props;
        dispatch(actions.actionMethods(this.state.stateProperty))
    }

    /**
     * below is the order of methods executed in a components life cycle. note the 'UNSAFE_' as these are
     * to be used in React version 17+.
     * */
    static getDerivedStateFromProps(nextProps, prevState) {}
    UNSAFE_componentWillMount() {} // <- changed from componentWillMount in version 17+
    componentDidMount() {}
    UNSAFE_componentWillReceiveProps () {} // <- changed from componentWillReceiveProps in version 17+
    shouldComponentUpdate(nextProps, nextState) {}
    UNSAFE_componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    componentWillUnmount() {}
    componentDidCatch(error, info) {}

    render() {
        // we could capture properties from a parent component, but this is a parent! :)
        const _valueToBePassed = 'foo';

        // we can set a property list here, and later use the spread operator.
        let containerProps = {
            valueToBePassed: _valueToBePassed
        };

        // you must always return a DOM container element....DIV/P/SPAN etc...
        return (
            <div className={"containerClass"}>
                <p>{this.state.stateProperty}</p> {/*this value will change as soon as you click on the button 'click me'*/}
                {/*two instances of the same component*/}
                <ChildComponent props={...containerProps} /> {/*containerProps properties passed is the same as... */}
                <ChildComponent propertyName={_valueToBePassed} stateChangeMe={this.state.stateMe} /> {/*...propertyName property value passed*/}
                {/*
                    clicking the button does the following:
                    - calls 'handleType' method on 'this' components context
                    - changes the state value on 'stateMe'
                    - redraws this component
                    - shows new value in this component
                    - sends 'stateMe' through property 'stateChangeMe' to child component 'ChildComponent'
                    - redraws child component
                */}
                <button onClick={this.handleType} className={"containerClass__testClassButton"} >click me</button>
            </div>
        );
    }
}

// maps the global state to 'this' components properties through 'this.props'
function mapStateToProps(state){
    return {
        ...state
    };
}



/**
 * note: note the following HOC (Higher Order Components) components usage...
 *  - 'connect' to connect the state to the components properties
 *  - 'injectIntl' for the internationalisation to work
 */
export default injectIntl(connect(mapStateToProps)(ContainerComponent));