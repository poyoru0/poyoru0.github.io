//GamesSystem.js

//ゲームカードを入れる場所のサイズを取得
const gamesArea = document.getElementById('gamesArea');
const areaWidth = gamesArea.clientWidth;

//jsonからゲームの情報を持ってきてそれをサイトに表示する
fetch("/Datas/GameData.json")
.then(response => response.json())
//gamesにjsonを代入
.then(games => {
    //gamesIDを取得
    const gamesArea = document.getElementById("gamesArea");
    //配列処理
    games.forEach(element => {
        //divの生成
        const d = document.createElement("d");

        //タイトルの文字数取得
        const titleString = JSON.stringify(element.title);
        const titleLength = titleString.length - 2;
        var fontsize = 0;
        //PCなら
        if(768 < areaWidth)
        {
            fontsize = 40 - titleLength;
        }
        else//スマホなら
        {
            fontsize = 24 - titleLength;
            if(fontsize < 5)
            {
                fontsize = 5;
            }
        }
        
        //表示内容
        d.innerHTML = `
        <a href="${element.url}" target="_blank">
            <div class="img">
                <img src="${element.image}">
            </div>
                <p style="font-size: ${fontsize + "px"}">${element.title}</p>
        </a>
        <div class="button">
            <button onclick="OpenReviewBtn('${element.title}')">レビューを書く</button>
        </div>
        `;

        //サイトに表示
        gamesArea.appendChild(d);
    });
});

//-----レビュー系-----

const reviewcard = document.getElementById("reviewCard");
reviewcard.style.visibility = "hidden";

var reviewScore = 1;

//レビュー画面を閉じるボタン
function CloseReviewBtn()
{
    reviewcard.style.visibility = "hidden";
}

var gT;
//レビューボタンを押すと押したゲームのタイトルが入ってレビューカードを出す
function OpenReviewBtn(title)
{
    const gameTitle = document.getElementById("reviewGameTitle");
    gT = title;
    
    //PCなら
    if(768 < areaWidth)
    {
        gameTitle.textContent = ":" + title;
    }
    else
    {
        gameTitle.textContent = title;
    }

    reviewcard.style.visibility = "visible";
}

//押したときに返されたscoreに応じて星の表示を変える
function ReviwScore(score)
{
    //評価を保存しておく
    reviewScore = score;

    const stars = document.getElementById("stars");
    const star1 = document.getElementById("star1");
    const star2 = document.getElementById("star2");
    const star3 = document.getElementById("star3");
    const star4 = document.getElementById("star4");
    const star5 = document.getElementById("star5");

    /*いったん全て評価なしにする*/
    star2.textContent = "☆"
    star2.style.color = "rgb(127,127,127)";
    star3.textContent = "☆"
    star3.style.color = "rgb(127,127,127)";
    star4.textContent = "☆"
    star4.style.color = "rgb(127,127,127)";
    star5.textContent = "☆"
    star5.style.color = "rgb(127,127,127)";

    //スコアに応じて星の表示を変える
    switch(score)
    {
        case 5:
            star5.textContent = "★"
            star5.style.color = "yellow";
        case 4:
            star4.textContent = "★"
            star4.style.color = "yellow";
        case 3:
            star3.textContent = "★"
            star3.style.color = "yellow";
        case 2:
            star2.textContent = "★"
            star2.style.color = "yellow";
        case 1:
            star1.textContent = "★"
            star1.style.color = "yellow";
            break;
    }
}

//書いたレビュー内容をdiscordに送信する
async function SendReview()
{
    //送信する内容を取得
    const score = reviewScore;
    const comment = document.getElementById("reviewComment").value;

    await fetch("https://shiny-sea-2a59.poyoroomweb.workers.dev",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: gT,
            review: score,
            impression: comment
        })
    });

    CloseReviewBtn();

    const popup = document.getElementById("sendNotifination");
    popup.classList.remove("show");

    // アニメーションをリセット
    void popup.offsetWidth;

    popup.classList.add("show");
}