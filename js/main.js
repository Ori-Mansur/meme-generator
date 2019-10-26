'usr strict'

let gCanvas;
let gCtx;
let gMoveTxt = false
let gMoveImg = false

function init() {
    renderImgs()
    renderKeywords()

}

function renderKeywords() {
    var keywords = getKeywords()
    var HTMLs = '<ul>'
    var word;
    for (word in keywords) {
        HTMLs += `<li><a href="" style="font-size:${keywords[word]}px;">${word}</a>`
    }
    HTMLs += `<li><a href="">more...</a></li></ul>`
    document.querySelector('.keywords-area').innerHTML = HTMLs
}

function onSearch() {
    var searchStr = document.querySelector('.search').value
    search(searchStr)
    renderKeywords()
    document.querySelector('.search').value = ''
}


function onOpenCanvas(el) {
    toggelHide('.gallery')
    toggelHide('.keywords')
    toggelHide('.canvas-container')
    toggelHide('.editor-tools')
    gCanvas = document.querySelector('#meme-edotir');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    renderStickers()
    drawImg(el)
    renderCanvas()
}

function renderImgs() {
    var imgs = getImgs()
    var HTMLs = ''
    imgs.forEach(img => {
        HTMLs += `<img src="${img.url}" id="${img.id}" onclick="onOpenCanvas(this)"></img>`
    })
    document.querySelector('.gallery').innerHTML = HTMLs
}

function renderStickers() {
    var stickers = getStickers()
    var HTMLs = `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>`
    stickers.pngs.forEach((sticker, idx) => {
        if (idx < stickers.endIdxToShow && idx >= stickers.endIdxToShow - 4) {
            HTMLs += `<img src="${sticker.url}" class="png" id="${sticker.id}" onclick="onSelectSticker(this)">`
        }
    })
    HTMLs += `<a class="next" onclick="plusSlides(1)">&#10095;</a>`
    document.querySelector('.stickers').innerHTML = HTMLs

}

function moveContentMobile(ev) {
    moveTxtMobile(ev)
    moveImgMobile(ev)
}
function moveTxtMobile(ev) {
    ev.preventDefault()
    var offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
    var offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    var objtxt = getTxt()
    var xStart = objtxt.x - gCtx.measureText(objtxt.line).width / 2
    var xEnd = objtxt.x + gCtx.measureText(objtxt.line).width / 2
    if (offsetX > xStart && offsetX < xEnd &&
        offsetY < objtxt.y && offsetY > objtxt.y - objtxt.size &&
        ev.type === 'touchstart') gMoveTxt = true
    if (gMoveTxt) {
        objtxt.y = offsetY
        objtxt.x = offsetX
        renderCanvas()
    }
}
function moveImgMobile(ev) {
    ev.preventDefault()
    var offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
    var offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    var stickers = getStickers()
    if (stickers.selectedStickerId === 0) return
    var sticker = stickers.pngs[stickers.selectedStickerId - 101]
    var xStart = sticker.x
    var xEnd = sticker.x + sticker.size
    var yStart = sticker.y
    var yEnd = sticker.y + sticker.size
    // console.log(ev.offsetX)
    if (offsetX > xStart && offsetX < xEnd &&
        offsetY > yStart && offsetY < yEnd &&
        ev.type === 'touchstart') gMoveImg = true
    if (gMoveImg) {
        sticker.y = offsetY - sticker.size / 2
        sticker.x = offsetX - sticker.size / 2
        renderCanvas()
    }
}
function moveContent(ev) {
    moveTxt(ev)
    moveImg(ev)
}
function moveTxt(ev) {
    var objtxt = getTxt()
    var xStart = objtxt.x - gCtx.measureText(objtxt.line).width / 2
    var xEnd = objtxt.x + gCtx.measureText(objtxt.line).width / 2
    if (ev.offsetX > xStart && ev.offsetX < xEnd &&
        ev.offsetY < objtxt.y && ev.offsetY > objtxt.y - objtxt.size &&
        ev.type === 'mousedown') gMoveTxt = true
    if (gMoveTxt) {
        objtxt.y = ev.offsetY
        objtxt.x = ev.offsetX
        renderCanvas()
    }
}
function moveImg(ev) {
    var stickers = getStickers()
    if (stickers.selectedStickerId === 0) return
    var sticker = stickers.pngs[stickers.selectedStickerId - 101]
    var xStart = sticker.x
    var xEnd = sticker.x + sticker.size
    var yStart = sticker.y
    var yEnd = sticker.y + sticker.size
    // console.log(ev.offsetX)
    if (ev.offsetX > xStart && ev.offsetX < xEnd &&
        ev.offsetY > yStart && ev.offsetY < yEnd &&
        ev.type === 'mousedown') gMoveImg = true

    if (gMoveImg) {
        sticker.y = ev.offsetY - sticker.size / 2
        sticker.x = ev.offsetX - sticker.size / 2
        renderCanvas()
    }
}

