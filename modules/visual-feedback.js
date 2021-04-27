const VisualFeedback = (function(){
    let _rowSelector;

    function highlightRowElements({ rowSelector }) {
        if (_rowSelector) {
            _applyToRowElementClasslist({
                rowSelector: _rowSelector,
                operation: 'remove'
            });
        }
        _applyToRowElementClasslist({
            rowSelector,
            operation: 'add',
        });
        _rowSelector = rowSelector;
    }

    function unhighlightRowElements() {
        if (_rowSelector) {
            _applyToRowElementClasslist({
                rowSelector: _rowSelector,
                operation: 'remove'
            });
        }
    }

    function _applyToRowElementClasslist({ rowSelector, operation }) {
        const rowElements = document.querySelectorAll(rowSelector);
        Array
            .from(rowElements)
            .forEach((rowElement) => {
                rowElement.classList[operation](Constants.ROW_HIGHLIGHT_CLASS);
                _getLeafNodes([rowElement])
                    .forEach(leaf => {
                        leaf.classList[operation](Constants.COLUMN_HIGHLIGHT_CLASS)
                    });
            });
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
        highlightRowElements,
        unhighlightRowElements
    }
})()