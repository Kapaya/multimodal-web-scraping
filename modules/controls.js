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
        if (controlsElement) {
            controlsElement.remove();
        }
    }
    function scrape() {
        Scraper.scrape();
    }
    function _createControlsElement() {
        const controlsElementInnerHtml = `
            <button id='scrape' class='btn btn-outline-light'> Scrape </button>
            <button id='start' class='btn btn-outline-light'> Start </button>
            <button id='stop' class='btn btn-outline-light'> Stop </button>
            <button id='end' class='btn btn-outline-light'> End </button>
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
        scrape
    }
})();