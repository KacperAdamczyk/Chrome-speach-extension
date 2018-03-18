import {combineReducers, createStore} from 'redux';
import {devToolsEnhancer} from "redux-devtools-extension";

import {Settings} from "../models/settings";
import {History} from "../models/history";
import {historyReducer, settingsReducer} from "./reducers";

export type State = {
    settings: Settings,
    history: History[]
}

const reducer = combineReducers({
    settings: settingsReducer,
    history: historyReducer
});

export const store = createStore(reducer, devToolsEnhancer());