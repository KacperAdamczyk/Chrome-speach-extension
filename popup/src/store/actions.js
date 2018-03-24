/* @flow */
import {Settings} from '../models/settings';
import {History} from '../models/history';
import type {Command} from "../models/command";
import type {ExecutionQueueItem} from "../models/executionQueueItem";

export const SET_SETTINGS = 'SET_SETTINGS';
export type SettingAction = {
    type: SET_SETTINGS,
    payload: Settings
};

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
};

export function addHistory(history: History): HistoryAction {
    return {
        type: ADD_TO_HISTORY,
        payload: history
    };
}

export const SET_COMMANDS = 'SET_COMMANDS';
export type CommandsAction = {
    type: SET_COMMANDS,
    payload: Command[]
};

export function setCommands(commands: Command[]) {
    return {
        type: SET_COMMANDS,
        payload: commands
    };
}

export const ADD_TO_EXECUTION_QUEUE = 'ADD_TO_EXECUTION_QUEUE';
export const UPDATE_EXECUTION_QUEUE_ITEM = 'UPDATE_EXECUTION_QUEUE_ITEM';
export type ExecutionQueueAction = {
    type: ADD_TO_EXECUTION_QUEUE | UPDATE_EXECUTION_QUEUE_ITEM,
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
