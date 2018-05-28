/* @flow */
import type {State} from './store';
import type {Command} from '../models/command';

export const pagesSelector = (state: State): string[] => state.commands.toJS ? Object.keys(state.commands.toJS()) : [];

export const selectedPage = (state: State): ?string => state.navigation.get('selectedPage');

export const languagesSelector = (state: State): ?string[] => {
    const page = state.navigation.selectedPage;
    const command = page ? state.commands.get(page) : null;
    return  command && command.size ? Object.keys(command.toJS()) : null;
};

export const selectedLang = (state: State): ?string => state.navigation.get('selectedLang');

export const commandsSelector = (state: State): ?Command[] => {
    const page = state.navigation.selectedPage;
    const lang = state.navigation.selectedLang;
    return state.commands.has(page) && state.commands.hasIn([page, lang]) ? state.commands.get(page).get(lang).toJS() : null;
};

export const selectedCommand = (state: State): ?Command =>
    (state.navigation.get('selectedCommand') ? state.navigation.get('selectedCommand').toJS() : null);