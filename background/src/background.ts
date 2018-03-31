import {DataManager} from './DataManager';
import {ActionType, IAction} from './models/actions';
import {ICommandStorage} from './models/CommandStorage';
import {StorageManager} from './StorageManager';

chrome.runtime.onInstalled.addListener(() => {
    const storageManager = new StorageManager();
    storageManager.isInitNeeded().then(r => {
        if (r) {
            void storageManager.addPresets();
        }
    });
});

chrome.runtime.onMessage.addListener((request: IAction<ICommandStorage | string | null>, sender, sendResponse) => {
    const storageManager = new StorageManager();

    switch (request.type) {
        case ActionType.GET_COMMANDS:
            storageManager.load().then(data => sendResponse(new DataManager(data).getFor(request.payload as string)));
            break;
        case ActionType.SAVE_COMMANDS:
            break;
        default:
            return sendResponse('Action not found.');
    }

    return true;
});