function moveTxtEnd() {
    gMoveTxt = false
    gMoveImg = false
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function onDrawTxt(elVal) {
    editTxt(elVal)
    renderCanvas()
}

function renderCanvas() {
    scrollToCanvas()
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    var memes = getMemes()
    var img = document.getElementById(memes.selectedImgId)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    memes.txts.forEach((txt) => {
        drawText(txt)
    })
    onSetIconPos()

}

function drawImg(elImg) {
    updateSelectedImg(elImg)
    const img = elImg
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(txt) {
    if (!txt.x) txt.x = gCanvas.width / 2
    gCtx.textAlign = txt.align
    gCtx.fillStyle = txt.color
    gCtx.strokeStyle = txt.frameColor
    gCtx.font = txt.size + 'px ' + txt.font;
    gCtx.fillText(txt.line, txt.x, txt.y);
    gCtx.strokeText(txt.line, txt.x, txt.y);
}

function onEditTxtColor(color) {

    editTxtColor(color)
    renderCanvas()
}
function onEditTxtFillColor(color) {
    editTxtFillColor(color)
    renderCanvas()
}
function onEditTxt(txt) {
    editTxt(txt)
}
function onEditTxtSize(operator) {
    editTxtSize(operator)
    renderCanvas()
}
function onMoveLine(operator) {
    moveLine(operator)
    renderCanvas()
}

function onEditTxtAlign(txtAlign) {
    editTxtAlign(txtAlign)
    renderCanvas()
}
function onChangeFont(font) {
    changeFont(font)
    renderCanvas()
}

function onRemoveTxt() {
    removeTxt()
    renderCanvas()
}
function onAddTxt() {
    document.querySelector('.meme').value = ''
    addTxt()
    renderCanvas()
}
function onChangeCurrTxt() {
    changeCurrTxt()
    var objtxt = getTxt()
    var width = gCtx.measureText(objtxt.line).width + 15;
    var x = gCanvas.width / 2 - width / 2
    gCtx.strokeStyle = 'gray'
    gCtx.strokeRect(x, objtxt.y + 5 - objtxt.size, width, objtxt.size + 5)
    setTimeout(function () {
        renderCanvas()
    }, 3000)
}
function onSelectSticker(el) {
    selectSticker(el)
    onSetIconPos()
}
function onSetIconPos() {
    var stickers = getStickers()
    if (stickers.selectedStickerId === 0) return
    var img = document.getElementById(stickers.selectedStickerId)
    var sticker = stickers.pngs[stickers.selectedStickerId - 101]
    gCtx.drawImage(img, sticker.x, sticker.y, sticker.size, sticker.size)
}
function plusSlides(operator) {
    setStickersIdxToShow(operator)
    renderStickers()
}

function onSaveImg() {
    var canvas = document.querySelector('canvas')
    var imgURL = canvas.toDataURL()
    saveDataImg(imgURL)
    // showSavedMemes()

}

function showSavedMemes() {
    addHide('.gallery')
    addHide('.keywords')
    addHide('.canvas-container')
    addHide('.editor-tools')
    toggelHide('.saved-memes')

    var dataImgs = getSavedMemes()
    var memes = document.querySelector('.saved-memes');
    var HTMLs = ''
    dataImgs.forEach(dataImg => {
        HTMLs += `<img src="${dataImg}">`
    })
    memes.innerHTML = HTMLs
}

function scrollToCanvas() {
    if (document.activeElement.tagName == "INPUT") {
        var el = document.querySelector('canvas')
        el.scrollIntoView()
    }
}

function toggleMenu() {
    var nav = document.querySelector('nav')
    nav.classList.toggle('open-nav');
}

function setAlignTxt(txt) {
    var x;
    gCtx.txtAlign = txt.align
    switch (txt.align) {
        case 'center':
            x = gCanvas.width / 2
            break;
        case 'left':
            x = 10
            break;
        case 'right':
            x = gCanvas.width - (txt.line.length * txt.size);
            break;
    }
    return x
}
