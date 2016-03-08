import { combineReducers } from 'redux';

import itemsReducer from './items';
import likesReducer from './likes';
import settingsReducer from './settings';
//import { default as modelReducer } from './model';


export default combineReducers({
    items: itemsReducer,
    likes: likesReducer,
    settings: settingsReducer,
    //model: modelReducer
});
