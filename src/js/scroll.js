import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { minDesktop } from './helpers/media'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]
const hero = document.querySelectorAll('[data-hero]')
const projectsWrapper = document.querySelector('[data-projects-wrapper]')
const containerWidth = document.querySelector('.container').clientWidth
const sectionContentAreas = [
  ...document.querySelectorAll('[data-section-content'),
].map((el) => el.children[0])

const initializeSectionsTL = () => {
  /* Sections */
  sections.forEach((section, index) => {
    const nextSection = sections[index + 1]
    const heading = section.querySelector('[data-heading]')
    const shapes = [...section.querySelectorAll('[data-shape]')]
    const isProjectSection = section.dataset.section === 'projects'

    const splitText = new Splitting({
      target: heading,
    })

    gsap.set(shapes, {
      scale: 0,
    })

    gsap.set(section, {
      minHeight: window.innerHeight * 2,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        endTrigger: nextSection || false,
        pin: false,
        toggleActions: 'play pause resume reverse',
        toggleClass: 'is-inview',
        scrub: isProjectSection ? 1 : false,
        onEnter: (self) => {
          self.trigger.classList.add('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 0, duration: 0.8 })
          }
          console.log('enter')
        },
        onLeaveBack: (self) => {
          self.trigger.classList.remove('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 1, duration: 0.8 })
          }
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

    /* Projects */
    if (isProjectSection) {
      tl.to(
        projectsWrapper,
        {
          x: '-100%',
        },
        0.5
      )
    }
  })
}

const initializeContentTL = () => {
  /* Text content */
  sectionContentAreas.forEach((el, index) => {
    const top = getComputedStyle(el.parentElement).paddingTop
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${top}`,
        endTrigger: sections[index + 1] ? sections[index + 1] : null,
        pin: true,
        toggleActions: 'play pause resume reverse',
        toggleClass: 'should-show-text',
      },
    })
  })
}

const scroll = () => {
  gsap.set(projectsWrapper, {
    x: window.innerWidth / 2 - containerWidth / 2,
  })

  initializeSectionsTL()
  initializeContentTL()
}

export default scroll
