import '../styles/app.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrievePath, retrieveValue } from 'redux-falcor';
import _ from 'lodash';
import { Badge, Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem, Glyphicon,
         Grid, Row, Col, Panel, Modal, Button } from 'react-bootstrap';

import * as Actions from '../actions';
import * as Utils from '../utils';
import ItemGrid from './itemGrid';
import SettingsDialog from './settingsDialog';


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(retrievePath('items[0..4]["title","id"]'));
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
                        <NavItem eventKey={1} href="#">
                            <span>Liked</span>
                            {this.props.local.get('likedItemIds').count() > 0 ? (
                                <Badge style={{marginLeft: '4px'}}>{this.props.local.get('likedItemIds').count()}</Badge>
                            ) : ''}
                        </NavItem>
                        <NavItem eventKey={2} href="#">Popular</NavItem>
                        <NavDropdown eventKey={3} title="Chris Lyon" id="collapsible-navbar-dropdown">
                            <MenuItem eventKey="1">
                                <Glyphicon glyph="user"/> Profile
                            </MenuItem>
                            <MenuItem eventKey="2" onClick={e => actions.editSettings()}>
                                <Glyphicon glyph="cog"/> Settings
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4">
                                <Glyphicon glyph="off"/> Logout
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} lg={12} sm={12} xs={12}>
                            <Panel header="Stats">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Liked</th>
                                        <td>{this.props.local.get('likedItemIds').count()}</td>
                                    </tr>
                                    <tr>
                                        <th>Hated</th>
                                        <td>{this.props.local.get('hatedItemIds').count()}</td>
                                    </tr>
                                    </tbody>
                                </table>
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
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App);
