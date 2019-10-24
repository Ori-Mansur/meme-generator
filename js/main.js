'usr strict'

let gCanvas;
let gCtx;

function init(){

    renderImgs()
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
    stickers.stickers.forEach(sticker => {
        HTMLs += `<img src="${sticker.url}" class="png" id="${sticker.id}" ondrag="onSelectSticker(this)">`
    })
    HTMLs += `<a class="next" onclick="plusSlides(1)">&#10095;</a>`
    document.querySelector('.stickers').innerHTML = HTMLs

}
function moveTxt(ev) {
    var objtxt = getTxt()
    var x = gCtx.measureText(objtxt.line)
    if (ev.offsetX > x.actualBoundingBoxLeft) console.log(x, ev.offsetX);

}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}
function onDrawTxt(elVal) {
    editTxt(elVal)
    renderCanvas()

    // document.querySelector('.meme').value=''
}
function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    var memes = getMemes()
    var img = document.getElementById(memes.selectedImgId)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    memes.txts.forEach((txt) => {
        drawText(txt)
    })
}

function drawImg(elImg) {
    updateSelectedImg(elImg)
    const img = elImg
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(txt) {
    gCtx.textAlign = txt.align
    gCtx.fillStyle = txt.color
    gCtx.strokeStyle = txt.frameColor
    gCtx.font = txt.size + 'px ' + txt.font;
    gCtx.fillText(txt.line, gCanvas.width / 2, txt.y);
    gCtx.strokeText(txt.line, gCanvas.width / 2, txt.y);


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
}
function onSetIconPos(ev) {
    ev.preventDefault()
    var stickers = getStickers()
    var img = document.getElementById(stickers.selectedStickerId)
    console.log(ev.view, gCanvas.height, img.style.width);
    gCtx.drawImage(img, 0, 0, 40, 40)
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

function toggleMenu() {
    var nav = document.querySelector('nav')
    nav.classList.toggle('open-nav');
}