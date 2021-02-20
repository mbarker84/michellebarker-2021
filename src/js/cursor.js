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
    duration: 0.3,
    ease: 'sine.out',
  })
})

const cursor = () => {
  window.addEventListener('mousemove', throttledMouseMove, 100)

  gsap.to(hero, {
    '--cursorX': `${50}%`,
    '--cursorY': `${50}%`,
    duration: 0,
  })

  gsap.to(hero, {
    '--maskSize': '20%',
    duration: 0.5,
    ease: 'back.out(2)',
  })
}

export default cursor
