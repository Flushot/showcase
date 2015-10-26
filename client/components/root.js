import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from '../configureStore';
import DiffMonitor from 'redux-devtools-diff-monitor';
import SliderMonitor from 'redux-slider-monitor';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();


export default class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <App/>
                </Provider>
                <DiffDebugger/>
            </div>
        );
    }
}


class DiffDebugger extends Component {
    render() {
        return (
            <DevTools store={store} 
                      monitor={DiffMonitor}
                      shortcut='ctrl+x'/>
        );
    }
}


class SliderDebugger extends Component {
    render() {
        // https://github.com/calesce/redux-slider-monitor
        return (
            <DebugPanel left right bottom>
                <DevTools store={store} 
                          monitor={SliderMonitor}
                          keyboardEnabled/>
            </DebugPanel>
        );
    }
}