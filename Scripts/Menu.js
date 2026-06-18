//menu_js
var hiddenMenu = document.getElementById("hiddenLinks");
hiddenMenu.style.visibility = "hidden"

function MenuBotton()
{
    if(hiddenMenu.style.visibility == "hidden")
        hiddenMenu.style.visibility = "visible";
    else
        hiddenMenu.style.visibility = "hidden";
}