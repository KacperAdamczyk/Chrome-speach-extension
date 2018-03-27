chrome.runtime.onInstalled.addListener(() => {
   console.log('registered');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   console.log(request);
   console.log(sender);
   sendResponse('OK');
});