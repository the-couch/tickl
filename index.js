let listener = null
let handlers = []

function move ({ clientX: cx, clientY: cy }) {
  for (let i = 0; i < handlers.length; i++) {
    handlers[i](cx, cy)
  }
}

export default function init(ctx = document.body, targets) {
  if (!listener) listener = document.addEventListener('mousemove', move)

  function handler (cx, cy) {
    const {
      left,
      right,
      top,
      bottom,
      height,
      width
    } = ctx.getBoundingClientRect()

    // are mouse coords inside ctx?
    if (cx > left && cx < right && cy > top && cy < bottom) {
      for (let i = 0; i < targets.length; i++) {
        const [ target, speed = 0 ] = [].concat(targets[i])

        const middleX = width / 2
        const middleY = (height / 2) + top

        // mouse coords relative to ctx
        const x = ((cx - left) - middleX) * speed
        const y = ((cy - top) - middleY) * speed

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
