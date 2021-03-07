import gsap from 'gsap'
import { trapFocus, visibleLinks } from './helpers/trapFocus'
import bodyScrollLock from './helpers/bodyScrollLock'

const header = document.querySelector('[data-header]')
const menuBtn = header.querySelector('[data-btn="menu"]')
const menuWrapper = header.querySelector('[data-menu-wrapper]')
const homeLink = header.querySelector('[data-home-link]')

const open = () => {
  menuWrapper.hidden = false
  menuBtn.setAttribute('aria-expanded', true)
  menuBtn.setAttribute('aria-label', 'Close')
  // bodyScrollLock(true)

  setTimeout(() => {
    menuWrapper.classList.add('is-visible')
    document.body.classList.add('is-menu-visible')
  }, 50)
}

const close = () => {
  menuWrapper.classList.remove('is-visible')
  document.body.classList.remove('is-menu-visible')

  setTimeout(() => {
    menuWrapper.hidden = true
    menuBtn.setAttribute('aria-expanded', false)
    menuBtn.setAttribute('aria-label', 'Menu')
    // bodyScrollLock(false)
  }, 250)
}

const toggleMenu = (e) => {
  if (menuWrapper.hidden) {
    open()
  } else {
    close()
  }
}

const trapFocusInMenu = (e) => {
  trapFocus(e, header)

  /* if Esc key pressed */
  if (e.keyCode === 27) {
    close()
  }
}

const handleClick = (e) => {
  const id = e.target.getAttribute('href')

  if (id) {
    const section = document.querySelector(id)
    close()
    section.parentElement.classList.add('is-inview')
  }
}

const menu = () => {
  menuBtn.hidden = false
  menuWrapper.hidden = true
  homeLink.hidden = false
  menuWrapper.classList.add('js-menu')
  menuBtn.addEventListener('click', toggleMenu)
  menuWrapper.addEventListener('keydown', trapFocusInMenu)
  menuWrapper.addEventListener('click', handleClick)
}

export default menu
