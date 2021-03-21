import menu from './menu'
import scroll from './scroll'
import textAnimation from './textAnimation'

document.body.classList.remove('no-js')

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    document.body.classList.add('is-complete')
    document.body.classList.remove('is-loading')
  }
}

menu()
scroll()
textAnimation()
