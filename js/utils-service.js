'use strict'

function toggelHide(selector) {
    var element = document.querySelector(selector)
    element.classList.toggle('hide');
}