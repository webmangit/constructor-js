// более подробно кода посмотреть можно здесь https://www.youtube.com/watch?v=qoO1ZNi1LyI&list=PLM6XATa8CAG6IJvQBkrTTNZmpIcyS2Avk&index=21&t=744s

const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
// const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true // чтобы не было двойных нажатий
const timeout = 500

// Навешиваем события на элементы открытия модального окна и отменяем поведение по умолчанию
if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', (e) => {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
      e.preventDefault()
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', (e) => {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    currentPopup.classList.add('open')
    currentPopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

function bodyLock() {
  // если есть фиксированные элементы, то нужно выполнить код из видео https://www.youtube.com/watch?v=qoO1ZNi1LyI&list=PLM6XATa8CAG6IJvQBkrTTNZmpIcyS2Avk&index=21&t=744s

  body.classList.add('lock')
  unlock = false
  setTimeout(() => unlock = true, timeout)
}

function bodyUnLock() {
  setTimeout(() => {
    body.classList.remove('lock')
  }, timeout)
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})
