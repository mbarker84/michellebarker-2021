import Splitting from 'splitting'
import cursor from './cursor'

const heading = document.querySelector('[data-heading]')
const subtitle = document.querySelector('[data-subtitle]')

const animateSubtitle = () => {
  subtitle.classList.add('is-visible')
  setTimeout(() => cursor(), 1000)
}

const textAnimation = () => {
  const splitText = new Splitting({
    target: heading,
  })

  const { chars } = splitText[0]
  const lastLetter = chars[chars.length - 1]

  lastLetter.addEventListener('animationend', () => animateSubtitle(), 'once')
}

export default textAnimation
