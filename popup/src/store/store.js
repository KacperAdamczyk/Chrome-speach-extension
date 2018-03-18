/* @flow */
import {combineReducers, createStore} from 'redux';
import {devToolsEnhancer} from "redux-devtools-extension";

import {Settings} from "../models/settings";
import {History} from "../models/history";
import {Command} from "../models/command";
import {commandsReducer, executionQueueReducer, historyReducer, settingsReducer} from "./reducers";
import type {ExecutionQueueItem} from "../models/executionQueueItem";

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