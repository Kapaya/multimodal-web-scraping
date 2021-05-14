chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.command) {
        case 'start':
            VoiceRecognition.start();
            Controls.render();
            GazeRecognition.start();
            break;
        default:
            break;
    }
});