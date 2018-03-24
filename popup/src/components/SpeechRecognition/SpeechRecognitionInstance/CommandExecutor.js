/* @flow */
/* global chrome */
import {store} from '../../../store/store';
import type {ExecutionQueueItem} from '../../../models/executionQueueItem';
import {updateExecutionQueueItem} from '../../../store/actions';

declare var chrome: any;

class CommandExecutor {
    subscription: {
        unsubscribe: () => void
    };
    onStateChanged = () => {
        const state = store.getState();
        const commandsToExecute = this.getCommandsToExecute(state.executionQueue);
        this.executeCommands(commandsToExecute);
    };

    constructor() {
        this.subscription = store.subscribe(this.onStateChanged);
    }

    closeSubscription() {
        this.subscription.unsubscribe();
    }

    getCommandsToExecute(queue: ExecutionQueueItem[]) {
        return queue.filter((position: ExecutionQueueItem) => !position.executed);
    }

    executeCommands(queue: ExecutionQueueItem[]) {
        queue.forEach(e => {
            this.executeCode(e);
            store.dispatch(updateExecutionQueueItem({...e, executed: true}));
        });
    }

    executeCode(e: ExecutionQueueItem) {
        const code = e.value ? e.command.action.codeJS.replace(/@value/g, e.value) : e.command.action.codeJS;
        chrome.tabs && chrome.tabs.executeScript({code: this.scopeWrapper(code)});
    }

    scopeWrapper(code: string) {
        return `{ ${code} }`;
    }
}

export default CommandExecutor;