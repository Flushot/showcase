import _ from 'lodash';

import { ActionTypes } from '../actions';
import * as Utils from '../utils';


var initialState = Utils.getInitialUIState().likes;
if (!initialState) {
    initialState = {
        likedItemIds: [],
        hatedItemIds: [],
        showLikedItemsDialog: false
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LIKE_ITEM:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.concat(action.itemId)
            });

        case ActionTypes.HATE_ITEM:
            return Object.assign({}, state, {
                hatedItemIds: state.hatedItemIds.concat(action.itemId)
            });

        case ActionTypes.CLEAR_RATING:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.filter(id => id !== action.itemId),
                hatedItemIds: state.hatedItemIds.filter(id => id !== action.itemId)
            });

        case ActionTypes.SHOW_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: true
            });

        case ActionTypes.CLOSE_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: false
            });

        default:
            return state;
    }
}
