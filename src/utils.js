// @ts-check

/** @typedef {import('./types').TimeParts} TimeParts */

/**
 * Convert stopwatch time parts back into milliseconds.
 *
 * @param {TimeParts} parts - The time parts (minutes, seconds, centiseconds).
 * @returns {number} Duration in milliseconds.
 */
export function joinTime(parts) {
  const { minutes, seconds, centiseconds } = parts
  return minutes * 60_000 + seconds * 1_000 + centiseconds * 10
}

/**
 * Pad a number to at least 2 digits with leading zeroes.
 *
 * @param {number} n - The number to format.
 * @returns {string} The number as a 2-digit string (e.g. 5 → "05").
 */
export function pad2(n) {
  return String(n).padStart(2, '0')
}

/**
 * Require an element by its DOM id.
 *
 * @param {string} id - The element ID to look up.
 * @returns {HTMLElement} The found element.
 * @throws {Error} If no element with that id exists in the document.
 */
export function requireElement(id) {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing element: #${id}`)
  return el
}

/**
 * Split a duration in milliseconds into stopwatch parts.
 *
 * @param {number} ms - Duration in milliseconds.
 * @returns {TimeParts}
 *   An object with minutes, seconds, and centiseconds.
 */
export function splitTime(ms) {
  const minutes = Math.floor(ms / 60000) % 60
  const seconds = Math.floor((ms % 60000) / 1000) % 60
  const centiseconds = Math.floor((ms % 1000) / 10) % 100
  return { minutes, seconds, centiseconds }
}
