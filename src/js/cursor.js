import gsap from 'gsap'
import throttle from 'lodash.throttle'

const hero = document.querySelector('[data-hero]')

const throttledMouseMove = throttle((e) => {
  const { clientX, clientY } = e
  const x = Math.round((clientX / window.innerWidth) * 100)
  const y = Math.round((clientY / window.innerHeight) * 100)

  gsap.to(hero, {
    '--cursorX': `${x}%`,
    '--cursorY': `${y}%`,
    duration: 0.5,
  })
})

const cursor = () => {
  window.addEventListener('mousemove', throttledMouseMove, 100)
}

export default cursor
