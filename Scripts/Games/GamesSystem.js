//GamesSystem.js

//ゲームカードを入れる場所のサイズを取得
const gamesArea = document.getElementById('gamesArea');
const areaWidth = gamesArea.clientWidth;

//jsonからゲームの情報を持ってきてそれをサイトに表示する
fetch("/Scripts/Games/GamesData.json")
.then(response => response.json())
//gamesにjsonを代入
.then(games => {
    //gamesIDを取得
    const gamesArea = document.getElementById("gamesArea");
    //配列処理
    games.forEach(element => {
        //divの生成
        const div = document.createElement("div");

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
            if(fontsize < 10)
            {
                fontsize = 10;
            }
        }
            console.log(gamesArea.style.fontSize)
        
        //表示内容
        div.innerHTML = `
        <a href="${element.url}" target="_blank">
            <img src="${element.image}">
            <p style="font-size: ${fontsize + "px"}">${element.title}</p>
        </a>
        <button>レビューを書く</button>
        `;

        //サイトに表示
        gamesArea.appendChild(div);
    });
});