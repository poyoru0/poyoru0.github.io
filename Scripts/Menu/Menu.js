//menu_js

var hiddenMenu = document.getElementById("hiddenLinks");
hiddenMenu.style.visibility = "hidden"
//ボタンを押したらメニューを表示非表示切り替える
function MenuBotton()
{
    if(hiddenMenu.style.visibility == "hidden")
        hiddenMenu.style.visibility = "visible";
    else
        hiddenMenu.style.visibility = "hidden";
}