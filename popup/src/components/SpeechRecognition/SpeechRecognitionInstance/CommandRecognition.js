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
        let value = null;
        const recognisedCommand: Command = commands.find((command: Command) => {
            if (command.voiceCommand.endsWith('*')) {
                const trimmedVoiceCommand = command.voiceCommand.slice(0, -1);
                const matched = voiceCommand.startsWith(trimmedVoiceCommand) && voiceCommand.length > trimmedVoiceCommand.length;
                if (matched) {
                    value = voiceCommand.split(trimmedVoiceCommand)[1];
                }
                return matched;
            } else {
                return command.voiceCommand === voiceCommand;
            }
        });
        if (recognisedCommand) {
            const executionQueueItem: ExecutionQueueItem = {
                command: recognisedCommand,
                executed: false,
                value
            };
            store.dispatch(addToExecutionQueue(executionQueueItem));
        }

        return !!recognisedCommand;
    }
}

export default CommandRecognition;