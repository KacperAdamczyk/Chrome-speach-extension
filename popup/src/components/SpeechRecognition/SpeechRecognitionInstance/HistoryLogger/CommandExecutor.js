/* @flow */
/* global chrome */
import {store} from '../../../../store/store';
import type {ExecutionQueueItem} from "../../../../models/executionQueueItem";
import {updateExecutionQueueItem} from "../../../../store/actions";
import type {Action} from "../../../../models/action";

class CommandExecutor {
    constructor() {
        this.subscription = store.subscribe(this.onStateChanged);
    }

    closeSubscription() {
        this.subscription.unsubscribe();
    }

    onStateChanged = () => {
        const state = store.getState();
        const commandsToExecute = this.getCommandsToExecute(state.executionQueue);
        this.executeCommands(commandsToExecute);
    };

    getCommandsToExecute(queue: ExecutionQueueItem[]) {
        return queue.filter((position: ExecutionQueueItem) => !position.executed);
    }

    executeCommands(queue: ExecutionQueueItem[]) {
        queue.forEach(e => {
            this.executeTest(e);
            store.dispatch(updateExecutionQueueItem({...e, executed: true}));
        })
    }
// TODO move it to content script file
    executeTest(e: ExecutionQueueItem) {
        const command = e.command;
        command.actions.forEach((a: Action) => {
            if (a.type === 'CLICK') {
                chrome.tabs.executeScript({
                    code: `document.querySelector('${a.selector}').click()`
                })
            }
        })

    }
}

export default CommandExecutor;