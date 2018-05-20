/* @flow */
import type {State} from './store/store';
import {store} from './store/store';
import type {Command} from './models/command';
import {Synchronization} from './models/synchronization';
import type {Commands} from './models/commands';
import {finishImportingCommands, finishResettingCommands, setCommands} from './store/actions';
import {is} from 'immutable';

declare var chrome: any;

class DataSynchronizer {
    unsubscribe: () => void;
    oldCommands: Commands;

    constructor() {
        this.importCommands();
        this.oldCommands = store.getState().commands;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
    }

    closeSession() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleStoreChange = () => {
        const state: State = store.getState();

        if (!is(state.commands, this.oldCommands)) {
            this.exportCommands(state.commands);
        }
        this.oldCommands = state.commands;

        const sync: Synchronization = state.synchronization;
        if (sync.resetting) {
            this.resetCommands();
            this.importCommands();
        }
        if (sync.importing) {
            this.importCommands();
        }
    };

    exportCommands(commands: Command[]) {
        chrome.runtime.sendMessage({type: 'SAVE_COMMANDS', payload: commands});
    }

    importCommands() {
        chrome.runtime.sendMessage({type: 'GET_ALL_COMMANDS'},
            (commands: Commands) => {
                store.dispatch(setCommands(commands));
                store.dispatch(finishImportingCommands());
            });
    }

    resetCommands() {
        chrome.runtime.sendMessage({type: 'RESET_COMMANDS'});
        if (window.confirm('Are you sure to reset all commands?')) {
            store.dispatch(finishResettingCommands());
        }
    }

}

export default DataSynchronizer;