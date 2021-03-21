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

const initializePageTL = () => {
  if (!minDesktop()) return

  /* Page */
  gsap.set('.page-content', {
    backgroundColor: 'rgba(255, 20, 147, 1)',
  })

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

  gsap
    .timeline({
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
    .to('.page-content', {
      backgroundColor: 'rgba(9, 14, 23, 1)',
    })
}

const initializeSectionsTL = () => {
  /* Sections */
  sections.forEach((section, index) => {
    const nextSection = sections[index + 1]
    const heading = section.querySelector('[data-heading]')

    const splitText = new Splitting({
      target: heading,
    })
  })
}

const initializeContentTL = () => {
  const aboutSection = sections.find((el) => el.dataset.section === 'about')
  const aboutImgWrapper = aboutSection.querySelector('[data-img-wrapper]')

  if (minDesktop()) {
    gsap.set(aboutSection, {
      marginTop: '50vh',
    })

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
      index === 0
        ? getComputedStyle(parentSection).paddingTop
        : `${window.innerHeight * 0.65}px`

    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${window.innerHeight * 0.65}`,
          endTrigger: sections[index + 1] ? sections[index + 1] : null,
          toggleActions: 'play pause resume reverse',
          toggleClass: 'should-show-text',
        },
      })
      .to(aboutImgWrapper, {
        opacity: 1,
        rotate: -5,
        scale: 1,
        duration: 0.5,
        delay: 1.2,
        ease: 'back.out(1.7)',
      })
  })
}

const scroll = () => {
  initializeSectionsTL()
  initializeContentTL()
  initializePageTL()

  menuLinks.forEach((el) => {
    el.addEventListener('click', () => {
      gsap.to(sections, {
        backgroundColor: 'rgba(9, 14, 23, 1)',
      })
    })
  })
}

export default scroll
