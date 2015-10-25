import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrievePath, retrieveValue } from 'redux-falcor';
import _ from 'lodash';

import * as Actions from '../actions';
import * as Utils from '../utils';
import ItemGrid from './itemGrid';


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(retrievePath('items[0..10]["title","id"]'));
    }

    render() {
        const { dispatch } = this.props;
        const actions = bindActionCreators(Actions, dispatch);

        return (
            <div>
                <ItemGrid items={_.values(this.props.remote.items)}
                          selectedItemId={this.props.local.selectedItemId}
                          onItemSelected={itemId => actions.selectItem(itemId)}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App);
