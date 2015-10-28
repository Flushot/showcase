import '../styles/app.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Badge, Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem, Glyphicon,
         Grid, Row, Col, Panel, Modal, Button, ProgressBar } from 'react-bootstrap';
import io from 'socket.io-client';

import * as Actions from '../actions';
import * as Utils from '../utils';

import Menu from './menu';
import ItemGrid from './itemGrid';
import Doge from './doge';
import SettingsDialog from './settingsDialog';
import LikedItemsDialog from './likedItemsDialog';


console.log('Init socket.io...');
const socket = io(`${location.protocol}//${location.hostname}:8888`);
socket.on('pong', function(data) {
    console.log('PONG! %o', data);
});
socket.emit('ping', {});


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.startRefreshingItems());
    }

    render() {
        const { dispatch } = this.props,
              actions = bindActionCreators(Actions, dispatch),
              selectedItemId = this.props.state.get('selectedItemId'),
              itemProps = {
                  likedItemIds: this.props.state.get('likedItemIds'),
                  hatedItemIds: this.props.state.get('hatedItemIds'),
                  selectedItemId: selectedItemId,
              },
              itemEvents = {
                  onItemSelected: itemId => actions.selectItem(itemId),
                  onItemLiked: itemId => actions.likeItem(itemId),
                  onItemHated: itemId => actions.hateItem(itemId),
                  onClearRating: itemId => actions.clearRating(itemId)
              };

        return (
            <div>
                <Menu actions={actions}
                      settings={this.props.state.get('settings')}
                      likedItemIds={this.props.state.get('likedItemIds')}/>

                <Grid style={{width: '90%'}}>
                    <Row className="show-grid">
                        <Col md={12} lg={12} sm={12} xs={12}>
                            <Panel header="Like-o-Meter">
                                <ProgressBar>
                                    <ProgressBar bsStyle="success" now={this.getPercentLikedItems()}/>
                                    <ProgressBar bsStyle="danger" now={this.getPercentHatedItems()}/>
                                </ProgressBar>
                                <Doge isVisible={this.getPercentHatedItems() > 0 && this.getPercentLikedItems() === 0}/>
                            </Panel>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={6} lg={6} sm={12} xs={12}>
                            <ItemGrid title="All Items"
                                      items={this.props.state.get('items')}
                                      isRefreshing={this.props.state.get('refreshingItems')}
                                      showControls={true}
                                      {...itemProps}
                                      {...itemEvents}/>
                        </Col>
                        {selectedItemId ? (
                            <Col md={3} lg={3} sm={12} xs={12}>
                                <Panel header={<span>Selected Item</span>}>
                                    <div className="selected-item">
                                        <div className="selected-item-title">
                                            <strong>{this.getSelectedItem().title}</strong>
                                            <p>{this.getSelectedItem().description}</p>
                                        </div>
                                        <div className="selected-item-image">
                                            <img src={this.getSelectedItem().url} style={{maxWidth: '230px'}}/>
                                        </div>
                                    </div>
                                </Panel>
                            </Col>
                        ) : ''}
                        <Col md={selectedItemId ? 3 : 6} lg={selectedItemId ? 3 : 6} sm={12} xs={12}>
                            <ItemGrid title="My Liked Items"
                                      items={this.props.state.get('items').filter(item => this.props.state.get('likedItemIds').has(item.id))}
                                      isRefreshing={this.props.state.get('refreshingItems')}
                                      showControls={false}
                                      {...itemProps}
                                      {...itemEvents}/>
                        </Col>
                    </Row>
                </Grid>
                {this.props.state.get('editingSettings') ? (
                    <SettingsDialog settings={this.props.state.get('settings')}
                                    onSave={newSettings => actions.saveSettings(newSettings)}
                                    onCancel={() => actions.cancelSettings()}/>
                ) : ''}
                {this.props.state.get('showLikesDialog') ? (
                    <LikedItemsDialog onClose={() => actions.closeLikesDialog()}
                                      items={this.props.state.get('items').filter(item => this.props.state.get('likedItemIds').has(item.id))}
                                      {...itemEvents}/>
                ) : ''}
            </div>
        );
    }

    getSelectedItem() {
        const selectedItemId = this.props.state.get('selectedItemId'),
              matches = this.props.state.get('items').filter(item => item.id === selectedItemId);

        if (matches.count() > 0)
            return matches.first();
    }

    getTotalItems() {
        return this.props.state.get('items').count();
    }

    getPercentLikedItems() {
        return this.props.state.get('likedItemIds').count() / (this.getTotalItems() / 100);
    }

    getPercentHatedItems() {
        return this.props.state.get('hatedItemIds').count() / (this.getTotalItems() / 100);
    }
}


function mapStateToProps(state) {
    return {
        state
    };
}


export default connect(mapStateToProps)(App);
