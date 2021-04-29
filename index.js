chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.command) {
        case 'start':
            Controls.render();
            VoiceRecognition.start();
            GazeRecognition.start();
            break;
        default:
            break;
    }
});