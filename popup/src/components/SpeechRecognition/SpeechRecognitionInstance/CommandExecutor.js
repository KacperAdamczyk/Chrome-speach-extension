/* @flow */
import {store} from '../../../store/store';
import type {ExecutionQueueItem} from '../../../models/executionQueueItem';
import {updateExecutionQueueItem} from '../../../store/actions';
import dictionary from './NumberDisctionary';

declare var chrome: any;

type MetaTags = {
    [key: string]: (value: string) => string
}

const metaTags: MetaTags = {
    '@value': (value: string) => `${value}`,
    '@numericValue': (value: string) => Number(dictionary[value] || value)
};

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
        const code = e.value ? this.expandMetaTags(e.command.codeJS, e.value) : e.command.codeJS;
        chrome.tabs && chrome.tabs.executeScript({code: this.scopeWrapper(code)});
    }

    expandMetaTags(code: string, value: string): string {
        Object.entries(metaTags).forEach(([key, transform]) => {
            code = code.replace(new RegExp(key, 'g'), transform(value));
        });
        return code;
    }

    scopeWrapper(code: string) {
        return `{ ${code} }`;
    }
}

export default CommandExecutor;