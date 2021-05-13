const VoiceSynthesis = (function(){
    const MESSAGE_RATE = 1;
    let voicesReady = false;
    window.speechSynthesis.onvoiceschanged = () => {
        voicesReady = true;
    }
    function speak(message) {
        if (voicesReady) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US'
            utterance.text = message;
            utterance.rate = MESSAGE_RATE;
            VoiceRecognition.stop();
            utterance.onend = () => {
                Controls.unSetActiveDialogTextColor({ target: 'system' });
                VoiceRecognition.start();
            } ;
            Controls.setActiveDialogTextColor({ target: 'system' });
            speechSynthesis.speak(utterance);
        }
    }
    return {
        speak
    }
})();