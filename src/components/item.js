import '../scss/item.scss';
import React, { Component, PropTypes } from 'react';


export default class Item extends Component {
    render() {
        const width = this.props.width,
              height = this.props.height;

        const imageUrl = 'http://lorempixel.com/' + width + '/' + height + '/fashion/' +
                         '?_r=' + Math.random();

        return (
            <div className="item" style={{display: 'inline-block'}}>
                <img src={imageUrl}
                     className="item-image"
                     style={{
                        width: width + 'px',
                        height: height + 'px'
                     }}/>
                <div className="item-info">
                    <span className="item-info-id">#{this.props.item.id}</span>
                    <span className="item-info-title">{this.props.item.title}</span>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired
};

Item.defaultProps = {
    width: 200,
    height: 200
};
