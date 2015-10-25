import { combineReducers } from 'redux';
import { falcorReducer } from 'redux-falcor';

import * as Actions from '../actions';


const initialState = {
    selectedItemId: null
};


export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SELECT_ITEM:
            return Object.assign({}, state, {
                selectedItemId: action.itemId
            });
        default:
            return state;
    }
}
