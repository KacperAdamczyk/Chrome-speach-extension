import {ICommandPageEntry} from './CommandPageEntry';

export interface ICommandPage {
    [lang: string]: ICommandPageEntry[];
}
