/** @typedef {import('./types').StopwatchButtons} StopwatchButtons */
/** @typedef {import('./types').StopwatchState} StopwatchState */
/** @typedef {import('./types').StopwatchViewElements} StopwatchViewElements */
/** @typedef {import('./types').TimeParts} TimeParts */

import { pad2, joinTime, splitTime, requireElement } from './utils.js'

const HIDDEN_CLASS = 'hidden'

/* ============== DigitalWheel ============== */
/**
 * DigitalWheel View A single rolling digit (0–9) using a two-row roller.
 */
class DigitWheelView {
  constructor() {
    this.root = document.createElement('span')
    this.root.className = 'digit'
    this.roller = document.createElement('span')
    this.roller.className = 'roller'
    this.cur = document.createElement('span')
    this.cur.className = 'val cur'
    this.next = document.createElement('span')
    this.next.className = 'val next'
    this.roller.append(this.cur, this.next)
    this.root.appendChild(this.roller)
    this.value = 0
    this.animating = false

    this.setInstant(0)

    this.roller.addEventListener(
      'transitionend',
      () => {
        this.cur.textContent = this.next.textContent
        this.roller.style.transition = 'none'
        this.roller.style.transform = 'translateY(0)'
        // force reflow to lock in reset
        void this.roller.offsetWidth
        this.roller.style.transition = '' // restore default
        this.animating = false
      },
      { passive: true }
    )
  }

  /**
   * Set the digit immediately (no animation).
   * @param {number} d
   */
  setInstant(d) {
    this.value = d
    this.cur.textContent = String(d)
    this.next.textContent = String((d + 1) % 10)
    this.roller.style.transform = 'translateY(0)'
  }

  /**
   * Roll to the provided digit. If it’s exactly (value+1)%10, we roll once.
   * If it’s a jump (e.g., 9 -> 3), we just snap (avoids multi-turn loops).
   * @param {number} d 0..9
   */
  set(d) {
    d = Math.floor(d) % 10
    if (d === this.value) return

    // If exactly next, animate one step
    const expectedNext = (this.value + 1) % 10
    if (d === expectedNext && !this.animating) {
      this.animating = true
      // ensure cur shows current, next shows destination
      this.cur.textContent = String(this.value)
      this.next.textContent = String(d)
      // roll up by 100%
      this.roller.style.transform = 'translateY(-100%)'
      this.value = d
    } else {
      // snap instantly (e.g., when seconds/minutes digit changes due to carry)
      this.setInstant(d)
    }
  }

  get el() {
    return this.root
  }
}

class TimerView {
  /**
   * @param {HTMLElement} container - The DOM element that will hold the timer
   */
  constructor(container) {
    this.container = container
    this.container.innerHTML = ''
    this.container.classList.add('wheels')

    this.minuteTens = new DigitWheelView()
    this.minuteOnes = new DigitWheelView()
    this.secondTens = new DigitWheelView()
    this.secondOnes = new DigitWheelView()
    this.centisecondTens = new DigitWheelView()
    this.centisecondOnes = new DigitWheelView()

    // separators
    const colon = document.createElement('span')
    colon.className = 'sep'
    colon.textContent = ':'

    const dot = document.createElement('span')
    dot.className = 'sep'
    dot.textContent = '.'

    // assemble
    this.container.append(
      this.minuteTens.el,
      this.minuteOnes.el,
      colon,
      this.secondTens.el,
      this.secondOnes.el,
      dot,
      this.centisecondTens.el,
      this.centisecondOnes.el
    )

    this.setFromParts({ seconds: 0, minutes: 0, centiseconds: 0 })
  }

  /**
   * Update display from stopwatch parts.
   * @param {TimeParts} timeParts
   */
  setFromParts(timeParts) {
    const ms = joinTime(timeParts)
    this.update(ms)
  }

  /**
   * Update view
   * @param {number} ms
   */
  update(ms) {
    const timeParts = splitTime(ms)
    const mm = pad2(timeParts.minutes),
      ss = pad2(timeParts.seconds),
      cc = pad2(timeParts.centiseconds)

    console.log('mm is:', mm)
    console.log('ss is: ', ss)

    this.minuteTens.set(Number(mm[0]))
    this.minuteOnes.set(Number(mm[1]))
    this.secondTens.set(Number(ss[0]))
    this.secondOnes.set(Number(ss[1]))
    this.centisecondTens.set(Number(cc[0]))
    this.centisecondOnes.set(Number(cc[1]))
  }
}

export class StopwatchView {
  /**
   * Create a stopwatch view.
   * @param {StopwatchViewElements} elements
   */
  constructor(elements) {
    this.elements = elements

    // build rolling displays inside the timer containers
    this.totalDisplay = new TimerView(elements.totalTimer)
    this.lapDisplay = new TimerView(elements.lapTimer)

    this._lastLapCount = 0
  }

  /**
   * Render stopwatch
   * @param {StopwatchState} state
   */
  render(state) {
    // Update digit wheels
    this.totalDisplay.update(state.totalElapsed)
    this.lapDisplay.update(state.lapElapsed)

    // Lap progress ring (0→1 every 1000ms)
    const p = (state.lapElapsed % 1000) / 1000
    this.elements.root.style.setProperty('--p', String(p))

    // Running class for blinking separators
    this.elements.root.classList.toggle('running', state.running)

    // Buttons
    this._updateButtons(state)

    // Laps
    this._renderLaps(state.laps)
  }

  /**
   * Render stopwatch
   * @param {StopwatchState} state
   */
  _updateButtons(state) {
    this.elements.startBtn.classList.toggle(HIDDEN_CLASS, state.running)
    this.elements.lapBtn.classList.toggle(HIDDEN_CLASS, !state.running)
    this.elements.stopBtn.classList.toggle(HIDDEN_CLASS, !state.running)
    this.elements.resetBtn.classList.toggle(
      HIDDEN_CLASS,
      state.running || (state.totalElapsed === 0 && state.laps.length === 0)
    )
  }

  /**
   * Render list of laps
   * @param {number[]} laps
   */
  _renderLaps(laps) {
    if (this._lastLapCount === laps.length) return
    this._lastLapCount = laps.length

    if (!laps.length) {
      this.elements.lapsList.innerHTML = ''
      return
    }

    // Build list (newest first)
    const items = laps
      .slice()
      .reverse()
      .map((elapsed, i) => {
        const number = laps.length - i
        const { minutes: m, seconds: s, centiseconds: c } = splitTime(elapsed)
        return `<li><span class="label">Lap ${number}</span><span class="time">${pad2(m)}:${pad2(s)}.${pad2(c)}</span></li>`
      })
    this.elements.lapsList.innerHTML = items.join('')

    // Animate newest item
    const first = this.elements.lapsList.firstElementChild
    if (first) {
      first.classList.add('enter')
      first.addEventListener(
        'animationend',
        () => first.classList.remove('enter'),
        { once: true }
      )
    }
  }

  pulseOnce() {
    this.elements.root.classList.add('pulse')
    setTimeout(() => this.elements.root.classList.remove('pulse'), 200)
  }
}
