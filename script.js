document.addEventListener('DOMContentLoaded', () => {
  const tabsParent = document.querySelector('.btn-container')
  const pianoKeys = document.querySelectorAll('.piano-key')
  const tabButtons = document.querySelectorAll('.btn')
  const piano = document.querySelector('.piano')

  tabsParent.addEventListener('click', (e) => {
    const target = e.target
    if (target !== tabsParent) {
      tabButtons.forEach((btn) => {
        btn.classList.remove('btn-active')
      })
    }

    if (target && target.classList.contains('btn-letters')) {
      target.classList.add('btn-active')

      pianoKeys.forEach((key) => {
        key.classList.add('letter')
      })
    } else if (target && target.classList.contains('btn-notes')) {
      target.classList.add('btn-active')

      pianoKeys.forEach((key) => {
        key.classList.remove('letter')
      })
    }
  })

  const fullScreen = document.querySelector('.fullscreen')

  function toggleFullScreen() {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen()
    else document.exitFullscreen()
  }

  fullScreen.addEventListener('click', toggleFullScreen)

  pianoKeys.forEach((key) => {
    let audio = document.createElement('audio')
    let letter = key.getAttribute('data-letter')
    let note = key.getAttribute('data-note')
    if (letter !== null) {
      audio.setAttribute(`data-letter`, `${letter}`)
      audio.setAttribute('src', `assets/audio/${note}.mp3`)
      piano.append(audio)
    }
  })

  const playAudio = (e) => {
    let audio = document.querySelectorAll(`audio[data-letter]`)
    audio.forEach((item) => {
      if (item.getAttribute('data-letter') === e) {
        item.currentTime = 0
        item.play()
      }
    })
  }

  const addActiveClass = (e) => {
    if (e.target.classList.contains('piano-key')) {
      pianoKeys.forEach((el) => {
        if (el.classList.contains('piano-key--active')) {
          el.classList.remove('piano-key--active')
        }
      })
      e.target.classList.add('piano-key--active')
    }
  }

  const removeActiveClass = () => {
    pianoKeys.forEach((el) => {
      if (el.classList.contains('piano-key--active')) {
        el.classList.remove('piano-key--active')
      }
    })
  }

  window.addEventListener('keydown', (e) => {
    if (!e.repeat) {
      const code = e.code.replace(/\Key/, '')
      pianoKeys.forEach((key) => {
        if (key.getAttribute('data-letter') === code) {
          playAudio(key.getAttribute('data-letter'))
          key.classList.add('piano-key--active')
        }
      })
    }
  })

  window.addEventListener('keyup', removeActiveClass)

  const mouseListener = (e) => {
    const target = e.target
    if (target && target.classList.contains('piano-key')) {
      playAudio(target.getAttribute('data-letter'))
    }
  }

  let isClicking = false

  piano.addEventListener('mousedown', (e) => {
    mouseListener(e)
    isClicking = true
    addActiveClass(e)
  })

  piano.addEventListener('mouseover', (e) => {
    if (isClicking) {
      mouseListener(e)
      addActiveClass(e)
    }
  })

  piano.addEventListener('mouseout', (e) => {
    if(isClicking){
      removeActiveClass()
    }
  })

  window.addEventListener('mouseup', (e) => {
    isClicking = false
    removeActiveClass()
  })
})
