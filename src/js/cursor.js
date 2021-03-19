import gsap from 'gsap'
import throttle from 'lodash.throttle'
import { isHover, minTablet } from './helpers/media'

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
  if (!isHover()) return

  if (minTablet()) {
    window.addEventListener('mousemove', throttledMouseMove, 100)
  }

  const x = `${minTablet() ? '50%' : '100%'}`
  const y = `${minTablet() ? '50%' : '60%'}`

  gsap.to(hero, {
    '--cursorX': x,
    '--cursorY': y,
    duration: 0,
  })

  gsap.to(hero, {
    '--maskSize': `${minTablet() ? '20%' : '35%'}`,
    duration: 0.5,
    ease: 'back.out(2)',
  })

  gsap.to(hero, {
    '--maskSize2': '28%',
    '--maskSize3': 'calc(28% + 0.1rem)',
    duration: 0.5,
    delay: 0.5,
    ease: 'back.out(2)',
  })
}

export default cursor
