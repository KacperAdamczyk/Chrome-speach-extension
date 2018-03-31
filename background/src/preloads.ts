import {ICommandStorage} from './models/CommandStorage';

const preloads: ICommandStorage = {
    '.*': {
        'en-US': [
            {
                codeJS: 'window.alert("@value");',
                voiceCommand: 'alert *'
            },
        ]
    },
    'youtube.com*': {
        'en-US': [
            {
                codeJS: 'document.querySelector(".ytp-play-button").click();',
                voiceCommand: 'play'
            },
            {
                codeJS: `
            document.querySelector("#search input").value = "@value";
            document.querySelector("#search-icon-legacy").click();
            `,
                voiceCommand: 'search *',
            }
        ],
        'pl-PL': [
            {
                codeJS: 'document.querySelector(".ytp-play-button").click();',
                voiceCommand: 'pauza'
            },
            {
                codeJS: `
            document.querySelector("#search input").value = "@value";
            document.querySelector("#search-icon-legacy").click();
            `,
                voiceCommand: 'szukaj *',
            }
        ]
    }
};

export default preloads;
