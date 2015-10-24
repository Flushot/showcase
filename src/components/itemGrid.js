import '../scss/itemGrid.scss';

import React, { Component, PropTypes } from 'react';

import Item from './item';


export default class ItemGrid extends Component {
    render() {
        console.log(this.props);
        const itemGrid = this;
        return (
            <div className="item-grid">
                <div className="item-grid-title">
                    {this.props.title} ({this.props.items.length})
                </div>
                <div className="item-grid-items">
                    {this.props.items.map(function(item) {
                        return <Item key={item.id}
                                     item={item}
                                     isSelected={itemGrid.props.selectedItemId == item.id}
                                     onClick={e => itemGrid.props.onItemSelected(item.id)}/>;
                    })}
                </div>
            </div>
        );
    }
}

ItemGrid.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    selectedItemId: PropTypes.number,
    onItemSelected: PropTypes.func.isRequired
};

ItemGrid.defaultProps = {
    title: 'Item Grid',
    items: [],
    selectedItemId: null
};
