import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as Actions from '../actions';
import * as Utils from '../utils';
import ItemGrid from './itemGrid';


class App extends Component {
    // constructor(props) {
    //  super(props)
    // }

    render() {
        const { dispatch } = this.props;
        const actions = bindActionCreators(Actions, dispatch);

        return (
            <ItemGrid items={this.props.items}
                      selectedItemId={this.props.selectedItemId}
                      onItemSelected={itemId => actions.selectItem(itemId)}/>
        );
    }
}


function mapStateToProps(state) {
    const reducer = state.reducer;

    return {
        items: reducer.items,
        selectedItemId: reducer.selectedItemId
    };
}


export default connect(mapStateToProps)(App);
