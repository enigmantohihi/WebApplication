function mdown(e) {
    console.log("mdown");
    selectID = e.target.eventParam;
    selectCard = document.getElementById(`card${selectID}`);
    mouseState = MouseState.down;

    if(e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    selectCard.addEventListener("mousemove", mmove, false);
    selectCard.addEventListener("touchmove", mmove, false);

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    selectCard.addEventListener("mouseup", mup, false);
    selectCard.addEventListener("mouseleave", mup, false);

    selectCard.addEventListener("touchend", mup, false);
    selectCard.addEventListener("touchleave", mup, false);
}

function mmove(e) {
    console.log("mmove");
    mouseState = MouseState.move;

    //同様にマウスとタッチの差異を吸収
    if(e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    selectCard.style.position = "absolute";
    selectCard.style.top = event.pageY - y + "px";
    selectCard.style.left = event.pageX - x + "px";

}

function mup(e) {
    console.log("mup");

    //ムーブベントハンドラの消去
    selectCard.removeEventListener("mousemove", mmove, false);
    selectCard.removeEventListener("touchmove", mmove, false);

    selectCard.removeEventListener("mouseup", mup, false);
    selectCard.removeEventListener("mouseleave", mup, false);
    
    selectCard.removeEventListener("touchend", mup, false);
    selectCard.removeEventListener("touchleave", mup, false);

    if(mouseState == MouseState.down) click();
    mouseState = MouseState.normal;
}

function click(){
    console.log("click");
    const card = findCard(selectID);
    if(key){
        card.mode = (card.mode+1) % card.imgPath.length;
        selectCard.src = card.imgPath[card.mode];
        //document.getElementById(`card${selectID}`).src = card.imgPath[card.mode];
    } else{
        card.angle = (card.angle+90) % 360;
        selectCard.style.transform = "rotate(" + card.angle + "deg)";
    }
}


// function createCard(){
//     const card_root = document.getElementById("card_place");
//     for(let i=0; i<2; i++) {
//         const id = i;
//         const imgPath = [];
//         imgPath.push("./img/duel/dmx25-v09.jpeg");
//         const card = new Card(id,imgPath,0,0);
//         cardList.push(card);
//         const cardImg = displayCard(card);
//         card_root.appendChild(cardImg);
//     }
// }

function displayCard(card){
    const id = card.id;
    const cardImg = document.createElement('img');
    cardImg.src = card.imgPath[card.mode];
    cardImg.id = "card" + id;
    cardImg.width = "100";
    // cardImg.style.position = "absolute";
    cardImg.addEventListener("mousedown", mdown, false);
    //cardImg.addEventListener("touchstart", mdown, false);
    cardImg.eventParam = id;
    return cardImg;
}

function createDeck(){
    deckList = cardList.concat();
    set_html();
}

function findCard(targetID){
    for(let i=0;i<cardList.length;i++){
        if(targetID == cardList[i].id){
            return cardList[i];
        }
    }
}

function returnDeck(){
    const card = findCard(selectID);//outDeckList.shift();
    if(!card) return;
    let index;
    for(let i=0;i<outDeckList.length;i++){
        if(card.id == outDeckList[i].id){
            index = i;
            break;
        } 
    }
    outDeckList.splice(index,1);
    deckList.push(card);
    selectCard = document.getElementById(`card${selectID}`);
    if(selectCard) selectCard.remove();

    set_html();
}
function drawDeck(){
    if(deckList.length <= 0) return;
    const card_root = document.getElementById("card_place");
    const card = deckList.shift();
    outDeckList.push(card);
    const cardImg = displayCard(card);
    card_root.appendChild(cardImg);

    set_html();
}

function shuffle(){
    const length = deckList.length;
    const indexList = [];
    for(let i=0;i<length;i++) indexList.push(i);
    const newDeckList = new Array(length);

    for(let i=0;i<length;i++){
        const min = 0;
        const max = indexList.length-1;
        const indexListindex = Math.floor( Math.random() * (max + 1 - min) ) + min;
        const index = indexList[indexListindex];
        newDeckList[index] = deckList[i];
        indexList.splice(indexListindex,1);
    }
    deckList = newDeckList;
    deckList.forEach(card => console.log(card));
}

function init(){
    //createCard();

    document.addEventListener('keypress', keypress, false);
    document.addEventListener('keyup', keyup, false);
}

function keypress(e) {
    if(e.key === 'a' || e.key === 'A'){
        key = true;
	}
    console.log("press_key : " + e.key);
}
function keyup(e) {
    if(e.key === 'a' || e.key === 'A'){
        key = false;
	}
    console.log("up_key : " + e.key);
}

function set_html(){
    document.getElementById("deck").textContent = `デッキ残り枚数:${deckList.length}枚`;
}

const MouseState = {
    normal:0,
    down:1,
    move:2,
    up:3
};

const Card = class{
    constructor(id,imgPath,angle,mode){
        this.id = id;
        this.imgPath = imgPath;
        //this.imgPath.push(imgPath);
        this.angle = angle;
        this.mode = mode;
    }
};

let x;
let y;
let angle = 0;
let mouseState = MouseState.normal;
let selectID;
let selectCard;

let key = false;

//使用する
const imgPathList = [];

//使用する全カード情報が入る
const cardList = [];

//デッキの中のカードが入る
let deckList = [];

//手札や盤面などのデッキ外のカードが入る
const outDeckList = [];

window.addEventListener("load",init);