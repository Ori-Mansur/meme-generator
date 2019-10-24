'use strict'


var gKeywords = {'happy': 12,'funny puk': 1} 

var gImgs = [{id: 1, url: 'img/popo.jpg', keywords: ['happy']}]; 

var gMeme = { selectedImgId: 5, 
              selectedTxtIdx: 0, 
              txts: [ { line: 'I never eat Falafel', 
                        size: 20, 
                        align: 'right', 
                        color: 'red' } 
                    ]
            }
function getTxt(selectedTxt){
    return gMeme.txts[selectedTxt]
}

function editTxt(txt){
    gMeme.txts[gMeme.selectedTxtIdx].line=txt
}            
function editTxtSize(operator){
    if(gMeme.txts[gMeme.selectedTxtIdx].size<3 && operator<0)return
    gMeme.txts[gMeme.selectedTxtIdx].size+=operator
}            
function editTxtAlign(txtAlign){
    gMeme.txts[gMeme.selectedTxtIdx].align=txtAlign
    console.log(gMeme.txts[gMeme.selectedTxtIdx].align);
    
}            
function editTxtColor(color){
    gMeme.txts[gMeme.selectedTxtIdx].color=color
} 
function removeTxt(){
    gMeme.txts.splice(gMeme.selectedTxtIdx,1)


} 
function addTxt() {

gMeme.txts.push({
        line: 'I never eat Falafel', 
        size: 20, 
        align: 'left', 
        color: 'red'   
    })
    gMeme.selectedTxtIdx++
}   
function changeCurrTxt(){

}      