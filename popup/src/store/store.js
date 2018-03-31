/* @flow */
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

import type {Settings} from '../models/settings';
import type {History} from '../models/history';
import {commandsReducer, executionQueueReducer, historyReducer, settingsReducer} from './reducers';
import type {ExecutionQueueItem} from '../models/executionQueueItem';
import type {CommandPage} from '../models/commandPage';

export type State = {
    settings: Settings,
    history: History[],
    commands: CommandPage,
    executionQueue: ExecutionQueueItem[]
}

const reducer = combineReducers({
    settings: settingsReducer,
    history: historyReducer,
    commands: commandsReducer,
    executionQueue: executionQueueReducer
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(createLogger())));