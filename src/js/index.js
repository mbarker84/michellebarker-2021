import menu from './menu'
import cursor from './cursor'
import textAnimation from './textAnimation'

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    document.body.classList.add('is-complete')
  }
}

menu()
// cursor()
textAnimation()
