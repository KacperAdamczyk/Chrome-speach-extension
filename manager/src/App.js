/* @flow */
import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {store} from './store/store';
import Manager from './components/Manager/Manager';
import {startImportingCommands} from './store/actions';
import DataSynchronizer from './DataSynchronizer';

import './App.css';

class App extends Component<void> {
    dataSynchronzier: DataSynchronizer;
    componentDidMount() {
        this.dataSynchronzier = new DataSynchronizer();
        store.dispatch(startImportingCommands());
    }

    componentWillUnmount() {
        this.dataSynchronzier.closeSession();
    }

    render() {
        return (
            <Provider store={store}>
                <section className='app-container'>
                    <Manager/>
                </section>
            </Provider>
        );
    }
}

export default App;
