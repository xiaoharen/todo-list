fetch("http://101.43.23.111:7529/api/task/all", {
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {
        let usernames = {
            1: "傅小乐",
            2: "小绿加油",
            3: "Echo"
        };
        let dataList = data.data;
        for (let i = dataList.length - 1; i >= 0; --i) {
            let uid = dataList[i].uid;
            if (uid !== 1 && uid != 2 && uid != 3) {
                continue;
            }
            let temp = dataList[i];
            let username = usernames[temp.uid];
            let todoInfo = temp.taskInfo;
            let creatTime = temp.createTime.slice(0, temp.createTime.length - 10);
            creatTime = creatTime.split('T');
            let invisible = `<div class="group my-script invisible" >`
            let code = `<li class="adobe-product"><div class="products">`;//+ todo info
            let code1 = `</div><span class="status"><span class="status-circle green"></span>`; //+ time
            let code2 = `</span><div class="button-wrapper"><button class="content-button status-button open">`;
            let code3 = username + `</button></div></li></div>`;
            code = invisible + code + creatTime + code1 + todoInfo + code2 + code3;
            let insert = document.getElementById("insert");
            insert.insertAdjacentHTML('beforeend', code);
        }
    })
    .catch(e => console.log('错误:', e));