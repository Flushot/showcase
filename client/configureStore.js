import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { devTools, persistState } from 'redux-devtools';

import rootReducer from './reducers';
//import { falcorReduxMiddleware } from './reducers/model';


const storeFactory = compose(
		applyMiddleware(
			//falcorReduxMiddleware,
			thunkMiddleware
			// loggerMiddleware
		),
		devTools()
	)(createStore);


export default function configureStore(initialState) {
	return storeFactory(rootReducer, initialState);
}
