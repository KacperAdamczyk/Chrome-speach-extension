/* @flow */
import type {Commands} from '../models/commands';
import type {Command} from '../models/command';
import type {Navigation} from '../models/navigation';

/* Commands */

export const SET_COMMANDS: 'SET_COMMANDS' = 'SET_COMMANDS';

export const ADD_NEW_PAGE: 'ADD_NEW_PAGE' = 'ADD_NEW_PAGE';
export const EDIT_PAGE: 'EDIT_PAGE' = 'EDIT_PAGE';
export const DELETE_PAGE: 'DELETE_PAGE' = 'DELETE_PAGE';

export const ADD_NEW_LANG: 'ADD_NEW_LANG' = 'ADD_NEW_LANG';
export const EDIT_LANG: 'EDIT_LANG' = 'EDIT_LANG';
export const DELETE_LANG: 'DELETE_LANG' = 'DELETE_LANG';

export const ADD_NEW_COMMAND: 'ADD_NEW_COMMAND' = 'ADD_NEW_COMMAND';
export const EDIT_COMMAND: 'EDIT_COMMAND' = 'EDIT_COMMAND';
export const DELETE_COMMAND: 'DELETE_COMMAND' = 'DELETE_COMMAND';

type CommandsActionPayload<T> = {
    value: T
};

type CommandsActionMeta = {
    navigation: Navigation
}

export type CommandsAction<T> = {
    type: typeof SET_COMMANDS |
        typeof ADD_NEW_PAGE | typeof EDIT_PAGE | typeof DELETE_PAGE |
        typeof ADD_NEW_LANG | typeof EDIT_LANG | typeof DELETE_LANG |
        typeof ADD_NEW_COMMAND | typeof EDIT_COMMAND | typeof DELETE_COMMAND,
    payload?: CommandsActionPayload<T>,
    meta?: CommandsActionMeta
};

export function setCommands(commands: Commands): CommandsAction<Commands> {
    return {
        type: SET_COMMANDS,
        payload: {value: commands}
    };
}

export function addNewPage(page: string): CommandsAction<string> {
    return {
        type: ADD_NEW_PAGE,
        payload: {value: page}
    };
}

export function editPage(page: string, selectedPage: ?string): CommandsAction<string> {
    return {
        type: EDIT_PAGE,
        payload: {value: page},
        meta: {
            navigation: {
                selectedPage
            },
        }
    };
}

export function deletePage(page: string): CommandsAction<void> {
    return {
        type: DELETE_PAGE,
        meta: {
            navigation: {
                selectedPage: page
            }
        }
    };
}

export function addNewLang(lang: string, selectedPage: string): CommandsAction<string> {
    return {
        type: ADD_NEW_LANG,
        payload: {
            value: lang,
        },
        meta: {
            navigation: {
                selectedPage
            }
        }
    };
}

export function editLang(lang: string, selectedPage: string, selectedLang: string): CommandsAction<string> {
    return {
        type: EDIT_LANG,
        payload: {
            value: lang,
        },
        meta: {
            navigation: {
                selectedPage,
                selectedLang
            }
        }
    };
}

export function deleteLang(selectedPage: string, selectedLang: string): CommandsAction<void> {
    return {
        type: DELETE_LANG,
        meta: {
            navigation: {
                selectedPage,
                selectedLang
            }
        }
    };
}

export function addNewCommand(command: Command, selectedPage: string, selectedLang: string): CommandsAction<Command> {
    return {
        type: ADD_NEW_COMMAND,
        payload: {
            value: command,
        },
        meta: {
            navigation: {
                selectedPage,
                selectedLang
            }
        }
    };
}

export function editCommand(command: Command, selectedPage: string, selectedLang: string,
                            selectedCommand: ?Command): CommandsAction<Command> {
    return {
        type: EDIT_COMMAND,
        payload: {
            value: command,
        },
        meta: {
            navigation: {
                selectedPage,
                selectedLang,
                selectedCommand
            }
        }
    };
}

export function deleteCommand(selectedPage: string, selectedLang: string, selectedCommand: ?Command): CommandsAction<void> {
    return {
        type: DELETE_COMMAND,
        meta: {
            navigation: {
                selectedPage,
                selectedLang,
                selectedCommand
            }
        }
    };
}

/* Navigation */

export const SELECT_PAGE: 'SELECT_PAGE' = 'SELECT_PAGE';
export const SELECT_LANG: 'SELECT_LANG' = 'SELECT_LANG';
export const SELECT_COMMAND: 'SELECT_COMMAND' = 'SELECT_COMMAND';

export type NavigationAction = {
    type: typeof SELECT_PAGE | typeof SELECT_LANG | typeof SELECT_COMMAND,
    payload: string | Command
}

export function selectPage(page: string): NavigationAction {
    return {
        type: SELECT_PAGE,
        payload: page
    };
}

export function selectLang(lang: string): NavigationAction {
    return {
        type: SELECT_LANG,
        payload: lang
    };
}

export function selectCommand(command: Command): NavigationAction {
    return {
        type: SELECT_COMMAND,
        payload: command
    };
}

/* Synchronization */
export const START_IMPORTING_COMMANDS: 'START_IMPORTING_COMMANDS' = 'START_IMPORTING_COMMANDS';
export const FINISH_IMPORTING_COMMANDS: 'FINISH_IMPORTING_COMMANDS' = 'FINISH_IMPORTING_COMMANDS';
export const START_RESETTING_COMMANDS: 'START_RESETTING_COMMANDS' = 'START_RESETTING_COMMANDS';
export const FINISH_RESETTING_COMMANDS: 'FINISH_RESETTING_COMMANDS' = 'FINISH_RESETTING_COMMANDS';

export type SynchronizationAction = {
    type: typeof START_IMPORTING_COMMANDS | typeof FINISH_IMPORTING_COMMANDS |
        typeof START_RESETTING_COMMANDS | typeof FINISH_RESETTING_COMMANDS
}

export function startImportingCommands(): SynchronizationAction {
    return {
        type: START_IMPORTING_COMMANDS
    };
}

export function finishImportingCommands(): SynchronizationAction {
    return {
        type: FINISH_IMPORTING_COMMANDS
    };
}

export function startResettingCommands(): SynchronizationAction {
    return {
        type: START_RESETTING_COMMANDS
    };
}

export function finishResettingCommands(): SynchronizationAction {
    return {
        type: FINISH_RESETTING_COMMANDS
    };
}
