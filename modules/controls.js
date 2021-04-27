const Controls = (function(){
    function render() {
        const body = document.querySelector('body');
        const controlsElement = createControlsElement();
        controlsElement.addEventListener('click', (event) => {
            const { target } = event;
            switch (target.id) {
                case 'end':
                    GazeRecognition.stop();
                    controlsElement.remove();
                    break;
                case 'lock':
                    GazeRecognition.pause();
                    break;
                case 'unlock':
                    GazeRecognition.resume();
                default:
                    break;
            }
        });
        body.append(controlsElement);
    }
    function createControlsElement() {
        const controlsElementInnerHtml = `
            <button id='unlock' class='btn btn-outline-light'> Unlock </button>
            <button id='lock' class='btn btn-outline-light'> Lock </button>
            <button id='end' class='btn btn-outline-light'> End </button>
        `;
        const controlsElement = document.createElement('div');
        controlsElement.id = Constants.CONTROLS_ELEMENT_ID;
        controlsElement.innerHTML = controlsElementInnerHtml;
        return controlsElement;
    }
    return {
        render
    }
})();