//indexSystem.js

//-----お知らせの機能-----
const card = document.querySelector(".newsCard");
const dotArea = document.querySelector(".dotArea");
let maxIndex = 0;
let index = 0;
let autoRightScroll;

//自動スクロールをオン
StartAutoScroll();

//jsonから画像数、urlを取得してお知らせページに出す
fetch("/Datas/NoticeData.json")
.then(response => response.json())
//noticesにjsonを代入
.then(notices => {
    let count = 0;
    notices.forEach(element => {
        //imgタグを作成
        const img = document.createElement('img');
        //dotタグを追加
        const dot = document.createElement('dot');
        if(count == 0)
            dot.classList.add("active");

        img.src = element.image;

        card.appendChild(img);
        dotArea.appendChild(dot);
        count++;
    });
    //お知らせの数を加算
    maxIndex = notices.length - 1;
});

//ドットの更新
function UpdateDots()
{
    const allDot = document.querySelectorAll("dot");

    //すべてのドットからactiveを消す
    allDot.forEach(dot => dot.classList.remove("active"));

    allDot[index].classList.add("active");
}

//右の画像にスクロールする端にあれば反対側のページに行く
function rightBtn()
{
    let scrollWidth = card.clientWidth;

    index++;

    if(maxIndex < index)
    {
        index = 0;
        scrollWidth = maxIndex * -card.clientWidth;
    }

    card.scrollBy({
        left: scrollWidth,
        behavior: "smooth"
    });

    UpdateDots();

    ResetAutoScroll();
}

//左の画像にスクロールする
function leftBtn()
{
    let scrollWidth = -card.clientWidth;

    index--;

    if(index < 0)
    {
        index = maxIndex;
        scrollWidth = maxIndex * card.clientWidth;
    }

    card.scrollBy({
        left: scrollWidth,
        behavior: "smooth"
    });

    UpdateDots();

    ResetAutoScroll();
}

//自動スクロールをスタートさせる
function StartAutoScroll()
{
    //３秒おきに実行
    autoRightScroll = setInterval(() => {
        rightBtn();
    },3000);
}

//自動スクロールをリセットさせる
function ResetAutoScroll()
{
    clearInterval(autoRightScroll);
    autoRightScroll = null;
    StartAutoScroll();
}