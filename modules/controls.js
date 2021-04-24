const Controls = (function(){
    const _ELEMENT_ID = 'mws--root';
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
                default:
                    break;
            }
        });
        body.append(controlsElement);
    }
    function createControlsElement() {
        const controlsElementInnerHtml = `
            <span class='title'> MWS </span>
            <button id='end'> End </button>
        `;
        const controlsElement = document.createElement('div');
        controlsElement.id = _ELEMENT_ID;
        controlsElement.innerHTML = controlsElementInnerHtml;
        return controlsElement;
    }
    return {
        render
    }
})();