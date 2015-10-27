import '../styles/app.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrievePath, retrieveValue } from 'redux-falcor';
import _ from 'lodash';
import { Badge, Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem, Glyphicon,
         Grid, Row, Col, Panel, Modal, Button, ProgressBar } from 'react-bootstrap';

import * as Actions from '../actions';
import * as Utils from '../utils';
import ItemGrid from './itemGrid';
import SettingsDialog from './settingsDialog';
import LikedItemsDialog from './likedItemsDialog';


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(retrievePath('items[0..9]["title","id"]'));
    }

    render() {
        const { dispatch } = this.props;
        const actions = bindActionCreators(Actions, dispatch);
        const itemProps = {
            likedItemIds: this.props.local.get('likedItemIds'),
            hatedItemIds: this.props.local.get('hatedItemIds'),
            selectedItemId: this.props.local.get('selectedItemId'),
            onItemSelected: itemId => actions.selectItem(itemId),
            onItemLiked: itemId => actions.likeItem(itemId),
            onItemHated: itemId => actions.hateItem(itemId),
            onClearRating: itemId => actions.clearRating(itemId)
        }

        return (
            <div>
                <Navbar inverse toggleNavKey={0}>
                    <NavBrand><Glyphicon glyph="camera"/> Showcase</NavBrand>
                    <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                        <NavItem eventKey={1} onClick={e => actions.showLikesDialog()}>
                            <span>Liked</span>
                            {this.props.local.get('likedItemIds').count() > 0 ? (
                                <Badge style={{marginLeft: '4px'}}>{this.props.local.get('likedItemIds').count()}</Badge>
                            ) : ''}
                        </NavItem>
                        <NavItem eventKey={2} href="#" disabled>Popular</NavItem>
                        <NavDropdown eventKey={3} title="Chris Lyon" id="collapsible-navbar-dropdown">
                            <MenuItem eventKey="1" disabled>
                                <Glyphicon glyph="user"/> Profile
                            </MenuItem>
                            <MenuItem eventKey="2" onClick={e => actions.editSettings()}>
                                <Glyphicon glyph="cog"/> Settings
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4" disabled>
                                <Glyphicon glyph="off"/> Logout
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} lg={12} sm={12} xs={12}>
                            <Panel header="Like-o-Meter">
                                <ProgressBar>
                                    <ProgressBar bsStyle="success" now={this.getPercentLikedItems()}/>
                                    <ProgressBar bsStyle="danger" now={this.getPercentHatedItems()}/>
                                </ProgressBar>
                                <div className={classNames('doge', {'doge-visible': this.getPercentHatedItems() > 0 && this.getPercentLikedItems() === 0})}>
                                    <div>WOW!! SO HATE!!!</div>
                                    <img src="http://i.imgur.com/BKvBZbr.png" width="150"/>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12}>
                            <ItemGrid title="All Items"
                                      items={_.values(this.props.remote.items)}
                                      showControls={true}
                                      {...itemProps}/>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12}>
                            <ItemGrid title="My Liked Items"
                                      items={_.filter(this.props.remote.items,
                                                      item => this.props.local.get('likedItemIds').has(item.id))}
                                      showControls={false}
                                      {...itemProps}/>
                        </Col>
                    </Row>
                </Grid>
                {this.props.local.get('editingSettings') ? (
                    <SettingsDialog onSave={newSettings => actions.saveSettings(newSettings)}
                                    onCancel={() => actions.cancelSettings()}/>
                ) : ''}
                {this.props.local.get('showLikesDialog') ? (
                    <LikedItemsDialog onClose={() => actions.closeLikesDialog()}
                                      items={this.props.remote.items}
                                      likedItemIds={this.props.local.get('likedItemIds')}
                                      onItemLiked={itemId => actions.likeItem(itemId)}
                                      onItemHated={itemId => actions.hateItem(itemId)}
                                      onClearRating={itemId => actions.clearRating(itemId)}/>
                ) : ''}
            </div>
        );
    }

    getTotalItems() {
        if (!this.props.remote.items) {
            return 0;
        }
        else {
            return Object.keys(this.props.remote.items).length;
        }
    }

    getPercentLikedItems() {
        return this.props.local.get('likedItemIds').count() / (this.getTotalItems() / 100);
    }

    getPercentHatedItems() {
        return this.props.local.get('hatedItemIds').count() / (this.getTotalItems() / 100);
    }
}


function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App);
