const VoiceRecognition = (() => {
    let recognition;
    let _stop = false;

    function start() {
        _stop = false;
        const debouncedProcessSpeech = _.debounce(_processSpeech, 500);
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = function(event) {
            let transcript = '';
            let hasFinal = false;
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal)
                hasFinal = true;
                else
                transcript += event.results[i][0].transcript;
            }
            const processed = debouncedProcessSpeech(transcript);
            if (processed && recognition) {
                recognition.stop();
            }
        };
        recognition.onend = function(event) {
            if (!_stop) {
                setTimeout(function() {
                    if (recognition) {
                        recognition.start();
                    }
                }, 1000);
            }
        };
        recognition.start();   
    }

    function stop() {
        if (recognition) {
            _stop = true;
            recognition.abort();
            recognition = null;
        }
    }

    function _processSpeech(transcript) {
        transcript = transcript.toLowerCase().trim();
        let text = 'That is not a valid command.';
        if (transcript) {
            Controls.updateDialog({ target: 'user', text: transcript });
            if (_userSaid(transcript, ['continue'])) {
                text = 'Gaze tracking has been continued.';
                Controls.start();
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['stop'])) {
                text = 'Gaze tracking has been stopped.';
                Controls.stop();
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['download'])) {
                text = 'The highlighted data has been downloaded as a JSON file. Say "close" to close MWS.'
                Controls.scrape();
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['close'])) {
                Controls.end();
                return true;
            } else if (_userSaid(transcript, ['keep'])) {
                const columns = Array.from( new Set(transcript.split(" ").slice(1).map(v => v.toUpperCase())));
                if (!columns.length) {
                    text = 'You did not say any columns names.';
                } else if (!columns.every(c => c.length === 1)) {
                    text = 'Invalid columns.';
                } else {
                    text = `Only columns ${columns.join(" ")} have been selected.`;
                    VisualFeedback.filter({ operation: "keep", columns }); 
                } 
                Controls.updateDialog({
                    target: 'system',
                    text
                }); 
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['remove'])) {
                const columns = Array.from( new Set(transcript.split(" ").slice(1).map(v => v.toUpperCase())));
                if (!columns.length) {
                   text = 'You did not say any columns names.';
                } else if (!columns.every(c => c.length === 1)) {
                    text = 'Invalid columns.';
                } else {
                    text = `Columns ${columns.join(" ")} have been unselected.`;
                    VisualFeedback.filter({ operation: "remove", columns });
                }
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['reset columns'])) {
                text = `All columns are back to being selected.`;
                VisualFeedback.resetColumns();
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['calibrate'])) {
                VisualFeedback.unhighlightRowElements();
                Calibration.render();
                text = 'To calibrate the gaze recognition, click on each of the white circles while looking at them until they fully dissappear';
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['help'])) {
                text = 'Look at the data you want to scape to highlight it. When it is highlighted, say "stop" to stop the gaze recognition and "continue" if the wrong data has been highlighted. If the desired data is highlighted, say "keep" or "remove" with column names (A-Z) to filter columns. For example, "keep A B ". To reset columns, say "reset columns". To download the highlighted data, say "download data".';
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                return;
            }
            Controls.updateDialog({ target: 'system', text });
            VoiceSynthesis.speak(text);
        }
        return false;
    }

    function _userSaid(transcript, commands) {
        for (let i = 0; i < commands.length; i++) {
            if (transcript.indexOf(commands[i]) > -1) {
                return commands[i];
            }
        }
        return false;
    }

    return {
        start,
        stop
    }
})()