const VoiceRecognition = (() => {
    const CONTROL_GRAMMER = '#JSGF V1.0; grammar controls; public <control> = start | stop | end ;';
    let recognition;

    function start() {
        recognition = new webkitSpeechRecognition();
        const speechRecognitionList = new webkitSpeechGrammarList();
        speechRecognitionList.addFromString(CONTROL_GRAMMER, 1);  
        recognition.grammars = speechRecognitionList;
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;  
        recognition.onresult = (event) => {     
            const results = event.results;
            const command = results[results.length - 1][0].transcript.trim();
            console.log("COMMAND:", command);
            if (Controls[command]) {
                Controls[command]();
            }
        }
        recognition.start();
    }

    function stop() {
        recognition.abort();
    }

    return {
        start,
        stop
    }
})()