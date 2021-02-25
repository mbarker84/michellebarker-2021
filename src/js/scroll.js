import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { minDesktop } from './helpers/media'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]
const hero = document.querySelectorAll('[data-hero]')

const scroll = () => {
  sections.forEach((section, index) => {
    const nextSection = sections[index + 1]
    const heading = section.querySelector('[data-heading]')
    const shapes = [...section.querySelectorAll('[data-shape]')]

    const splitText = new Splitting({
      target: heading,
    })

    gsap.set(shapes, {
      scale: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        endTrigger: nextSection || false,
        pin: minDesktop(),
        toggleActions: 'play pause resume reverse',
        toggleClass: 'is-inview',
        onEnter: (self) => {
          self.trigger.classList.add('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 0, duration: 0.8 })
          }
          console.log('enter')
        },
        onLeave: () => {
          console.log('leave')
        },
        onEnterBack: () => {
          console.log('enter back')
        },
        onLeaveBack: (self) => {
          self.trigger.classList.remove('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 1, duration: 0.8 })
          }
          console.log('enter back')
        },
      },
    })

    tl.to(
      shapes[0],
      {
        scale: 1,
        rotate: 10,
        duration: 0.7,
        ease: 'back.out(2)',
      },
      '+=1.5'
    ).to(shapes[1], {
      scale: 1,
      rotate: -10,
      duration: 0.7,
      ease: 'back.out(2)',
    })
  })
}

export default scroll
