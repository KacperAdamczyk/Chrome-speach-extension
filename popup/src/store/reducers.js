/* @flow */
import {
    ADD_TO_HISTORY, SET_SETTINGS, SET_COMMANDS,
    ADD_TO_EXECUTION_QUEUE, UPDATE_EXECUTION_QUEUE_ITEM
} from './actions';
import type {HistoryAction, SettingAction} from './actions';
import {Settings} from '../models/settings';
import type {History} from '../models/history';
import type {CommandsAction, ExecutionQueueAction} from './actions';
import type {Command} from '../models/command';
import type {ExecutionQueueItem} from '../models/executionQueueItem';

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

// TODO remove this.
const developmentCommands: Command[] = [
    {
        voiceCommand: 'play',
        action: {
            codeJS: 'document.querySelector(".ytp-play-button").click();'
        }
    },
    {
        voiceCommand: 'search *',
        action: {
            codeJS: `
            document.querySelector("#search input").value = "@value";
            document.querySelector("#search-icon-legacy").click();
            `
        }
    }
];

export function commandsReducer(state: Command[] = developmentCommands, action: CommandsAction) {
    switch (action.type) {
    case SET_COMMANDS:
        return action.payload;
    default:
        return state;
    }
}

export function executionQueueReducer(state: ExecutionQueueItem[] = [], action: ExecutionQueueAction) {
    switch (action.type) {
    case ADD_TO_EXECUTION_QUEUE: {
        const id = state.length;
        return [...state, {...action.payload, id}];
    }
    case UPDATE_EXECUTION_QUEUE_ITEM:
        return state.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });
    default:
        return state;
    }
}