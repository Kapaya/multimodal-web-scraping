const Scraper = (function() {
   
    function scrape() {
        const data = [];
        const { rowSelector } = WrapperInduction.getRowData();
        if (rowSelector) {
            Array.from(document.querySelectorAll(rowSelector))
                .map(rowElement => {
                    const leaves = DOMHelpers.getLeafNodes([rowElement]);
                    const row = {};
                    leaves.forEach((leaf, i) => {
                        const dataProperty = VisualFeedback.camelCase(Constants.COLUMN_HIGHLIGHT_CLASS);
                        if (leaf.dataset[dataProperty]) {
                            const column = _indexToAlpha(i);
                            row[column] = leaf.textContent;
                        }
                    });
                    data.push(row);
                })
            
        }
        if (data.length) {
            _download({ data })
        }
    }
    function _download({ data }) {
        const filename = _createFileName();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${filename}.json`);
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    function _createFileName() {
        return window.location.hostname.split(".").join("_");
    }
    function _indexToAlpha(i) {
        return String.fromCharCode(97 + i).toUpperCase();
    }
    return {
        scrape
    }
})()