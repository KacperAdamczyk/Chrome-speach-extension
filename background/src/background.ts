import {DataManager} from './DataManager';
import {ActionType, IAction} from './models/actions';
import {ICommandStorage} from './models/CommandStorage';
import {StorageManager} from './StorageManager';

chrome.runtime.onInstalled.addListener(() => {
    const storageManager = new StorageManager();
    storageManager.isInitNeeded().then(r => {
        if (r) {
            void storageManager.setPresets();
        }
    });
});

chrome.runtime.onMessage.addListener((request: IAction<ICommandStorage | string | null>, sender, sendResponse) => {
    const storageManager = new StorageManager();
    // noinspection TsLint
    console.log('request:', request);

    switch (request.type) {
        case ActionType.GET_COMMANDS:
            storageManager.load().then(data => sendResponse(new DataManager(data).getFor(request.payload as string)));
            break;
        case ActionType.GET_ALL_COMMANDS:
            storageManager.load().then(data => sendResponse(data));
            break;
        case ActionType.SAVE_COMMANDS:
            storageManager.save(request.payload as ICommandStorage).then(() => sendResponse('Saved.'));
            break;
        case ActionType.RESET_COMMANDS:
            storageManager.setPresets().then(() => sendResponse('Reset to default.'));
            break;
        default:
            return sendResponse('Action not found.');
    }

    return true; /* This indicates async sendResponse call */
});
