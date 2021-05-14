const Controls = (() => {
    let controlsElement;
    const DEFAULT_SYSTEM_MESSAGE = 'Wait for the red circle to appear which tracks your gaze. Then, look at the data you want to scrape and say "stop" once it is highlighted. To improve gaze recognition, say "calibrate". To see all commands, say "help".';
    function render() {
        const body = document.querySelector('body');
        controlsElement = _createControlsElement();
        controlsElement.addEventListener('click', (event) => {
            const { target } = event;
            const method = target.id;
            if (method && this[method]) {
                this[method]();
            }
        });
        body.append(controlsElement);
        VoiceSynthesis.speak(DEFAULT_SYSTEM_MESSAGE);
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
        VisualFeedback.unhighlightRowElements();
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
    function updateDialog({ target, text }) {
        const dialogText = controlsElement.querySelector(`.dialog .${target} .text`);
        dialogText.textContent = text;
    }
    function setDialogClass({ target, className }) {
        const dialogLabel = controlsElement.querySelector(`.dialog .${target} .label`);
        dialogLabel.classList.add(className);
    }
    function unSetDialogClass({ target, className }) {
        const dialogLabel = controlsElement.querySelector(`.dialog .${target} .label`);
        dialogLabel.classList.remove(className);
    }
    function getControlsWidth() {
        return controlsElement.querySelector(".video").offsetWidth;
    }
    function initVideoSection() {
        controlsElement.querySelector(".video").style = `margin-bottom:${controlsElement.offsetWidth - 80}px`;
    }
    function _createControlsElement() {
        const controlsElementInnerHtml = `
            <div class='dialog'>
                <div class='title'>
                    <span class='text'>Multimodal Web Scraping </span>
                </div>
                <div class='video'></div>
                <div class='system'>
                    <span class='label'>MWS</span>
                    <span class='text'>${DEFAULT_SYSTEM_MESSAGE}</span>
                </div>
                <div class='user'>
                    <span class='label'>You</span>
                    <span class='text'></span>
                </div>
            </div>                     
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
        reset,
        updateDialog,
        setDialogClass,
        unSetDialogClass,
        getControlsWidth,
        initVideoSection
    }
})();