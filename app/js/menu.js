(function() {

    let burgerMenu = document.getElementById('menuburger')
    let overlay = document.getElementById('overlay')
    let hedMenu = document.getElementById('headermenu')
    let hedMenuI = document.getElementById('headermenuitems')
    let dropdowns = hedMenu.querySelectorAll(`a[data-toggle='dropdowns']`)

    const closeMenu = function() {
        burgerMenu.classList.remove('active')
        hedMenu.classList.remove('open')
        overlay.classList.remove('active')
        overlay.classList.add('hidenoverlay')
        document.querySelector('html').classList.remove('hiden')
        dropdowns.forEach(el => { el.parentNode.classList.remove('active') })
        setTimeout(() => {
            overlay.classList.remove('hidenoverlay')
        }, 300)
    }

    const openMenu = function() {
        burgerMenu.classList.add('active')
        hedMenu.classList.add('open')
        overlay.classList.add('active')
        document.querySelector('html').classList.add('hiden')
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) return closeMenu()
        }, { once: true })
    }

    const dropdownMenu = function(el) {
        if (!el.parentNode.classList.contains('active')) {
            return el.parentNode.classList.add('active')
        }
        return el.parentNode.classList.remove('active')
    }

    const menuListener = function(e) {
        if (e.dataset.toggle === 'close') {
            return closeMenu()
        } else if (e.dataset.toggle === 'dropdowns') {
            dropdownMenu(e)
        }
        return
    }

    return hedMenu.addEventListener('click', e => {
        if (!hedMenu.classList.contains('open')) return openMenu()
        return menuListener(e.target || e.srcElement)
    })


})()