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
    defineTxtSetting()
    
    // document.querySelector('.meme').value=''
}
function defineTxtSetting(){
    var txt=getTxt(0)
    var y=txt.size+5
    gCtx.clearRect(0,0,gCanvas.width,y+5)
    drawText(txt)
}

function drawImg(elImg) {
    const img = elImg
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(txt) {
    gCtx.textAlign=txt.align
    var y=txt.size
    gCtx.fillStyle = txt.color
    gCtx.font = txt.size+'px Arial';
    gCtx.fillText(txt.line, gCanvas.width/2, y);
    // gCtx.strokeText(txt.line, x, y);
    
}

function onEditTxtColor(color){
    
    editTxtColor(color)
    defineTxtSetting()  
}
function onEditTxt(txt){
    editTxt(txt)
}            
function onEditTxtSize(operator){
    editTxtSize(operator)
    defineTxtSetting()
   
}            
function onEditTxtAlign(txtAlign){
    editTxtAlign(txtAlign) 
    defineTxtSetting()  
} 

function onRemoveTxt(){
    removeTxt()
    gCtx.clearRect(0,0,gCanvas.width,40)
}
function onAddTxt(){
    addTxt()
}
function onChangeCurrTxt(){
    changeCurrTxt()
}
function setAlignTxt(txt){
    var x;
    gCtx.txtAlign=txt.align
switch(txt.align) {
    case 'center':  
        x = gCanvas.width / 2
      break;
    case 'left':
     x = 10
      break; 
    case 'right':
      x = gCanvas.width-(txt.line.length*txt.size);
      break;
  }
  return x
}