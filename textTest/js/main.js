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
    const client_text = document.getElementById("client_pos");
    client_text.textContent = `client{ x:${x}, y:${y}}`;
    
    const x1 = event.screenX;
    const y1 = event.screenY;
    const screen_text = document.getElementById("screen_pos");
    screen_text.textContent = `screen{ x:${x1}, y:${y1}}`;

    

    //const ele = document.elementsFromPoint(x,y);
    //console.log(ele);


    const card1 = document.getElementById("card1");
    const x2 = card1.getBoundingClientRect().x;
    const y2 = card1.getBoundingClientRect().y;
    const card1_text = document.getElementById("card1_pos");
    card1_text.textContent = `x:${x2}, y:${y2}`;
    const card1Range_text = document.getElementById("card1_range");
    const card1_w = card1.getBoundingClientRect().width;
    const card1_h = card1.getBoundingClientRect().height;
    card1Range_text.textContent = `w:${x2+card1_w}, h:${y2+card1_h}`;

}

function init(){
    document.addEventListener("mousemove", mousemove, false);
}

window.addEventListener("load",init);