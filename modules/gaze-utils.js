const GazeUtils = (() => {
    function elementFromPoint(x, y) {
        const node = document.elementFromPoint(x, y);
        if (_isValidNode(node)) {
            if (node.childElementCount) {
                const leaves = DOMHelpers.getLeafNodes([node]);
                for (let i = 0; i < leaves.length; i++) {
                    if (_isValidNode(leaves[i])) {
                        return leaves[i];
                    }
                }
            }
            return node;
        }
        return null;
    }
    function _isValidNode(node) {
        return node && node.tagName && !!document.body.contains(node) && node.id !== Constants.CONTROLS_ELEMENT_ID;
    }
    return {
        elementFromPoint
    }
})();