'use strict'

function toggelHide(selector) {
    var element = document.querySelector(selector)
    element.classList.toggle('hide');
}
function addHide(selector) {
    var element = document.querySelector(selector)
    element.classList.add('hide');
}
function removeHide(selector) {
    var element = document.querySelector(selector)
    element.classList.remove('hide');
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var value = JSON.parse(str)
    return value;
}


// function onImgInput(ev) {
//     loadImageFromInput(ev, renderCanvas)
// }
// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader();

//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(ev.target.files[0]);
// }