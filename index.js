chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.command) {
        case 'start':
            GazeRecognition.start();
            Controls.render();
            break;
        default:
            break;
    }
});