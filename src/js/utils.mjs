export function wait (delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function nextFrame () {
  return new Promise(resolve => window.requestAnimationFrame(resolve))
}

export function now () {
  return Date.now()
}
