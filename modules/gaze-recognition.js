const GazeRecognition = (function(){
    function start() {
        webgazer
            .showVideo(false)
            .setGazeListener((data, elapsedTime) => {
                if (data == null) {
                    return;
                }
                const xprediction = data.x;
                const yprediction = data.y;
                const element = document.elementFromPoint(xprediction, yprediction);
                if (WrapperInduction.isValidNode(element)) {
                    console.log(element);
                    const rowElement = WrapperInduction.findRowElement(element);
                    console.log(rowElement);
                }
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