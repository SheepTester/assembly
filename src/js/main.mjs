import { WrappedCanvas, loadImage } from './canvas.mjs'
import { nextFrame, now } from './utils.mjs'

export async function main () {
  const main = new WrappedCanvas()
    .addTo(document.getElementById('canvas-wrapper'))

  function resize () {
    let done
    const onDone = new Promise(resolve => (done = resolve))
    main.resize(onDone)
    done()
    return onDone
  }
  window.addEventListener('resize', resize)
  await resize()

  const [
    seatBackImage,
    headImage
  ] = await Promise.all([
    loadImage('./static/images/seat-back.png'),
    loadImage('./static/images/head.png')
  ])
  const { context: c, width, height } = main
  c.imageSmoothingEnabled = false
  while (true) {
    c.clearRect(0, 0, width, height)
    const scrollX = Math.cos(now() / 100) * 10
    const scrollY = Math.sin(now() / 100) * 10
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 48) {
        c.drawImage(headImage, x - scrollX, y - scrollY - Math.abs(Math.sin(3 * (x + y))) * 20, 32, 32)
      }
    }
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 48) {
        c.drawImage(seatBackImage, x - scrollX, y - scrollY, 32, 32)
      }
    }
    await nextFrame()
  }
}
