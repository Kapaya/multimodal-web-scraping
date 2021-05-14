const GazeRecognition = (() => {
    function start() {
        const width = Controls.getControlsWidth();
        Controls.initVideoSection();
        webgazer.params.videoViewerWidth = width
        webgazer.params.videoViewerHeight = width - 80;
        webgazer
            .setGazeListener((data, elapsedTime) => {
                if (data == null || Calibration.callibrating()) {
                    return;
                }
                VisualFeedback.unhighlightRowElements();
                const element = GazeUtils.elementFromPoint(data.x, data.y);
                if (element) {
                    const result = WrapperInduction.findRowElement(element);
                    if (result) {
                        const { rowElement, rowSelector } = result;
                        if (rowSelector ) {
                            VisualFeedback.highlightRowElements({ rowSelector });
                        }
                    }
                }
            })
            .begin();
        
    }
    function pause() {
        webgazer.pause();
    }
    function resume() {
        webgazer.resume();
    }
    function stop() {
        VisualFeedback.unhighlightRowElements();
        webgazer.end();
    }
    return {
        start,
        pause,
        resume,
        stop
    }
})();