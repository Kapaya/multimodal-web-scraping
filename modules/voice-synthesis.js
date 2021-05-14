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
            utterance.onstart = () => {
                VoiceRecognition.stop();
            };
            utterance.onend = () => {
                Controls.unSetDialogClass({
                    target: 'system',
                    className: Constants.DIALOG_ACTIVE_CLASS
                });
                Controls.unSetDialogClass({
                    target: 'user',
                    className: Constants.DIALOG_INACTIVE_CLASS
                });
                Controls.setDialogClass({
                    target: 'user',
                    className: Constants.DIALOG_ACTIVE_CLASS
                });
                VoiceRecognition.start();
            };
            Controls.setDialogClass({
                target: 'system',
                className: Constants.DIALOG_ACTIVE_CLASS
            });
            Controls.unSetDialogClass({
                target: 'user',
                className: Constants.DIALOG_ACTIVE_CLASS
            });
            Controls.setDialogClass({
                target: 'user',
                className: Constants.DIALOG_INACTIVE_CLASS
            });
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }
    }
    return {
        speak
    }
})();