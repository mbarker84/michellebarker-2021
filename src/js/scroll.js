import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sections = [...document.querySelectorAll('[data-section')]

const scroll = () => {
  sections.forEach((section, index) => {
    const sectionContents = section.children[0]
    const nextSection = sections[index + 1]

    gsap.set(sectionContents, {
      x: window.innerWidth * -1,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`,
        // endTrigger: nextSection || false,
        pin: true,
        pinSpacing: false,
        toggleActions: 'play pause resume reverse',
        onEnter: (self) => {
          console.log('enter')
        },
        onLeave: () => {
          console.log('leave')
        },
        onEnterBack: () => {
          console.log('enter back')
        },
        onLeaveBack: () => {
          console.log('enter back')
        },
      },
    })

    tl.to(sectionContents, {
      x: 0,
      duration: 0.5,
      delay: 0.8,
    })
  })
}

export default scroll
