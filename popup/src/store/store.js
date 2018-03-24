/* @flow */
import {combineReducers, createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import type {Settings} from '../models/settings';
import type {History} from '../models/history';
import type {Command} from '../models/command';
import {commandsReducer, executionQueueReducer, historyReducer, settingsReducer} from './reducers';
import type {ExecutionQueueItem} from '../models/executionQueueItem';

export type State = {
    settings: Settings,
    history: History[],
    commands: Command[],
    executionQueue: ExecutionQueueItem[]
}

const reducer = combineReducers({
    settings: settingsReducer,
    history: historyReducer,
    commands: commandsReducer,
    executionQueue: executionQueueReducer
});

export const store = createStore(reducer, devToolsEnhancer());