import _ from 'lodash';

import { ActionTypes } from '../actions';
import * as Utils from '../utils';


var initialState = Utils.getInitialUIState().items;
if (!initialState) {
    initialState = {
        items: [],
        refreshingItems: false,
        selectedItemId: null
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_REFRESHING_ITEMS:
            return Object.assign({}, state, {
                refreshingItems: true
            });

        case ActionTypes.ITEMS_REFRESHED:
            // Append new items
            return Object.assign({}, state, {
                refreshingItems: false,
                items: state.items.concat(action.items.filter(item => state.items.find(x => x.id === item.id) === undefined))
            });

        case ActionTypes.SELECT_ITEM:
            return Object.assign({}, state, {
                selectedItemId: action.itemId
            });

        default:
            return state;
    }
}
