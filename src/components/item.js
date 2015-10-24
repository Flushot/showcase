import '../scss/item.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import * as Utils from '../utils';


export default class Item extends Component {
    render() {
        const width = this.props.width,
              height = this.props.height,
              item = this.props.item;

        return (
            <div className={classNames('item', {'selected': this.props.isSelected})}
                 onClick={this.props.onClick}>

                <img src={Utils.getRandomImage(width, height, item.id)}
                     className="item-image"
                     style={{
                        width: width + 'px',
                        height: height + 'px'
                     }}/>

                <div className="item-info">
                    <span className="item-info-id">#{item.id}</span>
                    <span className="item-info-title">{item.title}</span>
                </div>

            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

Item.defaultProps = {
    width: 200,
    height: 200,
    isSelected: false
};
