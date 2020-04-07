export class WrappedCanvas {
  constructor (canvas = document.createElement('canvas')) {
    this.canvas = canvas
    this.canvas.classList.add('canvas')
    this.context = this.canvas.getContext('2d')
    this.width = 0
    this.height = 0
  }

  addTo (wrapper) {
    wrapper.appendChild(this.canvas)
    this.wrapper = wrapper
    return this
  }

  async resize (then = Promise.resolve()) {
    if (this.wrapper) {
      const { width, height } = this.wrapper.getBoundingClientRect()
      const dpr = window.devicePixelRatio
      this.width = width
      this.height = height
      await then
      this.canvas.width = width * dpr
      this.canvas.height = height * dpr
      this.context.scale(dpr, dpr)
    }
    return this
  }
}

export function loadImage (url) {
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.addEventListener('load', e => {
      resolve(image)
    })
    image.addEventListener('error', reject)
    image.src = url
  })
}
