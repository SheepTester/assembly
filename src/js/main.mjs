import { WrappedCanvas } from './canvas.mjs'

const main = new WrappedCanvas()
  .addTo(document.getElementById('canvas-wrapper'))

function resize () {
  let done
  const onDone = new Promise(resolve => (done = resolve))
  main.resize(onDone)
  done()
}
window.addEventListener('resize', resize)
resize()

window.requestAnimationFrame(() => {
  const { context: c } = main
  c.imageSmoothingEnabled = false

  c.fillStyle = '#c57f7f'
  c.fillRect(10, 10, 20, 20)

  c.font = '16px "Sans Nouveaux", monospace'
  c.fillStyle = 'white'
  c.fillText('fij', 0, 40)
})
