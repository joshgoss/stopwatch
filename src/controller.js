// @ts-check
import { StopwatchView } from './views'
import { Stopwatch } from './models'

/** Stopwatch Controller
 * @typedef {Object} View
 * @property {(state: any) => void} render
 * @property {() => void} pulseOnce
 */

export class StopwatchController {
  /**
   * @param {Stopwatch} model
   * @param {StopwatchView} view
   */
  constructor(model, view) {
    this.model = model
    this.view = view

    // Initial paint
    this.view.render(this.model.state)

    // Wire events
    this.view.elements.startBtn.addEventListener('click', () => {
      this.model.start()
      this.view.pulseOnce()
    })
    this.view.elements.stopBtn.addEventListener('click', () =>
      this.model.stop()
    )
    this.view.elements.lapBtn.addEventListener('click', () => this.model.lap())
    this.view.elements.resetBtn.addEventListener('click', () =>
      this.model.reset()
    )
  }
}
