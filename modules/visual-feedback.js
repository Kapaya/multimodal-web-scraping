const VisualFeedback = (() => {
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
                    .forEach((leaf, i) => {
                        leaf.classList[operation](Constants.COLUMN_HIGHLIGHT_CLASS);
                        const camelCased = camelCase(Constants.COLUMN_HIGHLIGHT_CLASS);
                        if (operation === "add") {
                            leaf.dataset[camelCased] = `[${GazeUtils.indexToAlpha(i)}] `;
                        } else {
                            delete leaf.dataset[camelCased];
                        }
                    });
            });
    }

    function camelCase(value) {
        const parts = value.split("-");
        return parts[0] + parts.slice(1).map(v => v[0].toUpperCase() + v.slice(1)).join("");
    }

    function filter({ columns, operation }) {
        if (_rowSelector && columns.length) {
            const rowElements = document.querySelectorAll(_rowSelector);
            Array
                .from(rowElements)
                .forEach((rowElement) => {
                    _getLeafNodes([rowElement])
                        .forEach((leaf, i) => {
                            const camelCased = camelCase(Constants.COLUMN_HIGHLIGHT_CLASS);
                            const hasColumn = columns.some(column => {
                                column = column === 'BE' ? 'B' : column;
                                if (leaf.dataset[camelCased] === `[${column}] `) {
                                    return true;
                                }
                                return false;
                            });
                            if (operation === "keep" && !hasColumn) {
                                leaf.classList["remove"](Constants.COLUMN_HIGHLIGHT_CLASS); 
                                delete leaf.dataset[camelCased];  
                            } else if (operation === "remove" && hasColumn) {
                                leaf.classList["remove"](Constants.COLUMN_HIGHLIGHT_CLASS); 
                                delete leaf.dataset[camelCased];  
                            }        
                        });
                });
        }
    }

    function resetColumns() {
        if (_rowSelector) {
            highlightRowElements({ rowSelector: _rowSelector });
        }
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
        unhighlightRowElements,
        camelCase,
        filter,
        resetColumns
    }
})()