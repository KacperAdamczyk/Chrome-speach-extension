import {ICommandPage} from './CommandPage';

export interface ICommandStorage {
    [url: string]: ICommandPage;
}
