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
    let type = 0;
    const originalText = fileText;
    //1行ずつ分割
    const originalTextList = originalText.split(/[\n]/);
    for(let i=0;i<originalTextList.length;i++){
        const lineText = originalTextList[i];
        if(!lineText.match(/[\S]/) || lineText.match(/^\/{2}/)){
            //行が改行のみor空白,スペースだけなら何もしない
            //先頭に'//'をつけるとその行も何もしない

        }else if(lineText.match(/^-*\d+-*$/)){
            type = Number(lineText.match(/\d+/));
            console.log("match:" + type);
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
                const card = new Card(id,imgPathList,0,0,type);
                cardList.push(card);
                id++;
            }

        }
    }
    createDeck();
}

//デッキの中身を全表示,選択したカードを出す
function allDisplay(){
    const button = document.getElementById("allDisplayButton");
    if(button.value == "一覧表示"){
        button.value = "閉じる";
        const parent = document.createElement("div");
        parent.id = "display_panel";
        parent.className = "box";

        //選択したカードを引くボタン
        const getButton = document.createElement("input");
        getButton.type = "button";
        getButton.value = "手札に加える";
        getButton.onclick = function(){
            allDisplay();
        }
        parent.appendChild(getButton);
        parent.appendChild(document.createElement("br"));

        const mode = 0;
        for(let i=0;i<deckList.length;i++){
            const card = deckList[i];
            const cardImg = displayCard_All(card,mode);
            parent.appendChild(cardImg);
        }

        document.getElementById("allDisplay").appendChild(parent);
    }else{
        button.value = "一覧表示";
        const displayPanel = document.getElementById("display_panel"); 
        displayPanel.remove();
        console.log(selectIDList);
        selectIDList.forEach(id =>{
            pullCard(id);
        });
        selectIDList.length = 0;
    }
}

//一覧表示のカードの表示
function displayCard_All(card,mode=0){
    const id = card.id;
    const cardImg = document.createElement('img');
    card.mode = mode;
    cardImg.src = card.imgPath[card.mode];
    cardImg.id = "card" + id;
    cardImg.width = "80";
    cardImg.addEventListener("mousedown", function(e){
        const id = e.target.eventParam;
        selectIDList.push(id);
        if(cardImg.className == "") cardImg.className = "selectCard";
        else cardImg.classList.remove("selectCard");
    }, false);
    cardImg.eventParam = id;
    return cardImg;
}

//デッキから選択したカードを引き抜く
function pullCard(id){
    const index = deckList.findIndex(card =>{
        return id == card.id;
    });
    console.log(index);
    if(index>=0){
        deckList.splice(index,1);
        const card = findCard(id);
        outDeckList.push(card);
        const cardImg = displayCard(card,1);
        const card_root = document.getElementById("card_normal");
        card_root.appendChild(cardImg);

        set_html();
    }
}

function init(){
    const file = document.getElementById("txtfile");
    file.addEventListener("change",readFile,false);
}

const selectIDList = [];
window.addEventListener("load",init);