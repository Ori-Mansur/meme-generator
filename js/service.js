'use strict'


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgId = 1
var gStickerId = 101
var gImgs = [{ id: gImgId++, url: 'imgs/003.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/004.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/005.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/006.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/12.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/19.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/5.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/8.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/9.jpg', keywords: ['happy'] }
];


var gMeme = {
    selectedImgId: 5,
    selectedTxtIdx: 0,
    txts: [{
        line: 'I never eat Falafel',
        size: 28,
        align: 'center',
        color: 'white',
        frameColor: 'black',
        font: 'Impact',
        y: 28,
        x: ''
    }
    ]
}

var gStickers = {
    selectedStickerId: 0,
    stickers: [
        { id: gStickerId++, url: 'png-icons/001-attachment.png' },
        { id: gStickerId++, url: 'png-icons/002-healthcare-and-medical.png' },
        { id: gStickerId++, url: 'png-icons/007-gift.png' },
        { id: gStickerId++, url: 'png-icons/008-donation.png' }
    ]
}
function getMemes() {
    return gMeme
}
function getTxt() {
    return gMeme.txts[gMeme.selectedTxtIdx]
}
function getImgs() {
    return gImgs
}
function getStickers() {
    return gStickers
}

function selectSticker(el) {
    gStickers.selectedStickerId = el.id
}

function updateSelectedImg(elImg) {
    gMeme.selectedImgId = elImg.id
}

function editTxt(txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line = txt
}
function editTxtSize(operator) {
    if (gMeme.txts[gMeme.selectedTxtIdx].size < 3 && operator < 0) return
    gMeme.txts[gMeme.selectedTxtIdx].size += operator
    gMeme.txts[gMeme.selectedTxtIdx].y += operator
}
function moveLine(operator) {
    gMeme.txts[gMeme.selectedTxtIdx].y += operator
}
function editTxtAlign(txtAlign) {
    gMeme.txts[gMeme.selectedTxtIdx].align = txtAlign
}
function editTxtColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].frameColor = color
}
function editTxtFillColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].color = color
}
function changeFont(font) {
    gMeme.txts[gMeme.selectedTxtIdx].font = font
}
function removeTxt() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
}
function addTxt() {
    var y = 28
    if (gMeme.txts.length === 1) y = gCanvas.height - y
    else if (gMeme.txts.length > 1) y = gCanvas.height / 2
    gMeme.txts.push({
        line: 'I never eat Falafel',
        size: 28,
        align: 'center',
        color: 'white',
        frameColor: 'black',
        font: 'Impact',
        y,
        x: gCanvas.width / 2
    })
    gMeme.selectedTxtIdx = gMeme.txts.length - 1
}
function changeCurrTxt() {
    if (gMeme.selectedTxtIdx >= gMeme.txts.length - 1) {
        gMeme.selectedTxtIdx = 0
    } else gMeme.selectedTxtIdx++
}      