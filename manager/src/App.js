import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {store} from './store/store';
import PageSelector from './PageSelector/PageSelector';

import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PageSelector/>
            </Provider>
        );
    }
}

export default App;
