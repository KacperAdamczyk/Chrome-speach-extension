import {ICommand} from './Command';

export interface ICommandPage {
    [lang: string]: ICommand[];
}
