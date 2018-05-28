import {ICommandStorage} from './models/CommandStorage';

import preloads from './preloads';

class StorageManager {
    public static storageKey = 'commands';

    public save(data: ICommandStorage): Promise<void> {
        return new Promise<void>(resolve => {
            chrome.storage.sync.set({
                    [StorageManager.storageKey]: data
                },
                resolve);
        });
    }

    public load(): Promise<ICommandStorage | {}> {
        return new Promise(resolve => {
            chrome.storage.sync.get([StorageManager.storageKey], storage => {
                resolve(storage[StorageManager.storageKey]);
            });
        });
    }

    public async setPresets(): Promise<void> {
        await this.save(preloads);
    }

    public isInitNeeded(): Promise<boolean> {
        return this.load().then(c => !c);
    }
}

export {
    StorageManager,
};
