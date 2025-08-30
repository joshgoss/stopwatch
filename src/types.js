// @ts-check

/**
 * @typedef {Object} StopwatchButtons
 * @property {HTMLButtonElement} start
 * @property {HTMLButtonElement} lap
 * @property {HTMLButtonElement} stop
 * @property {HTMLButtonElement} reset
 */

/**
 * State of the stopwatch
 * @typedef {Object} StopwatchState
 * @property {number[]} laps
 * @property {number} lapElapsed
 * @property {number} lapStart
 * @property {boolean} running
 * @property {number} totalElapsed
 * @property {number} totalStart
 */

/**
 * Stopwatch view configuration with actual element references.
 *
 * @typedef {Object} StopwatchViewElements
 * @property {HTMLElement} root - Root container element.
 * @property {HTMLElement} totalTimer - Element for the total timer display.
 * @property {HTMLElement} lapTimer - Element for the lap timer display.
 * @property {HTMLElement} lapsList - Element for the list of laps.
 * @property {HTMLElement} startBtn - Start button element.
 * @property {HTMLElement} lapBtn - Lap button element.
 * @property {HTMLElement} stopBtn - Stop button element.
 * @property {HTMLElement} resetBtn - Reset button element.
 */

/**
 * @callback TickHandler
 * @param {State} state
 */

/**
 * Time parts
 * @typedef {Object} TimeParts
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} centiseconds
 */

export {}
