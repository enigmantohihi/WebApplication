function setDateTime(){
    document.getElementById("date").textContent = getDate();
    document.getElementById("time").textContent = getTime();
}

function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const _date = `${year}年${month}月${day}日`;
    return _date;
}

function getTime(){
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const time = `${hour}時${minute}分${second}秒`;
    return time;
}

function mdown(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチデイベントとマウスのイベントの差異を吸収
    if(e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
}

//マウスカーソルが動いたときに発火
function mmove(e) {

    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if(e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);

}

//マウスボタンが上がったら発火
function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
}

function cardMove(event){
    const x = event.clientX;
    const y = event.clientY;
    const width = ball.offsetWidth;
    const height = ball.offsetHeight;
    ball.style.top = (y-height/2) + "px";
    ball.style.left = (x-width/2) + "px";
}

function getCard(id){
    const card = document.getElementById("card" + id);
    cardList[id] = (cardList[id] + 90) % 360;
    const d = cardList[id];
    card.style.transform = "rotate(" + d + "deg)";
}

function create(){
    const card_root = document.createElement("div");
    for(let i=1; i<=1; i++) {
        const img = document.createElement('img');
        img.src = `./img/cards/${i}.png`;
        img.id = "card" + i;
        img.className = "drag-and-drop";
        img.style.position = "absolute";
        
        //img.setAttribute('onclick', `getCard(${i})`);
        //img.setAttribute('ondblclick', `getCard(${i})`);
        //img.setAttribute('mousemove', `cardMove(event)`);
        // img.onmousedown = function() {
        //     document.onmousemove = mouseMove;
        //   };
        // document.onmouseup = function() {
        //     document.onmousemove = null;
        // };
        // function mouseMove(e) {
        //     var event = e ? e : window.event;
        //     img.style.top = event.clientY + 'px';
        //     img.style.left = event.clientX + 'px';
        // }
          
        card_root.appendChild(img);
    }
    document.getElementById("card_place").appendChild(card_root);


}

function init(){
    setDateTime();
    create();
}

let count = 0;
var x;
var y;
const cardList = [0,0,0,0,0];
window.addEventListener("load",init);
setInterval(setDateTime,1000);

var elements = document.getElementsByClassName("drag-and-drop");
for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
}