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
            if (processed) {
                recognition.stop();
            }
        };
        recognition.onend = function(event) {
            if (!_stop) {
                setTimeout(function() {
                    recognition.start();
                }, 1000);
            }
        };
        recognition.start();   
    }

    function stop() {
        if (recognition) {
            _stop = true;
            recognition.abort();
        }
    }

    function _processSpeech(transcript) {
        transcript = transcript.toLowerCase().trim();
        let text = 'That is not a valid command.';
        if (transcript) {
            Controls.updateDialog({ target: 'user', text: transcript });
            if (_userSaid(transcript, ['unlock'])) {
                text = 'Gaze has been unlocked.';
                Controls.start();
                Controls.updateDialog({
                    target: 'system',
                    text
                });
                VoiceSynthesis.speak(text);
                return true;
            } else if (_userSaid(transcript, ['lock'])) {
                text = 'Gaze has been locked. Say "keep" or "remove" with column names (A-Z) to filter. For example, "keep A B ". To download the highlighted data, say "download data" or "unlock" to highlight different data.';
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
                    text = `Only columns ${columns.join(" ")} have been selected. Say "reset columns" to reset or "download" to download data.`;
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
                    text = `Columns ${columns.join(" ")} have been unselected. Say "reset columns" to reset or "downlod data" to download data.`;
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