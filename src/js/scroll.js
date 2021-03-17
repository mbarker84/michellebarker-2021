import Splitting from 'splitting'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { minDesktop, minTablet } from './helpers/media'

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

    if (minTablet()) {
      gsap.set(section, {
        minHeight: window.innerHeight * 1.25,
      })
    }

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
  const aboutSection = sections.find((el) => el.dataset.section === 'about')
  const aboutImgWrapper = aboutSection.querySelector('[data-img-wrapper]')

  if (minDesktop()) {
    gsap.set(aboutImgWrapper, {
      y: 600,
      rotation: -5,
    })
  }

  /* Text content */
  sectionContentAreas.forEach((el, index) => {
    const parentSection = el.closest('.c-section__content')
    const top = getComputedStyle(parentSection).paddingTop
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${top}`,
        endTrigger: sections[index + 1] ? sections[index + 1] : null,
        pin: minDesktop(),
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
