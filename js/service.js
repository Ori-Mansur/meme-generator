'use strict'


var gKeywords = { 'happy': 15, 'comics': 30, 'animal': 23 }
var gImgId = 1
var gStickerId = 101
var gImgs = [{ id: gImgId++, url: 'imgs/003.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/004.jpg', keywords: ['comics','happy'] },
{ id: gImgId++, url: 'imgs/005.jpg', keywords: ['funny'] },
{ id: gImgId++, url: 'imgs/006.jpg', keywords: ['animal'] },
{ id: gImgId++, url: 'imgs/12.jpg', keywords: ['comics'] },
{ id: gImgId++, url: 'imgs/19.jpg', keywords: ['happy'] },
{ id: gImgId++, url: 'imgs/5.jpg', keywords: ['animal'] },
{ id: gImgId++, url: 'imgs/8.jpg', keywords: ['comics'] },
{ id: gImgId++, url: 'imgs/9.jpg', keywords: ['happy'] }
];

var gFilteredImgs;
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
    endIdxToShow: 4,
    selectedStickerId: 0,
    pngs: [
        { id: gStickerId++, url: 'png-icons/001-attachment.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/002-healthcare-and-medical.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/007-gift.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/008-donation.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/003-birthday-and-party.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/004-cowboy-hat.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/005-hat.png', size: 40, y: 0, x: 0 },
        { id: gStickerId++, url: 'png-icons/009-gift-box.png', size: 40, y: 0, x: 0 }
    ]
}

var gSavedMemes = []

function getKeywords() {
    return gKeywords
}
function getMemes() {
    return gMeme
}
function getTxt() {
    return gMeme.txts[gMeme.selectedTxtIdx]
}
function getImgs() {
    if(!gFilteredImgs)gFilteredImgs=gImgs
    return gFilteredImgs
}
function getStickers() {
    return gStickers
}
function getSavedMemes() {
    var savedMemes = loadFromStorage('imgsData')
    gSavedMemes = savedMemes
    return gSavedMemes
}

function saveDataImg(imgURL) {
    getSavedMemes()
    gSavedMemes.push(imgURL)
    saveToStorage('imgsData', gSavedMemes)
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
function setStickersIdxToShow(operator) {
    console.log(gStickers.endIdxToShow, gStickers.pngs.length);
    if (gStickers.endIdxToShow >= gStickers.pngs.length) {
        gStickers.endIdxToShow = 3
    }
    gStickers.endIdxToShow += operator
}

function search(str) {
    var count = gKeywords[str]
    gKeywords[str] = (count) ? count + 1 : 1

}

function doSearch(str){
    console.log(str);
    
    var searchImgs=gImgs.filter(img=>{
        return img.keywords.some(keyword=>{
            return keyword===str
        })
    })
    console.log(searchImgs);
    gFilteredImgs=searchImgs
    
}