import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


export default class Doge extends Component {
    static mixins = [
        PureRenderMixin
    ]

    static propTypes = {
        isVisible: PropTypes.bool
    }

    static defaultProps = {
        isVisible: true
    }

    render() {
        return (
            <div className={classNames('doge', {'doge-visible': this.props.isVisible})}>
                <div>WOW!! SO HATE!!!</div>
                <img src="http://i.imgur.com/BKvBZbr.png" width="150"/>
            </div>
        );
    }
}
