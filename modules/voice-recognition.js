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
        _stop = true;
        recognition.abort();
    }

    function _processSpeech(transcript) {
        transcript = transcript.toLowerCase().trim();
        console.log("COMMAND:", transcript);
        if (_userSaid(transcript, ['start', 'unlock'])) {
            Controls.start();
            return true;
        } else if (_userSaid(transcript, ['stop', 'lock'])) {
            Controls.stop();
            return true;
        } else if (_userSaid(transcript, ['scrape'])) {
            Controls.scrape();
            return true;
        } else if (_userSaid(transcript, ['end'])) {
            Controls.end();
            return true;
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