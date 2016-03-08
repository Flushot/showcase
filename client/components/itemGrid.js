import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Panel, Badge, ProgressBar } from 'react-bootstrap';
import _ from 'lodash';

import '../styles/itemGrid.scss';
import Item from './item';


export default class ItemGrid extends Component {
    static mixins = [
        PureRenderMixin
    ]

    static propTypes = {
        title: PropTypes.string,
        // items: ImmutablePropTypes.list,
        emptyMessage: PropTypes.string,
        selectedItemId: PropTypes.string,
        showControls: PropTypes.bool,
        isRefreshing: PropTypes.bool,
        // likedItemIds: ImmutablePropTypes.set,
        // hatedItemIds: ImmutablePropTypes.set,
        onItemSelected: PropTypes.func.isRequired,
        onItemLiked: PropTypes.func.isRequired,
        onItemHated: PropTypes.func.isRequired,
        onClearRating: PropTypes.func.isRequired
    }

    static defaultProps = {
        title: null,
        items: [],
        emptyMessage: 'Nothing here.',
        selectedItemId: null,
        showControls: true,
        isRefreshing: false,
        likedItemIds: [],
        hatedItemIds: []
    }

    render() {
        const itemGrid = this;
        return (
            <Panel className="item-grid" 
                   onClick={e => itemGrid.props.onItemSelected(null)}
                   header={this.getTitle()}>

                {this.props.isRefreshing ? (
                    <ProgressBar bsStyle="info" now={100} active striped/>
                ) : (
                    this.props.items.length > 0 ? (
                        this.props.items.map(function(item) {
                            return <Item key={item.id}
                                         item={item}
                                         showControls={itemGrid.props.showControls}
                                         isLiked={itemGrid.props.likedItemIds.find(id => id === item.id) !== undefined}
                                         isHated={itemGrid.props.hatedItemIds.find(id => id === item.id) !== undefined}
                                         isSelected={itemGrid.props.selectedItemId === item.id}
                                         onClick={e => itemGrid.handleSelection(e, item.id)}
                                         onLiked={e => itemGrid.props.onItemLiked(item.id)}
                                         onHated={e => itemGrid.props.onItemHated(item.id)}
                                         onClearRating={e => itemGrid.props.onClearRating(item.id)}/>;
                        })
                    ) : (
                        <span className="item-grid-empty">{this.props.emptyMessage}</span>
                    )
                )}

            </Panel>
        );
    }

    handleSelection(e, itemId) {
        e.stopPropagation();
        this.props.onItemSelected(itemId);
    }

    getTitle() {
        var title = [];

        if (this.props.title) {
            title.push(<span key="a">{this.props.title}</span>);
            if (this.props.items.length > 0) {
                title.push(<Badge key="b" style={{marginLeft: '5px'}}>{this.props.items.length}</Badge>);
            }
        }

        if (title.length > 0)
            return <div>{title}</div>;
        else
            return '';
    }
}
