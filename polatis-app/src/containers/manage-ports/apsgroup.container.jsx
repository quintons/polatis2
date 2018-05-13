import React, { Component } from 'react';
import { connect } from 'react-redux';

class APSGroupHomePage extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                APS Group
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        ...state
    };
}

export default connect(mapStateToProps)(APSGroupHomePage);