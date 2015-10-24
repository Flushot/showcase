import { combineReducers } from 'redux';
import * as Actions from '../actions';


var titles = _.words('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius posuere enim ac dignissim. Praesent at massa eros. Fusce mauris ex, laoreet at lectus nec, bibendum hendrerit lacus. Mauris elementum lobortis nibh at pellentesque. Maecenas a justo turpis. Morbi mauris metus, sodales in erat eget, sodales tincidunt massa.'),
	itemId = 1,
	items = titles.map(function(word) {
	    return {
	        id: itemId++,
	        title: word
	    };
	});

const initialState = {
	items: items,
	selectedItemId: null
};


function reducer(state = initialState, action) {
	switch (action.type) {
		case Actions.ADD_ITEMS:
			return Object.assign({}, state, {
				items: state.items  // TODO
			});
		case Actions.REMOVE_ITEMS:
			return Object.assign({}, state, {
				items: state.items  // TODO
			});
		case Actions.SELECT_ITEM:
			return Object.assign({}, state, {
				selectedItemId: action.itemId
			});
		default:
			return state;
	}
}


const rootReducer = combineReducers({ reducer });
export default rootReducer;
