/* @flow */
import {store} from "../../../store/store";
import type {State} from "../../../store/store";
import type {Command} from "../../../models/command";
import {addToExecutionQueue} from "../../../store/actions";
import type {ExecutionQueueItem} from "../../../models/executionQueueItem";

class CommandRecognition {
    static recogniseCommand(voiceCommand: string): boolean {
        const state: State = store.getState();
        const commands: Command[] = state.commands;
        const recognisedCommand: Command = commands.find((command: Command) => command.voiceCommand === voiceCommand);
        if (recognisedCommand) {
            const executionQueueItem: ExecutionQueueItem = {
                command: recognisedCommand,
                executed: false
            };
            store.dispatch(addToExecutionQueue(executionQueueItem));
        }

        return !!recognisedCommand;
    }
}

export default CommandRecognition;