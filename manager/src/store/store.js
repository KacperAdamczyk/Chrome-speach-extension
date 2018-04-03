/* @flow */
import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {commandsReducer} from './reducers';
import type {CommandPage} from '../models/commandPage';

export type State = {
    commands: CommandPage
}

const reducer = combineReducers({
    commands: commandsReducer,
    form: formReducer
});

export const store = createStore(reducer, devToolsEnhancer());