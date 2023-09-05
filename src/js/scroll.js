import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { minDesktop } from './helpers/media'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]
const hero = document.querySelectorAll('[data-hero]')

const sectionContentAreas = [
  ...document.querySelectorAll('[data-section-content'),
].map((el) => el.children[0])

const initializePageTL = () => {
  if (!minDesktop()) return

  /* Page */
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.page-content',
        start: `top ${window.innerHeight * 0.8}`,
        toggleActions: 'play none none reverse',
      },
    })
    .to(hero, {
      opacity: 0,
      duration: 0.8,
    })

  gsap.timeline({
    scrollTrigger: {
      trigger: '.page-content',
      start: 'top top',
      toggleActions: 'play pause resume reverse',
      onEnter: () => {
        document.body.classList.add('is-scrolled')
      },
      onLeaveBack: () => {
        document.body.classList.remove('is-scrolled')
      },
    },
  })
}

const initializeSectionsTL = () => {
  /* Sections */
  sections.forEach((section) => {
    const heading = section.querySelector('[data-heading]')

    new Splitting({
      target: heading,
    })
  })
}

const initializeContentTL = () => {
  const aboutSection = sections.find((el) => el.dataset.section === 'about')
  const aboutImgWrapper = aboutSection.querySelector('[data-img-wrapper]')

  if (minDesktop()) {
    gsap.set(aboutImgWrapper, {
      opacity: 0,
      rotate: 60,
      scale: 0,
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: aboutImgWrapper,
          start: `top ${window.innerHeight * 0.9}`,
          // endTrigger: 600,
          toggleActions: 'play pause resume reverse',
        },
      })
      .to(aboutImgWrapper, {
        opacity: 1,
        rotate: -5,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
  }

  /* Text content */
  sectionContentAreas.forEach((el, index) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${window.innerHeight * 0.9}`,
        endTrigger: sections[index + 1] ? sections[index + 1] : null,
        toggleActions: 'play pause resume reverse',
        toggleClass: 'should-show-text',
      },
    })
  })
}

const scroll = () => {
  initializeSectionsTL()
  initializeContentTL()
  initializePageTL()
}

export default scroll
