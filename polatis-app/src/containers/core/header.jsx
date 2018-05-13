
import React, {Component} from 'react';
import { connect } from 'react-redux';

import { userActions } from "actions/user.actions";
import { uiActions } from "actions/ui.actions";
import { systemActions } from "actions/system.actions";
import { lib } from 'utils/lib';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import HeaderDropDown from 'components/controls/header/header-dropdown';
import ProductInfo from 'components/controls/header/product-info';


class Header extends Component
{
    constructor(props){
        super(props);

        this.state = {
            showAboutModal: false
        };

        this.handleAboutModalClose = this.handleAboutModalClose.bind(this);
        this.handleAboutModalShow = this.handleAboutModalShow.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(systemActions.fetchProductInfo());
        dispatch(uiActions.setMessage('Hello this is a message.'));
    }

    handleLogout(){
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    handleAboutModalClose() {
        this.setState({ showAboutModal: false });
    }

    handleAboutModalShow() {
        this.setState({ showAboutModal: true });
    }

    render()
    {
        const isVisible = lib.session.isLoggedIn();
        // TODO: fetch from logged in session if user logged in is an Administrator
        const isLoggedInAsAdmin = true; // ui.session.isLoggedInAsAdmin()
        const { fetching, fetched, error } = this.props.productInfo;

        if (fetching) {
            return (
                <header className={"header"}>
                    <div className={"header__logo"}>
                        <img src="/static/images/logo/logo-star.svg" width="80" className={"logo__icon"}/>
                        <img src="/static/images/logo/logo-text.png" width="110" className={"logo__text"} />
                    </div>
                </header>
            );
        } else if (fetched || error) {

            const productInfo = this.props.productInfo;

            return (
                <header className={"header"}>
                    <div className={"header__logo"}>
                        <img src="/static/images/logo/logo-star.svg" width="80" className={"logo__icon"}/>
                        <img src="/static/images/logo/logo-text.png" width="110" className={"logo__text"} />
                    </div>


                    {isVisible ? (
                        <div className={"header__menu"}>
                            <HeaderDropDown productInfo={productInfo} hideAboutModal={productInfo.data === null} showAboutModal={this.state.showAboutModal} handleAboutModalClose={this.handleAboutModalClose} onLogout={() => { this.handleLogout(); }} onModalShow={() => { this.handleAboutModalShow(); }} isLoggedInAsAdmin={isLoggedInAsAdmin}  />
                        </div>) : (
                        <div/>
                    )}
                    {productInfo ? <ProductInfo productInfo={productInfo} /> : <div />}

                </header>
            );
        } else {
            return (<div />)
        }
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Header);