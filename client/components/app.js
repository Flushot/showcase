import '../styles/app.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrievePath, retrieveValue } from 'redux-falcor';
import _ from 'lodash';
import { Badge, Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

import * as Actions from '../actions';
import * as Utils from '../utils';
import ItemGrid from './itemGrid';


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(retrievePath('items[0..4]["title","id"]'));
    }

    render() {
        const { dispatch } = this.props;
        const actions = bindActionCreators(Actions, dispatch);
        const itemHandlers = {
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
                            <MenuItem eventKey="2">
                                <Glyphicon glyph="cog"/> Settings
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4">
                                <Glyphicon glyph="off"/> Logout
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <div className="app-content">
                    <ItemGrid title="Popular Images"
                              items={_.values(this.props.remote.items)}
                              likedItemIds={this.props.local.get('likedItemIds')}
                              hatedItemIds={this.props.local.get('hatedItemIds')}
                              selectedItemId={this.props.local.get('selectedItemId')}
                              showControls={true}
                              {...itemHandlers}/>
                    <ItemGrid title="Popular Images (RO)"
                              items={_.values(this.props.remote.items)}
                              likedItemIds={this.props.local.get('likedItemIds')}
                              hatedItemIds={this.props.local.get('hatedItemIds')}
                              selectedItemId={this.props.local.get('selectedItemId')}
                              showControls={false}
                              {...itemHandlers}/>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App);
