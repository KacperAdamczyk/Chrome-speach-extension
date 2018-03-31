/* @flow */
import React, {Component} from 'react';
import {Provider} from 'react-redux';

import './App.css';
import MediaProvider from './components/AccessProvider/AccessProvider';
import {store} from './store/store';
import SpeechRecognition from './components/SpeechRecognition/SpeechRecognition';
import CommandProvider from './components/CommandProvider/CommandProvider';

class App extends Component<{}> {
    render() {
        return (
            <div className='app-container'>
                <MediaProvider>
                    <Provider store={store}>
                        <CommandProvider>
                            <SpeechRecognition/>
                        </CommandProvider>
                    </Provider>
                </MediaProvider>
            </div>
        );
    }
}

export default App;
