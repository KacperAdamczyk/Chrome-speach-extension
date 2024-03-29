export enum ActionType {
    GET_COMMANDS = 'GET_COMMANDS',
    GET_ALL_COMMANDS = 'GET_ALL_COMMANDS',
    SAVE_COMMANDS = 'SAVE_COMMANDS',
    RESET_COMMANDS = 'RESET_COMMANDS'
}

export interface IAction<T> {
    type: ActionType;
    payload: T;
}
