/* @flow */
import type {State} from '../../../store/store';
import {store} from '../../../store/store';
import type {Command} from '../../../models/command';
import {addToExecutionQueue} from '../../../store/actions';
import type {ExecutionQueueItem} from '../../../models/executionQueueItem';

class CommandRecognition {
    static recogniseCommand(voiceCommand: string): ?ExecutionQueueItem {
        const state: State = store.getState();
        const commands: Command[] = state.commands[state.settings.lang];
        let value: string = '';
        const recognisedCommand: ?Command = commands.find((command: Command) => {
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
        return recognisedCommand ? {command: recognisedCommand, executed: false, value} : null;
    }

    static addToExecutionQueue(item: ExecutionQueueItem) {
        store.dispatch(addToExecutionQueue(item));
    }
}

export default CommandRecognition;