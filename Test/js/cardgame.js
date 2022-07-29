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
    card.angle = (card.angle+90) % 360;
    selectCard.style.transform = "rotate(" + card.angle + "deg)";
}

function createCard(){
    const card_root = document.getElementById("card_place");
    for(let i=0; i<2; i++) {
        const id = i;
        const card = new Card(id,0,0);
        cardList.push(card);
        const cardImg = create(card);
        card_root.appendChild(cardImg);
    }
}

function create(card){
    const id = card.id;
    const cardImg = document.createElement('img');
    cardImg.src = `./img/cards/${id+1}.png`;
    cardImg.id = "card" + id;
    cardImg.width = "100";
    cardImg.style.position = "absolute";
    cardImg.addEventListener("mousedown", mdown, false);
    cardImg.eventParam = id;
    return cardImg;
}

function findCard(targetID){
    for(let i=0;i<cardList.length;i++){
        if(targetID == cardList[i].id){
            return cardList[i];
        }
    }
}

function init(){
    createCard();

    const file = document.getElementById("txtfile");
    file.addEventListener("change",readFile,false);
}

function readFile(e){
    console.log("file");
    const file = e.target.files;
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev){
        const text = reader.result;
        const textList = text.split('\n');
        for(let i=0;i<textList.length;i++){
            console.log(textList[i]);
        }
    }
}

function button0(){
    selectCard = document.getElementById(`card${selectID}`);
    selectCard.remove();
}
function button1(){
    const card_root = document.getElementById("card_place");
    const id = Math.floor( Math.random() * (40 + 1 - 1) ) + 1 ;
    const card = new Card(id,0,0);
    cardList.push(card);
    const cardImg = create(card);
    card_root.appendChild(cardImg);
}


const MouseState = {
    normal:0,
    down:1,
    move:2,
    up:3
};

const Card = class{
    constructor(id,angle,mode){
        this.id = id;
        this.angle = angle;
        this.mode = mode;
    }
};

let x;
let y;
let angle = 0;
let mouseState = MouseState.normal;
let selectID = 0;
let selectCard;
const cardList = [];

window.addEventListener("load",init);