import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Badge, Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';


export default class Menu extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        // settings: ImmutablePropTypes.Map.isRequired,
        // likedItemIds: ImmutablePropTypes.set.isRequired
    }

    render() {
        const { actions } = this.props;

        return (
            <Navbar inverse toggleNavKey={0}>
                <NavBrand><Glyphicon glyph="camera"/> Showcase</NavBrand>
                <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                    <NavItem eventKey={1} onClick={e => actions.showLikesDialog()}>
                        <span>Liked</span>
                        {this.props.likedItemIds.length > 0 ? (
                            <Badge style={{marginLeft: '4px'}}>{this.props.likedItemIds.length}</Badge>
                        ) : ''}
                    </NavItem>
                    <NavItem eventKey={2} href="#" disabled>Popular</NavItem>
                    <NavDropdown eventKey={3} title={this.getDisplayName()} id="collapsible-navbar-dropdown">
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
        );
    }

    getDisplayName() {
        return this.props.settings.firstName + ' ' + 
               this.props.settings.lastName;
    }
}
