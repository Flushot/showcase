// import { combineReducers } from 'redux';

import { reducer as localReducer } from './local';
// import { reducer as remoteReducer } from './remote';


// const rootReducer = combineReducers({
//     remote: remoteReducer,
//     local: localReducer
// });

const rootReducer = localReducer;

export default rootReducer;
