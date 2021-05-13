const Controls = (() => {
    let controlsElement;
    const DEFAULT_SYSTEM_MESSAGE = 'Wait for the red circle to appear which tracks your gaze. Then, look at the rows you want to scrape and say "lock" once they are highlighted. If the wrong rows are highlighted, say "unlock" to try again.';
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
    function setActiveDialogTextColor({ target }) {
        const dialogText = controlsElement.querySelector(`.dialog .${target} .text`);
        dialogText.classList.add(Constants.ACTIVE_DIALOG_TEXT);
    }
    function unSetActiveDialogTextColor({ target }) {
        const dialogText = controlsElement.querySelector(`.dialog .${target} .text`);
        dialogText.classList.remove(Constants.ACTIVE_DIALOG_TEXT);
    }
    function _createControlsElement() {
        const controlsElementInnerHtml = `
            <div class='dialog'>
                <div class='title'>
                    <span class='text'>Multimodal Web Scraping </span>
                </div>
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
        setActiveDialogTextColor,
        unSetActiveDialogTextColor
    }
})();