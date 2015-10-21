import { combineReducers } from 'redux';
import * as actions from '../actions';


const initialState = {
	items: []
};


function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.ADD_ITEMS:
			return Object.assign({}, state, {
				items: state.items
			});
		case actions.REMOVE_ITEMS:
			return Object.assign({}, state, {
				items: state.items
			});
		default:
			return state;
	}
}


const rootReducer = combineReducers({ reducer });
export default rootReducer;
