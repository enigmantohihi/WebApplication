function mdown(e) {
    console.log("mdown");
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
    //document.body.addEventListener("touchmove", mmove, false);
}

function mmove(e) {
    console.log("mmove");
    //ドラッグしている要素を取得
    //var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if(e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    card.style.top = event.pageY - y + "px";
    card.style.left = event.pageX - x + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    card.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    //card.addEventListener("touchend", mup, false);
    //document.body.addEventListener("touchleave", mup, false);

}

function mup(e) {
    console.log("mup");
    //var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    card.removeEventListener("mouseup", mup, false);
    //document.body.removeEventListener("touchmove", mmove, false);
    //card.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    card.classList.remove("drag");

    click();
}

function click(){
    console.log("click");
    angle = (angle+90)%360;
    card.style.transform = "rotate(" + angle + "deg)";
}

function init(){
    card = document.getElementById("card");
    card.style.position = "absolute";
    //card.addEventListener("click", click, false);
    card.addEventListener("mousedown", mdown, false);
    //card.addEventListener("touchstart", mdown, false);
    
}

const MouseState = {
    normal:0,
    down:1,
    move:2,
    up:3
};

let x;
let y;
let angle = 0;
let mouseState = MouseState.normal;
let card;

window.addEventListener("load",init);