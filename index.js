let gorillaNumber = 0;
const  erroeEl=document.getElementById('follwe-but')
const countEl = document.getElementById('count-el');
const saveEl = document.getElementById('save-el');

// 1. 分别创建加数音效和保存音效
const incrementSound = new Audio('music/coin.mp3');
const saveSound = new Audio('music/wow.mp3');
function increment() {
    // 播放点击/计数音效
    incrementSound.currentTime = 0;
    incrementSound.play();

    gorillaNumber++;
    console.log(gorillaNumber);
    countEl.textContent = gorillaNumber;
}

function save() {
    // 播放保存音效
    saveSound.currentTime = 0;
    saveSound.play();

    // 拼接字符串并更新记录
    let saveCountStr = gorillaNumber + ' - ';
    saveEl.textContent += saveCountStr;

    // 归零并刷新界面
    gorillaNumber = 0;
    countEl.textContent = gorillaNumber;
}
function HumanMade_error(){
    erroeEl.textContent='kibo don\'t have ins'
}