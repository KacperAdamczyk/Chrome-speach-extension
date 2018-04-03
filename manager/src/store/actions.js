/* @flow */
import type {CommandPage} from '../models/commandPage';

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