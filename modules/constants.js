const Constants = (() => {
    const PREFIX  = 'mws';
    const ROW_HIGHLIGHT_CLASS = `${PREFIX}-row-highlight`;
    const COLUMN_HIGHLIGHT_CLASS = `${PREFIX}-column-highlight`;
    const CONTROLS_ELEMENT_ID = `${PREFIX}-root`;
    const DIALOG_ACTIVE_CLASS = `${PREFIX}-dialog-active`;
    const DIALOG_INACTIVE_CLASS =  `${PREFIX}-dialog-inactive`;
    const CALIBRATION_ELEMENT_ID = `${PREFIX}-calibration`;
    return {
        ROW_HIGHLIGHT_CLASS,
        COLUMN_HIGHLIGHT_CLASS,
        CONTROLS_ELEMENT_ID,
        DIALOG_ACTIVE_CLASS,
        DIALOG_INACTIVE_CLASS,
        CALIBRATION_ELEMENT_ID
    }
})()