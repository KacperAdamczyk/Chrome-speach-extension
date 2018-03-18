/* @flow */
export type ActionTypes = 'CLICK';

export type Action = {
    command: string,
    type: ActionTypes,
    selector: string
}