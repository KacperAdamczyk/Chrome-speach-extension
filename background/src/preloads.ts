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
                codeJS: `
                const video = document.querySelector("video");
                video.play();
                `,
                voiceCommand: 'play'
            },
            {
                codeJS: `
                const video = document.querySelector("video");
                video.pause();
                `,
                voiceCommand: 'pause'
            },
            {
                codeJS: `
                const searchInput = document.querySelector("#search input");
                const searchButton = document.querySelector("#search-icon-legacy");
                searchInput.value = "@value";
                searchButton.click();
                `,
                voiceCommand: 'search *',
            },
            {
                codeJS: `
                const video = document.querySelector("video");
                const volume = Number.parseInt("@value");
                video.volume = Number.isNaN() ? video.volume : volume / 100;
                `,
                voiceCommand: 'volume *'
            },
            {
                codeJS: `
                document.querySelector('#logo-icon-container').click()
                `,
                voiceCommand: 'main page'
            },
            {
                codeJS: `
                document.querySelectorAll('#video-title')[Number.parseInt("@value")].click()
                `,
                voiceCommand: 'select *'
            },
        ],
        'pl-PL': [
            {
                codeJS: `
                const video = document.querySelector("video");
                video.play();
                `,
                voiceCommand: 'wznów'
            },
            {
                codeJS: `
                const video = document.querySelector("video");
                video.pause();
                `,
                voiceCommand: 'pauza'
            },
            {
                codeJS: `
                const searchInput = document.querySelector("#search input");
                const searchButton = document.querySelector("#search-icon-legacy");
                searchInput.value = "@value";
                searchButton.click();
                `,
                voiceCommand: 'szukaj *',
            },
            {
                codeJS: `
                const video = document.querySelector("video");
                const volume = Number.parseInt("@value");
                video.volume = Number.isNaN() ? video.volume : volume / 100;
                `,
                voiceCommand: 'głośność *'
            },
            {
                codeJS: `
                document.querySelector('#logo-icon-container').click()
                `,
                voiceCommand: 'strona główna'
            },
            {
                codeJS: `
                document.querySelectorAll('#video-title')[Number.parseInt("@value")].click()
                `,
                voiceCommand: 'wybierz *'
            },
        ]
    },
    'www.google.*': {
        'en-US': [
            {
                codeJS: `
                const input = document.querySelector('input#lst-ib');
                input.value = "@value";
                document.querySelector('center input').form.submit();
                `,
                voiceCommand: 'search *',
            },
            {
                codeJS: `
                const selected = Number.parseInt('@value');
                if (!Number.isNaN(selected)) {
                document.querySelectorAll('h3 a')[selected].click();
                }
                `,
                voiceCommand: 'select *',
            },
            {
                codeJS: `
                document.querySelector('a#pnnext').click();
                `,
                voiceCommand: 'next',
            },
            {
                codeJS: `
                document.querySelector('a#pnprev').click();
                `,
                voiceCommand: 'previous',
            },
        ]
    }
};

export default preloads;
