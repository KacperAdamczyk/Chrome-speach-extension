import {ICommandStorage} from './models/CommandStorage';

const preloads: ICommandStorage = {
    '.*': {
        'en-US': [
            {
                codeJS: 'window.alert("@value");',
                voiceCommand: 'alert *'
            },
            {
                codeJS:
`switch('@value') {
case 'facebook': window.open('https://www.facebook.com/'); break;
case 'youtube': window.open('https://www.youtube.com/'); break;
case 'google': window.open('https://www.google.com/'); break;
}`,
                voiceCommand: 'go to *'
            }
        ],
        'pl-PL': [
            {
                codeJS: 'window.alert("@value");',
                voiceCommand: 'alert *'
            },
            {
                codeJS:
`switch('@value') {
case 'facebook': window.open('https://www.facebook.com/'); break;
case 'youtube': window.open('https://www.youtube.com/'); break;
case 'google': window.open('https://www.google.com/'); break;
}`,
                voiceCommand: 'przejdź do *'
            }
        ]
    },
    'youtube.com*': {
        'en-US': [
            {
                codeJS:
`const video = document.querySelector("video");
video.play();`
                ,
                voiceCommand: 'play'
            },
            {
                codeJS:
`const video = document.querySelector("video");
video.pause();`,
                voiceCommand: 'pause'
            },
            {
                codeJS:
`const searchInput = document.querySelector("#search input");
const searchButton = document.querySelector("button.ytd-searchbox");
searchInput.value = "@value";
setTimeout(() => searchButton.click(), 200);`,
                voiceCommand: 'search *',
            },
            {
                codeJS:
`const video = document.querySelector("video");
const volume = @numericValue;
video.volume = Number.isNaN(volume) ? video.volume : volume / 100;`,
                voiceCommand: 'volume *'
            },
            {
                codeJS:
`const video = document.querySelector("video");
video.volume = 0;`,
                voiceCommand: 'mute'
            },
            {
                codeJS: "document.querySelector('#logo-icon-container').click()",
                voiceCommand: 'main page'
            },
            {
                codeJS: "document.querySelectorAll('ytd-search img')[@numericValue].click();",
                voiceCommand: 'select *'
            }
        ],
        'pl-PL': [
            {
                codeJS:
`const video = document.querySelector("video");
video.play();`,
                voiceCommand: 'wznów'
            },
            {
                codeJS:
`const video = document.querySelector("video");
video.pause();`,
                voiceCommand: 'pauza'
            },
            {
                codeJS:
`const searchInput = document.querySelector("#search input");
const searchButton = document.querySelector("button.ytd-searchbox");
searchInput.value = "@value";
searchButton.click();`,
                voiceCommand: 'szukaj *',
            },
            {
                codeJS:
`const video = document.querySelector("video");
video.volume = 0;`,
                voiceCommand: 'wycisz'
            },
            {
                codeJS:
`const video = document.querySelector("video");
const volume = @numericValue;
video.volume = Number.isNaN(volume) ? video.volume : volume / 100;`,
                voiceCommand: 'głośność *'
            },
            {
                codeJS: "document.querySelector('#logo-icon-container').click()",
                voiceCommand: 'strona główna'
            },
            {
                codeJS: "document.querySelectorAll('ytd-search img')[@numericValue].click();",
                voiceCommand: 'wybierz *'
            },
        ]
    },
    'www.google.*': {
        'en-US': [
            {
                codeJS:
`const input = document.querySelector('input#lst-ib');
input.value = "@value";
document.querySelector('center input').form.submit();`,
                voiceCommand: 'search *',
            },
            {
                codeJS:
`const selected = Number.parseInt('@value');
if (!Number.isNaN(selected)) {
document.querySelectorAll('h3 a')[selected].click();
}`,
                voiceCommand: 'select *',
            },
            {
                codeJS: "document.querySelector('a#pnnext').click();",
                voiceCommand: 'next',
            },
            {
                codeJS: "document.querySelector('a#pnprev').click();",
                voiceCommand: 'previous',
            },
        ]
    }
};

export default preloads;
