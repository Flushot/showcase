import falcor from 'falcor';
import expandCache from 'falcor-expand-cache';
import HttpDataSource from 'falcor-http-datasource';
import _ from 'lodash';

import { ActionTypes } from '../actions';


const initialState = {};


export const model = new falcor.Model({
    source: new HttpDataSource('/model.json'),
    cache: initialState
});



//model.get(["items",["gKknzEu"],["title","url"]])

model.get(['latestItems', [{from: 0, to: 5}], ['id', 'title', 'url']], ['latestItems', 'length'])
    .then(function(jsonGraphEnvelope) {
        console.log('Latest items: %o', jsonGraphEnvelope.json);
    });

model.getValue('settings')
    .then(function(settings) {
        console.log('Settings: %o', settings);
    });



export default function reduxFalcorReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_MODEL:
            return { ...action.payload };

        default:
            return state;
    }
}


export function update(falcorCache) {
    return {
        type: ActionTypes.UPDATE_MODEL,
        payload: falcorCache
    };
}

export function falcorReduxMiddleware({ dispatch, getState }) {
    return function(next) {
        return function(action) {
            var state = next(action);
            console.log('action: %o -> %o', action, state);
            return state;
        };
    };
}


export function createStore(reduxStore) {
    const listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
        let isSubscribed = true;

        return function unsubscribe() {
            if (!isSubscribed) return;

            isSubscribed = false;
            listeners.splice(listeners.indexOf(listener), 1);
        };
    }

    function trigger(cache) {
        // Update the redux with the changes
        reduxStore.dispatch(update(cache));

        // Trigger listeners to refetch possible invalidated data
        listeners.slice().forEach((listener) => listener());
        return cache;
    }

    var newStore = {
        subscribe,
        trigger
    };

    attachOnChange(newStore);

    return newStore;
}

function attachOnChange(store) {
    // TODO: Throttle requests here
    const handler = _.debounce(() => {
        store.trigger(expandCache(model.getCache()));
    }, 50);

    const root = model._root;
    if (!root.onChange) {
        root.onChange = handler;
        return;
    }

    const oldOnChange = root.onChange;
    root.onChange = () => {
        oldOnChange();
        handler();
    };
}
