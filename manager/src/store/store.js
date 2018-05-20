/* @flow */
import {combineReducers, createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {Map, Record} from 'immutable';

import {commandsReducer, navigationReducer, synchronizationReducer} from './reducers';
import type {Navigation} from '../models/navigation';
import {Synchronization} from '../models/synchronization';
import type {Commands} from '../models/commands';


export type State = {
    commands: Map<Commands>,
    navigation: Navigation,
    synchronization: Record<Synchronization>
}


const reducer = combineReducers({
    commands: commandsReducer,
    navigation: navigationReducer,
    synchronization: synchronizationReducer
});

export const store = createStore(reducer, devToolsEnhancer());