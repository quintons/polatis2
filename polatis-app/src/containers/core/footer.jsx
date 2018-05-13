
import React, {Component} from 'react';


class Footer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { message, offlineText } = this.props;

        return (
            <div>
                <span className={"footer__text"}>{message}</span>
                {offlineText && <span>{offlineText}</span>}
            </div>
        )
    }

}

export default Footer;