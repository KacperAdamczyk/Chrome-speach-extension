/* @flow */
import {Settings} from '../models/settings';
import {History} from '../models/history';

export const SET_SETTINGS = 'SET_SETTINGS';
export type SettingAction = {
    type: SET_SETTINGS,
    payload: Settings
}
export function setSettings(settings: Settings): SettingAction {
    return {
        type: SET_SETTINGS,
        payload: settings
    };
}

export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export type HistoryAction = {
    type: ADD_TO_HISTORY,
    payload: History
}
export function addHistory(history: History): HistoryAction {
    return {
        type: ADD_TO_HISTORY,
        payload: history
    };
}
