import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
// import { createFalcorMiddleware } from 'redux-falcor';
import { devTools, persistState } from 'redux-devtools';

import rootReducer from './reducers';
// import { model as remoteModel } from './reducers/remote';


const storeFactory = compose(
		applyMiddleware(
			// createFalcorMiddleware(remoteModel),
			thunkMiddleware
			// loggerMiddleware
		),
		devTools()
	)(createStore);


export default function configureStore(initialState) {
	return storeFactory(rootReducer, initialState);
}
