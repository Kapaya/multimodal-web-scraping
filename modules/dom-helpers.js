const DOMHelpers = (() => {
    function getAllClassCombinations(chars) {
        const result = [];
        const f = (prefix, chars) => {
            for (let i = 0; i < chars.length; i++) {
                result.push(`${prefix}.${chars[i]}`);
                f(`${prefix}.${chars[i]}`, chars.slice(i + 1));
            }
        };
        f('', chars);
        return result;
    }
    function areAllSiblings(node, selector) {
        return Array
            .from(document.body.querySelectorAll(selector))
            .every(element => element.parentNode.isSameNode(node.parentNode));
    }
    function inRowSet({ rowSelector, node }) {
        if (rowSelector) {
            const rowElements = Array.from(document.body.querySelectorAll(rowSelector));
            for (let i = 0; i < rowElements.length; i++) {       
                if (rowElements[i].contains(node)) {
                    return true;
                }
            }
        }
        return false;
    }
    function getLeafNodes(nodes, result = []){
        for(var i = 0, length = nodes.length; i < length; i++){
          if(!nodes[i].children || nodes[i].children.length === 0){
            if (nodes[i].offsetParent !== null) {
                result.push(nodes[i]);
            }
          }else{
            result = getLeafNodes(nodes[i].children, result);
          }
        }
        return result;
    }
    return {
        getAllClassCombinations,
        getLeafNodes,
        areAllSiblings,
        inRowSet
    }
})()