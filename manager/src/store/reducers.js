/* @flow */
import type {CommandsAction} from './actions';
import {SET_COMMANDS} from './actions';
import type {CommandPage} from '../models/commandPage';

const devCommands = {
    'en-US': [
        {
            codeJS: 'document.querySelector(".ytp-play-button").click();',
            voiceCommand: 'play'
        },
        {
            codeJS: `
            document.querySelector("#search input").value = "@value";
            document.querySelector("#search-icon-legacy").click();
            `,
            voiceCommand: 'search *',
        }
    ],
    'pl-PL': [
        {
            codeJS: 'document.querySelector(".ytp-play-button").click();',
            voiceCommand: 'pauza'
        },
        {
            codeJS: `
            document.querySelector("#search input").value = "@value";
            document.querySelector("#search-icon-legacy").click();
            `,
            voiceCommand: 'szukaj *',
        }
    ]
};

export function commandsReducer(state: CommandPage = devCommands, action: CommandsAction) {
    switch (action.type) {
        case SET_COMMANDS:
            return action.payload;
        default:
            return state;
    }
}