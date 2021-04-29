const Constants = (() => {
    const PREFIX  = 'mws-';
    const ROW_HIGHLIGHT_CLASS = `${PREFIX}row-highlight`;
    const COLUMN_HIGHLIGHT_CLASS = `${PREFIX}column-highlight`;
    const CONTROLS_ELEMENT_ID = `${PREFIX}root`;
    return {
        ROW_HIGHLIGHT_CLASS,
        COLUMN_HIGHLIGHT_CLASS,
        CONTROLS_ELEMENT_ID
    }
})()