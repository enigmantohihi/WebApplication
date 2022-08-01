function button(){
    // const original = document.getElementById("text").value;
    // const lineText = original.split(/[,、\n]/);
    // console.log(lineText);
    // for(let i=0;i<lineText.length;i++){
    //     if(!lineText[i].match(/[\S]/)) console.log("space :" + lineText[i]);
    //     else console.log(lineText[i]);
    // }
    splitTest();
}

function splitTest(){
    let id = 1;
    const originalText = document.getElementById("text").value;;
    //1行ずつ分割
    const originalTextList = originalText.split(/[\n]/);
    for(let i=0;i<originalTextList.length;i++){
        const lineText = originalTextList[i];
        console.log("line:" + lineText);
        if(!lineText.match(/[\S]/)){
            //行が改行のみor空白,スペースだけなら何もしない

        }else{
            //行を更に[, 、]で分割
            const lineTextList = lineText.split(/[,、]/);
            console.log("lineTextList:" + lineTextList);
            
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
            console.log("imgPathList:" + imgPathList);
            console.log("count:" + cardCount);

            for(let j=0;j<cardCount;j++){
                const split = new Split(id,imgPathList);
                list.push(split);
                id++;
            }
        }
    }

    list.forEach(split =>
        console.log(split)
    );
}

function init(){

}

const Split = class{
    constructor(id,texts){
        this.id = id;
        this.texts = texts;
    }
} 

const list = [];

window.addEventListener("load",init);