//GamesSystem.js

fetch("GamesData.json")
.then(response => response.json())
//gamesにjsonを代入
.then(games => {
    //gamesIDを取得
    const gamesArea = document.getElementById("gamesArea");
    //配列処理
    games.forEach(element => {
        //pの生成
        const div = document.createElement("div");
        
        //表示内容
        div.innerHTML = `
        <a href="${element.url}" target="_blank">
            <img src="${element.image}">
            <p>${element.title}</p>
        </a>
        <button>レビューを書く</button>
        `;
        //サイトに表示
        gamesArea.appendChild(div);
    });
});