import { combineReducers } from 'redux';
import { falcorReducer } from 'redux-falcor';
import _ from 'lodash';

import * as Actions from '../actions';


const initialState = {
    selectedItemId: null,
    likedItemIds: [],
    hatedItemIds: []
};


export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SELECT_ITEM:
            return Object.assign({}, state, {
                selectedItemId: action.itemId
            });

        case Actions.LIKE_ITEM:
            var newLikedItemIds = state.likedItemIds;
            if (!_.contains(newLikedItemIds, action.itemId))
                newLikedItemIds.push(action.itemId);
            
            return Object.assign({}, state, {
                likedItemIds: newLikedItemIds
            });

        case Actions.HATE_ITEM:
            var newHatedItemIds = state.hatedItemIds;
            if (!_.contains(newHatedItemIds, action.itemId))
                newHatedItemIds.push(action.itemId);
            
            return Object.assign({}, state, {
                hatedItemIds: newHatedItemIds
            });

        case Actions.CLEAR_RATING:
            return Object.assign({}, state, {
                likedItemIds: _.without(state.likedItemIds, action.itemId),
                hatedItemIds: _.without(state.hatedItemIds, action.itemId)
            });

        default:
            return state;
    }
}
