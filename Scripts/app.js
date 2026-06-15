var yesBtn = document.getElementById('yes');
var noBtn = document.getElementById("no");

var fontsizeY = parseFloat(window.getComputedStyle(yesBtn).fontSize);
var fontsizeN = parseFloat(window.getComputedStyle(noBtn).fontSize);

const maxX = window.innerWidth - noBtn.offsetWidth;
const maxY = window.innerHeight - noBtn.offsetHeight;

var count = 0;

//yesボタンを押したら実行
yesBtn.onclick = function()
{
    document.getElementById('questionScene').style.display = "none";
    document.getElementById('answerScene').style.display = "block";
}

//noボタンを押したら実行
noBtn.onclick = function()
{
    if(count < 5)
    {
        yesBtn.style.fontSize = fontsizeY * (count * 0.5 + 2) + "px";
        noBtn.style.fontSize = fontsizeN / (count * 0.2 + 1.5) + "px";
        count++;
    }
    else
    {
        var rX = Math.floor(Math.random() * maxX);
        var rY = Math.floor(Math.random() * maxY);

        noBtn.style.left = rX + "px";
        noBtn.style.top = rY + "px";
    }
}