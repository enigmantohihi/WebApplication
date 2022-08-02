function button(){
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

function mousemove(e){
    //同様にマウスとタッチの差異を吸収
    if(e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();
    
    //要素内の相対座標を取得
    const x = e.clientX;
    const y = e.clientY;
    const x1 = event.pageX;
    const y1 = event.pageY;

    const text = document.getElementById("pos");
    text.textContent = `x:${x}, y:${y}`;

    const ele = document.elementsFromPoint(x,y);
    console.log(ele);


    const box = document.getElementById("pos2");
    const x2 = box.getBoundingClientRect().left + window.pageXOffset;
    const y2 = box.getBoundingClientRect().top;
    box.textContent = `x:${x2}, y:${y2}`;

}

function init(){
    document.addEventListener("mousemove", mousemove, false);
}

const Split = class{
    constructor(id,texts){
        this.id = id;
        this.texts = texts;
    }
} 

const list = [];

window.addEventListener("load",init);