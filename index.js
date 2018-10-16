let listener = null
let handlers = []

function move ({ clientX: dx, clientY: dy }) {
  for (let i = 0; i < handlers.length; i++) {
    handlers[i](dx, dy)
  }
}

export default function init(ctx = document.body, targets) {
  if (!listener) listener = document.addEventListener('mousemove', move)

  // delta x, y
  function handler (dx, dy) {
    const {
      left,
      right,
      top,
      bottom,
      height,
      width
    } = ctx.getBoundingClientRect()

    // are mouse coords inside ctx?
    if (dx > left && dx < right && dy > top && dy < bottom) {
      for (let i = 0; i < targets.length; i++) {
        const [ target, speed = 0 ] = [].concat(targets[i])

        // center of ctx
        const cx = (width / 2) + left
        const cy = (height / 2) + top

        const x = (dx - cx) * speed
        const y = (dy - cy) * speed

        requestAnimationFrame(() => {
          target.style.transform = `translate3d(${x}px, ${y}px, 0)`
        })
      }
    } else {
      for (let i = 0; i < targets.length; i++) {
        targets[i][0].style.transform = ''
      }
    }
  }

  handlers.push(handler)

  return () => {
    handlers.splice(handlers.indexOf(handler), 1)
  }
}
