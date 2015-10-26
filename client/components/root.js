import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from '../configureStore';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// https://github.com/calesce/redux-slider-monitor
import SliderMonitor from 'redux-slider-monitor';

// import DiffMonitor from 'redux-devtools-diff-monitor';

const store = configureStore();


export default class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <App/>
                </Provider>
                <DebugPanel left right bottom>
                    <DevTools store={store} 
                              monitor={SliderMonitor}
                              keyboardEnabled/>
                </DebugPanel>
            </div>
        );
    }
}
