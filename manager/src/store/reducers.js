/* @flow */
import {fromJS, List, Map, Record} from 'immutable';

import type {CommandsAction, NavigationAction, SynchronizationAction} from './actions';
import {
    ADD_NEW_COMMAND,
    ADD_NEW_LANG,
    ADD_NEW_PAGE,
    DELETE_COMMAND,
    DELETE_LANG,
    DELETE_PAGE,
    EDIT_COMMAND,
    EDIT_LANG,
    EDIT_PAGE,
    FINISH_IMPORTING_COMMANDS,
    FINISH_RESETTING_COMMANDS,
    SELECT_COMMAND,
    SELECT_LANG,
    SELECT_PAGE,
    SET_COMMANDS,
    START_IMPORTING_COMMANDS,
    START_RESETTING_COMMANDS
} from './actions';
import type {Commands} from '../models/commands';
import type {Navigation} from '../models/navigation';
import type {Command} from '../models/command';
import type {Synchronization} from '../models/synchronization';

export function commandsReducer(state: Commands = fromJS({}), action: CommandsAction<any>): ?Commands {
    switch (action.type) {
        case SET_COMMANDS:
            return action.payload && fromJS(action.payload.value);

        case ADD_NEW_PAGE:
        case EDIT_PAGE:
        case DELETE_PAGE:
            return pageReducer(state, action);

        case ADD_NEW_LANG:
        case EDIT_LANG:
        case DELETE_LANG:
            return langReducer(state, action);

        case ADD_NEW_COMMAND:
        case EDIT_COMMAND:
        case DELETE_COMMAND:
            return commandReducer(state, action);

        default:
            return state;
    }
}

function pageReducer(state: Commands, action: CommandsAction<string>): Commands {
    const newValue = action.payload && action.payload.value;
    const selectedPage = action.meta && action.meta.navigation && action.meta.navigation.selectedPage;

    switch (action.type) {
        case ADD_NEW_PAGE:
            return !newValue ? state : state.mergeWith(oldVal => oldVal, {[newValue]: Map()});

        case EDIT_PAGE:
            if (!state.has(selectedPage) || state.has(newValue)) {
                return state;
            }
            return state.mapKeys(key => key === selectedPage ? newValue : key);

        case DELETE_PAGE:
            return !selectedPage ? state : state.delete(selectedPage);

        default:
            return state;
    }
}

function langReducer(state: Commands, action: CommandsAction<string>): Commands {
    const newValue = action.payload && action.payload.value;
    const selectedLang = action.meta && action.meta.navigation && action.meta.navigation.selectedLang;
    const selectedPage = action.meta && action.meta.navigation && action.meta.navigation.selectedPage;

    switch (action.type) {
        case ADD_NEW_LANG:
            return !(newValue && selectedPage) ? state : state.mergeDeepWith(
                oldVal => oldVal,
                {
                    [selectedPage]: {
                        [newValue]: List()
                    }
                }
            );

        case EDIT_LANG: {
            if (!state.has(selectedPage) || !state.hasIn([selectedPage, selectedLang]) || state.hasIn([selectedPage, newValue])) {
                return state;
            }
            const valueOfEditedLang = state.getIn([selectedPage, selectedLang]);
            return state.deleteIn([selectedPage, selectedLang]).mergeDeep(
                {
                    [selectedPage]: {
                        [selectedLang]: valueOfEditedLang
                    }
                }
            );
        }

        case DELETE_LANG:
            return !selectedLang ? state : state.deleteIn([selectedPage, selectedLang]);

        default:
            return state;
    }
}

function commandReducer(state: Commands, action: CommandsAction<Command>): Commands {
    const newCommand = action.payload && action.payload.value;
    const selectedPage = action.meta && action.meta.navigation && action.meta.navigation.selectedPage;
    const selectedLang = action.meta && action.meta.navigation && action.meta.navigation.selectedLang;
    const selectedCommand = action.meta && action.meta.navigation && action.meta.navigation.selectedCommand;
    const commandsList = state.getIn([selectedPage, selectedLang]);
    const isAlreadyIn = commandsList.some(c => c.get('voiceCommand') === (newCommand && newCommand.voiceCommand));

    switch (action.type) {
        case ADD_NEW_COMMAND:
            return !newCommand || !newCommand.voiceCommand || isAlreadyIn ? state :
                state.setIn([selectedPage, selectedLang], commandsList.push(Map(newCommand)));

        case EDIT_COMMAND:
            return !newCommand || !newCommand.voiceCommand || isAlreadyIn ? state :
                state.setIn([selectedPage, selectedLang],
                    commandsList.map(c => c.get('voiceCommand') === (selectedCommand && selectedCommand.voiceCommand) ? Map(newCommand) : c));

        case DELETE_COMMAND:
            return !selectedCommand || !selectedCommand.voiceCommand ? state :
                state.setIn([selectedPage, selectedLang],
                    commandsList.filter(c => c.get('voiceCommand') !== (selectedCommand && selectedCommand.voiceCommand)));

        default:
            return state;
    }
}

/* NAVIGATION */
const NavigationRecord = Record({
    selectedPage: null,
    selectedLang: null,
    selectedCommand: null
});

export function navigationReducer(state: Navigation = new NavigationRecord(), action: NavigationAction): Navigation {
    switch (action.type) {
        case SELECT_PAGE: {
            const selectedPage = typeof action.payload === 'string' ? action.payload : null;
            return new NavigationRecord({
                selectedPage
            });
        }

        case SELECT_LANG: {
            const selectedLang = typeof action.payload === 'string' ? action.payload : null;
            return state.set('selectedLang', selectedLang).set('selectedCommand', null);
        }

        case SELECT_COMMAND: {
            const selectedCommand = typeof action.payload === 'object' ? action.payload : null;
            return selectedCommand ? state.set('selectedCommand', Map(selectedCommand)) : state;
        }

        default:
            return state;
    }
}

/* SYNCHRONIZATION */
const SynchronizationRecord = Record({
    importing: false,
    resetting: false
});

export function synchronizationReducer(state: Synchronization = new SynchronizationRecord(), action: SynchronizationAction): Synchronization {
    switch (action.type) {
        case START_IMPORTING_COMMANDS:
            return state.set('importing', true);
        case FINISH_IMPORTING_COMMANDS:
            return state.set('importing', false);
        case START_RESETTING_COMMANDS:
            return state.set('resetting', true);
        case FINISH_RESETTING_COMMANDS:
            return state.set('resetting', false);
        default:
            return state;
    }
}