function init(){
    //alert("Hello World!!");
    setDateTime();
    create();
}

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

function changeHexToRGB(hex){
    const Color = class{
        constructor(hex){
            this.r = parseInt(hex[1]+hex[2],16);
            this.g = parseInt(hex[3]+hex[4],16);
            this.b = parseInt(hex[5]+hex[6],16);
        }
    };
    const color = new Color(hex);
    return color;
}

function button(){
    count++;
    document.getElementById("js").textContent = count;
    document.getElementById("js2").textContent = count;

    const hex = document.getElementById("colorPicker").value;
    //色の16進数→RGB変換
    const rgb = changeHexToRGB(hex);
    alert(`${rgb.r},${rgb.g},${rgb.b}`);
}

function getCard(id){
    const card = document.getElementById("card" + id);
    cardList[id] = (cardList[id] + 90) % 360;
    const d = cardList[id];
    card.style.transform = "rotate(" + d + "deg)";
}

function create(){
    // ul要素を作成
    const ul_element = document.createElement('ul');
    for(let i=0; i<5; i++) {
        const li_element = document.createElement('li');
        li_element.textContent = 'テキスト' + i;
        ul_element.appendChild(li_element);
    }
    // 作成したHTML要素をarticle要素に追加する
    const textbox = document.getElementById('js3');
    textbox.appendChild(ul_element);

    const canvas = document.getElementById("canvas");
    const count_x = 4;
    const count_y = count_x;
    const box_w = 30;
    const box_h = box_w;
    const margin = 20;
    canvas.width = count_x * box_w + margin;
    canvas.height = count_y * box_h + margin;
    if (canvas.getContext){
        const context = canvas.getContext('2d');
        for(let y=0;y<count_y;y++){
            for(let x=0;x<count_x;x++){
                const pos_x = x + (box_w*x);
                const pos_y = y + (box_h*y);
                context.strokeStyle = 'rgb(00,00,00)';
                context.strokeRect(pos_x,pos_y,box_w,box_h);
            }
        }
    }

    const card_root = document.createElement("div");
    for(let i=1; i<=5; i++) {
        const img = document.createElement('img');
        img.src = `./img/cards/${i}.png`;
        img.id = "card" + i;
        img.setAttribute('onclick', `getCard(${i})`);
        //img.setAttribute('ondblclick', `getCard(${i})`);
        card_root.appendChild(img);
    }
    document.getElementById("card_place").appendChild(card_root);


}


let count = 0;
const cardList = [0,0,0,0,0];
window.addEventListener("load",init);
setInterval(setDateTime,1000);