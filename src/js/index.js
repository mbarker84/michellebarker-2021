import menu from './menu'
import scroll from './scroll'
import textAnimation from './textAnimation'

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    document.body.classList.add('is-complete')
  }
}

menu()
scroll()
textAnimation()
