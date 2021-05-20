const Calibration = (function(){
    let _calibrationElement;
    let _callibrating = false;
    const _calibration_ELEMENT_CONTENT = `
        <span class='circle' style='left: 0; top: 0; opacity: 1'></span>
        <span class='circle' style='left: 0; top: calc(50vh - 15px); opacity: 1'></span>
        <span class='circle' style='left: 0; top: calc(100vh - 25px); opacity: 1'></span>
        <span class='circle' style='left: calc(50vw - 10px); top: 0; opacity: 1'></span>
        <span class='circle' style='left: calc(50vw - 10px); top: calc(50vh - 15px); opacity: 1'></span>
        <span class='circle' style='left: calc(50vw - 10px); top: calc(100vh - 25px); opacity: 1'></span>
        <span class='circle' style='left: calc(100vw - 25px); top: 0; opacity: 1'></span>
    `;
    function render() {
        _calibrationElement = _createCallibrationElement();
        _calibrationElement.addEventListener('click', _calibrationEventListener, true);
        document.body.appendChild(_calibrationElement);
        _callibrating = true;
    }
    function remove() {
        stop();
        const text = 'Calibration complete, can proceed to scrape data from this website. Say "help" for available commands.';
        Controls.updateDialog({
            target: 'system',
            text
        });
        VoiceSynthesis.speak(text);
    }
    function stop() {
        _callibrating = false;
        _calibrationElement.removeEventListener('click', _calibrationEventListener, true);
        _calibrationElement.remove();
    }
    function callibrating(value) {
        if (value) {
            _callibrating = value;
        } else {
            return _callibrating;
        }
    }
    function _calibrationEventListener(event) {
        event.stopPropagation();
        const { target } = event;
        if (target.classList.contains("circle")) {
            const opacity = parseFloat(target.style.opacity);
            if (opacity) {
                // click 8 times for circle to dissappear
                target.style.opacity = opacity - 0.125;
                const allClicked = Array
                    .from(_calibrationElement.querySelectorAll('.circle'))
                    .every(circle => parseFloat(circle.style.opacity) <= 0);
                if (allClicked) {
                    setTimeout(remove, 2000);
                }
            }
        }
        return;
    }
    function _createCallibrationElement() {
        const element = document.createElement('div');
        element.id = Constants.CALIBRATION_ELEMENT_ID;
        element.innerHTML = _calibration_ELEMENT_CONTENT;
        return element;
    }
    return {
        render,
        remove,
        callibrating,
        stop
    }
})();