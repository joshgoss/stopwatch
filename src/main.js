import './style.css'

import { Stopwatch } from './models'
import { StopwatchController } from './controller'
import { StopwatchView } from './views'
import { requireElement } from './utils'

window.addEventListener('DOMContentLoaded', () => {
  const view = new StopwatchView({
    lapBtn: requireElement('lap'),
    lapsList: requireElement('laps'),
    lapTimer: requireElement('lap-timer'),
    resetBtn: requireElement('reset'),
    root: requireElement('stopwatch'),
    startBtn: requireElement('start'),
    stopBtn: requireElement('stop'),
    totalTimer: requireElement('total-timer'),
  })
  const model = new Stopwatch((state) => view.render(state))
  new StopwatchController(model, view)
})
