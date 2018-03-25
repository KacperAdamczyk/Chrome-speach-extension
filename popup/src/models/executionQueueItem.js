/* @flow */
import type {Command} from './command';

export type ExecutionQueueItem = {
    id?: number,
    command: Command,
    executed: boolean,
    value?: string
}