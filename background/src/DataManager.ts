import {ICommand} from './models/Command';
import {ICommandPage} from './models/CommandPage';
import {ICommandStorage} from './models/CommandStorage';

class DataManager {
    constructor(private data: ICommandStorage) {
    }

    public getFor(url: string): ICommandPage {
        // TODO add removing duplicates
        return this.mergeValues(this.getValuesFromEntries(this.sortForMerge(this.getMatchingEntries(url))));
    }

    private getMatchingEntries(urlToMatch: string): Array<[string, ICommandPage]> {
        return Object.entries(this.data).filter(([url]) => new RegExp(url).test(urlToMatch));
    }

    private sortForMerge(entries: Array<[string, ICommandPage]>): Array<[string, ICommandPage]> {
        const calcUrlComplexity = (url: string): number => {
            const complexity = url.match(/\/|[.]/g);
            return complexity ? complexity.length : 0;
        };
        return entries.sort(([url1], [url2]) => calcUrlComplexity(url1) - calcUrlComplexity(url2));
    }

    private getValuesFromEntries(entries: Array<[string, ICommandPage]>): ICommandPage[] {
        return entries.map(([url, value]) => value);
    }

    private mergeValues(values: ICommandPage[]): ICommandPage {
        const result = new Map<string, ICommand[]>();
        values.forEach(commandPage => {
            Object.entries(commandPage).forEach(([lang, entry]) => {
                result.set(lang, [
                    ...(result.has(lang) ? result.get(lang) as ICommand[] : []),
                    ...entry
                ]);
            });
        });

        return [...result].reduce((acc, [lang, value]) => ({...acc, [lang]: value}), {});
    }
}

export {
    DataManager
};
