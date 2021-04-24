chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const handler = handlers[request.command];
    if (handler) {
        handler.call(this, request, sender, sendResponse)
    }
    return true;
});

chrome.contextMenus.create({
    id: 'mws',
    title: 'MWS',
    contexts: ['page'],
    type: 'normal',
    onclick: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length) {
                chrome.tabs.sendMessage(tabs[0].id, { command: 'start' })
            }
        })
    }
});

const handlers = {
    start: forwardToContentScripts
}

function forwardToContentScripts(request, sender, sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs & tabs.length) {
            chrome.tabs.sendMessage(tabs[0].id, request);
        }
    });
}