import {ICommand} from './models/Command';
import {ICommandPage} from './models/CommandPage';
import {ICommandStorage} from './models/CommandStorage';

class DataManager {
    constructor(private data: ICommandStorage) {
    }

    public getFor(url: string): ICommandPage {
        return this.pipe(
            url,
            this.getMatchingEntries,
            this.sortForMerge,
            this.getValuesFromEntries,
            this.mergeValues,
            this.removeDuplicates
        );
    }

    private pipe(startValue: any, ...fns: Array<(value: any) => any>): any {
        return fns.reduce((val, fn) => fn.call(this, val), startValue);
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

    private removeDuplicates(value: ICommandPage): ICommandPage {
        return Object.entries(value).reduce((acc, [lang, commands]: [string, ICommand[]]) => {
            const commandsIn = new Set();
            return {
                ...acc,
                [lang]: commands.filter((command: ICommand) =>
                    commandsIn.has(command.voiceCommand) ? false : (commandsIn.add(command.voiceCommand), true))
            };
        }, {});
    }
}

export {
    DataManager
};
