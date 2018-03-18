import type {HistoryAction, SettingAction} from "./actions";
import {ADD_TO_HISTORY, SET_SETTINGS} from "./actions";
import {Settings} from '../models/settings';
import {History} from '../models/history';

const defaultSettings: Settings = {
    lang: 'en-US'
};
export function settingsReducer(state: Settings = defaultSettings, action: SettingAction) {
    switch (action.type) {
        case SET_SETTINGS:
            return action.payload;
        default:
            return state;

    }
}

export function historyReducer(state: History[] = [], action: HistoryAction) {
    switch (action.type) {
        case ADD_TO_HISTORY:
            return [...state, action.payload];
        default:
            return state;
    }
}