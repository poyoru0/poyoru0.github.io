//reportsystem.js

async function SendReport()
{
    //入力した値を読み取る
    const lastName = document.getElementById("lastName").value;//姓
    const firstName = document.getElementById("firstName").value;//名
    const address = document.getElementById("address").value;
    const report = document.getElementById("foamReport").value;

    //すべて入力されていたら送信
    if(lastName && firstName && address && report)
    {    
        await fetch("https://summer-sound-8cb6.poyoroomweb.workers.dev",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                lastName: lastName,
                firstName: firstName,
                address: address,
                report: report
            })
        });
    }
    else
        alert("入力項目を確認してください。");
}