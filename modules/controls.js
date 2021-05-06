const Controls = (() => {
    let controlsElement;
    function render() {
        const body = document.querySelector('body');
        controlsElement = _createControlsElement();
        controlsElement.addEventListener('click', (event) => {
            const { target } = event;
            const method = target.id;
            if (method) {
                this[method]()
            }
        });
        body.append(controlsElement);
    }
    function stop() {
        GazeRecognition.pause();
    }
    function start() {
        GazeRecognition.resume();
    }
    function end() {
        GazeRecognition.stop();
        VoiceRecognition.stop();
        if (controlsElement) {
            controlsElement.remove();
        }
    }
    function scrape() {
        Scraper.scrape();
    }
    function reset() {
        VisualFeedback.resetColumns();
    }
    function _createControlsElement() {
        const controlsElementInnerHtml = `
            <button id='scrape' class='btn btn-outline-light'> Download </button>
            <button id='reset' class='btn btn-outline-light'> Reset Columns </button>
            <button id='start' class='btn btn-outline-light'> Lock </button>
            <button id='stop' class='btn btn-outline-light'> Unlock </button>
            <button id='end' class='btn btn-outline-light'> Close </button>
        `;
        const controlsElement = document.createElement('div');
        controlsElement.id = Constants.CONTROLS_ELEMENT_ID;
        controlsElement.innerHTML = controlsElementInnerHtml;
        return controlsElement;
    }
    return {
        render,
        start,
        stop,
        end,
        scrape,
        reset
    }
})();