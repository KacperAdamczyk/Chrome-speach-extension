/* @flow */
import {Settings} from '../models/settings';
import type {History} from '../models/history';
import type {ExecutionQueueItem} from '../models/executionQueueItem';
import type {CommandPage} from '../models/commandPage';

export const SET_SETTINGS: 'SET_SETTINGS' = 'SET_SETTINGS';
export type SettingAction = {
    type: typeof SET_SETTINGS,
    payload: Settings
};

export function setSettings(settings: Settings): SettingAction {
    return {
        type: SET_SETTINGS,
        payload: settings
    };
}

export const ADD_TO_HISTORY: 'ADD_TO_HISTORY' = 'ADD_TO_HISTORY';
export const CLEAR_HISTORY: 'CLEAR_HISTORY' = 'CLEAR_HISTORY';
export type HistoryAction = {
    type: typeof ADD_TO_HISTORY | typeof CLEAR_HISTORY,
    payload?: History
};

export function addHistory(history: History): HistoryAction {
    const d = new Date();
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return {
        type: ADD_TO_HISTORY,
        payload: {
          ...history,
            time
        }
    };
}

export function clearHistory(): HistoryAction {
    return {
        type: CLEAR_HISTORY
    };
}

export const SET_COMMANDS: 'SET_COMMANDS' = 'SET_COMMANDS';
export type CommandsAction = {
    type: typeof SET_COMMANDS,
    payload: CommandPage
};

export function setCommands(commands: CommandPage) {
    return {
        type: SET_COMMANDS,
        payload: commands
    };
}

export const ADD_TO_EXECUTION_QUEUE: 'ADD_TO_EXECUTION_QUEUE' = 'ADD_TO_EXECUTION_QUEUE';
export const UPDATE_EXECUTION_QUEUE_ITEM: 'UPDATE_EXECUTION_QUEUE_ITEM' = 'UPDATE_EXECUTION_QUEUE_ITEM';
export type ExecutionQueueAction = {
    type: typeof ADD_TO_EXECUTION_QUEUE | typeof UPDATE_EXECUTION_QUEUE_ITEM,
    payload: ExecutionQueueItem
};

export function addToExecutionQueue(item: ExecutionQueueItem) {
    return {
        type: ADD_TO_EXECUTION_QUEUE,
        payload: item
    };
}

export function updateExecutionQueueItem(item: ExecutionQueueItem) {
    return {
        type: UPDATE_EXECUTION_QUEUE_ITEM,
        payload: item
    };
}
