/** @typedef {import('./types').StopwatchState} StopwatchState */
/** @typedef {import('./types').TickHandler} TickHandler */

/** @type {StopwatchState} */
const defaultState = {
  laps: [],
  lapElapsed: 0,
  lapStart: 0,
  running: false,
  totalElapsed: 0,
  totalStart: 0,
}

export class Stopwatch {
  /**
   * @param {number} [updateIntervalMs=16] - interval in ms
   * @param {(state: StopwatchState) => void} onTick - called on each tick with elapsed time
   */
  constructor(onTick, updateIntervalMs) {
    /** @type {StopwatchState} */
    this._state = {
      ...defaultState,
      laps: [],
    }

    this._intervalId = null
    this.internalMs = updateIntervalMs
    this.onTick = onTick
  }
  get state() {
    return this._state
  }

  start() {
    if (this._state.running) return
    const now = Date.now()
    this._state.totalStart = now - this._state.totalElapsed
    this._state.lapStart = now - this._state.lapElapsed
    this._state.running = true

    this._intervalId = setInterval(() => {
      const t = Date.now()
      this._state.totalElapsed = t - this._state.totalStart
      this._state.lapElapsed = t - this._state.lapStart
      this.onTick?.(this.state)
    }, this.internalMs)

    this.onTick?.(this.state)
  }

  stop() {
    if (!this._state.running) return
    if (this._intervalId != null) clearInterval(this._intervalId)
    this._intervalId = null
    this._state.running = false
    this.onTick?.(this.state)
  }

  /** @returns {number} lap duration in ms */
  lap() {
    const d = this._state.lapElapsed
    this._state.laps.push(d)
    this._state.lapElapsed = 0
    this._state.lapStart = Date.now()
    this.onTick?.(this.state)
    return d
  }

  reset() {
    this.stop()
    this._state = { ...defaultState, laps: [] }
    this.onTick?.(this._state)
  }
}
