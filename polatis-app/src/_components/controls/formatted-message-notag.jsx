/**
 * @fileoverview using FormattedMessage component, it removes the default <span /> element and returns only the text
 *  using the passed in id as a reference to the message store.
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { lib } from 'utils/lib';


class FormattedMessageNoTag extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        const { id } = this.props;
        const query = lib._showFormattedMessages();
        if (query.showLang) {
            return (
                <span>[--<FormattedMessage id={id} children={(message) => message} {...this.props} />--]</span>
            )
        } else if (query.showId) {
            return (
                <span>[--{id}--]</span>
            )
        } else {
            return (
                <FormattedMessage id={id} children={(message) => message} {...this.props} />
            )
        }
    }
}

export default FormattedMessageNoTag;