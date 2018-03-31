export enum ActionType {
    GET_COMMANDS = 'GET_COMMANDS',
    SAVE_COMMANDS = 'SAVE_COMMANDS',
}

export interface IAction<T> {
    type: ActionType;
    payload: T;
}
