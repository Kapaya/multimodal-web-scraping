const GazeUtils = (function(){
    function elementFromPoint(x, y) {
        const node = document.elementFromPoint(x, y);
        if (_isValidNode(node)) {
            if (node.childElementCount) {
                const leaves = _getLeafNodes([node]);
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
    function _getLeafNodes(nodes, result = []){
        for(var i = 0, length = nodes.length; i < length; i++){
          if(!nodes[i].children || nodes[i].children.length === 0){
            result.push(nodes[i]);
          }else{
            result = _getLeafNodes(nodes[i].children, result);
          }
        }
        return result;
    }
    return {
        elementFromPoint
    }
})();