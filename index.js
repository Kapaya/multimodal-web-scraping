chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.command) {
        case 'start':
            Controls.render();
            GazeRecognition.start();
            VoiceRecognition.start();
            break;
        default:
            break;
    }
});