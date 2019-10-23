'usr strict'

let gCanvas;
let gCtx;
let gCurrTxt=1
gCanvas = document.querySelector('#meme-edotir');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
function onOpenCanvas(el){
    toggelHide('.gallery')
    toggelHide('.keywords')
    toggelHide('.canvas-container')
    gCanvas = document.querySelector('#meme-edotir');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    drawImg(el)

}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}
function onDrawTxt(elVal){
    editTxt(elVal)
    var x=gCanvas.width/2
    drawText(elVal, x, 18)
    

}

function drawImg(elImg) {
    const img = elImg
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(txt, x, y) {
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    // gCtx.fillStyle = '#fff'
    // gCtx.strokeStyle = 'green'
    // gCtx.lineWidth = 5
    // gCtx.font = "80px Arial";
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onEditTxtColor(){
    var color=document.querySelector('.txt-color').value
    editTxtColor(color)
}
function onEditTxt(txt){
    editTxt(txt)
    
}            
function onEditTxtSize(operator){
    editTxtSize(operator)
   
}            
function onEditTxtAlign(txtAlign){
    editTxtAlign(txtAlign)   
} 

function onRemoveTxt(){
    removeTxt()
}
function onAddTxt(){
    addTxt()
}
function onChangeCurrTxt(){
    changeCurrTxt()
}