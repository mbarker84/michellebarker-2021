import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { minDesktop, minTablet } from './helpers/media'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]
const hero = document.querySelectorAll('[data-hero]')
const sectionContentAreas = [
  ...document.querySelectorAll('[data-section-content'),
].map((el) => el.children[0])
const menuLinks = [...document.querySelectorAll('[data-menu-link]')]

const initializeSectionsTL = () => {
  /* Page */
  gsap.set(sections, {
    backgroundColor: 'rgba(255, 20, 147, 1)',
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: sections[0],
        start: 'top top',
        toggleActions: 'play pause resume reverse',
      },
    })
    .to(sections, {
      backgroundColor: 'rgba(9, 14, 23, 1)',
    })

  /* Sections */
  sections.forEach((section, index) => {
    const nextSection = sections[index + 1]
    const heading = section.querySelector('[data-heading]')
    const isProjectSection = section.dataset.section === 'projects'

    const splitText = new Splitting({
      target: heading,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        endTrigger: nextSection || false,
        pin: false,
        toggleActions: 'play pause resume reverse',
        toggleClass: 'is-inview',
        onEnter: (self) => {
          self.trigger.classList.add('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 0, duration: 0.8 })
          }
        },
        onLeaveBack: (self) => {
          self.trigger.classList.remove('is-inview')

          if (index == 0) {
            gsap.to(hero, { opacity: 1, duration: 0.8 })
          }
        },
      },
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
  }

  /* Text content */
  sectionContentAreas.forEach((el, index) => {
    const parentSection = el.closest('.c-section__content')
    const top =
      index === 0 ? getComputedStyle(parentSection).paddingTop : 'center'
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${top}`,
          endTrigger: sections[index + 1] ? sections[index + 1] : null,
          toggleActions: 'play pause resume reverse',
          toggleClass: 'should-show-text',
        },
      })
      .to(aboutImgWrapper, {
        opacity: 1,
        rotate: -5,
        scale: 1,
        duration: 1.8,
        delay: 1.2,
        ease: 'elastic.out(1, 0.4)',
      })
  })
}

const scroll = () => {
  initializeSectionsTL()
  initializeContentTL()

  menuLinks.forEach((el) => {
    el.addEventListener('click', () => {
      gsap.to(sections, {
        backgroundColor: 'rgba(9, 14, 23, 1)',
      })
    })
  })
}

export default scroll
