import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from './reducers';

import { devTools, persistState } from 'redux-devtools';


const createStoreWithMiddleware = compose(
		applyMiddleware(
			thunkMiddleware
			// loggerMiddleware,
		),
		devTools()
	)(createStore);


export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}
