import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]

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
        pin: true,
        toggleActions: 'play pause resume reverse',
        toggleClass: 'is-inview',
        onEnter: (self) => {
          self.trigger.classList.add('is-inview')
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
      '+=1.3'
    ).to(shapes[1], {
      scale: 1,
      rotate: -10,
      duration: 0.7,
      ease: 'back.out(2)',
    })
  })
}

export default scroll
