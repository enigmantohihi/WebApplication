function readFile(e){
    console.log("file");
    const file = e.target.files;
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev){
        const originalText = reader.result;
        textToDeck(originalText);
    }
}

function textToDeck(fileText){
    let id = 1;
    const originalText = fileText;
    //1行ずつ分割
    const originalTextList = originalText.split(/[\n]/);
    for(let i=0;i<originalTextList.length;i++){
        const lineText = originalTextList[i];
        if(!lineText.match(/[\S]/)){
            //行が改行のみor空白,スペースだけなら何もしない

        }else{
            //行を更に[, 、]で分割
            const lineTextList = lineText.split(/[,、]/);
            
            //読み込んだ画像パスをpush
            const imgPathList = [];

            //何枚デッキに入るか
            let cardCount = 1;

            for(let n=0;n<lineTextList.length;n++){
                const text = lineTextList[n];
                if(isNaN(text)){
                    imgPathList.push(text);
                }else{
                    cardCount = text;
                }
            }

            if(imgPathList.length == 1){
                const backImgPath = "./img/duel/back/back.jpeg";
                imgPathList.push(backImgPath);
            }

            for(let j=0;j<cardCount;j++){              
                const card = new Card(id,imgPathList,0,0);
                cardList.push(card);
                id++;
            }

        }
    }
    createDeck();
}

function init(){
    const file = document.getElementById("txtfile");
    file.addEventListener("change",readFile,false);
}

window.addEventListener("load",init);