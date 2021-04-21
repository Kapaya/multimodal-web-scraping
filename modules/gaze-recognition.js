const GazeRecognition = (function(){
    function start() {
        webgazer
            .showVideo(false)
            .setGazeListener((data, elapsedTime) => {
                if (data == null) {
                    return;
                }
                const xprediction = data.x; //these x coordinates are relative to the viewport
                const yprediction = data.y; //these y coordinates are relative to the viewport
                console.log(elapsedTime); //elapsed time is based on time since begin was called
                console.log(`WebGazer <${xprediction}, ${yprediction}>`);
            }).begin();
    }
    function pause() {
        webgazer.pause();
    }
    function resume() {
        webgazer.resume();
    }
    function stop() {
        webgazer.end();
    }
    return {
        start,
        pause,
        resume,
        stop
    }
})();