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

    if (cx > left && cx < right && cy > top && cy < bottom) {
      for (let i = 0; i < targets.length; i++) {
        const [ target, speed = 0 ] = [].concat(targets[i])

        const middleX = width / 2
        const middleY = (height / 2) + top
        const x = (cx - middleX) * speed
        const y = (cy - middleY) * speed

        requestAnimationFrame(() => {
          target.style.transform = `translateX(${x}px) translateY(${y}px)`
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
