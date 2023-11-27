const handleDelete = (event) => {
    event = event.target;
    let url = "http://101.43.23.111:7529/api/task/delete?tid=" + event.getElementsByClassName("tid")[0].innerText;
    fetch(url, {
        credentials: 'include'
    }).then(() => {
        location.reload();
    })
        .catch(e => console.log('错误:', e));
}

const handleAdd = (event) => {
    if (event.key === 'Enter') {
        let todoInfo = document.getElementById("addTodo").value;
        console.log(todoInfo);
        axios({
            method: 'POST',
            url: 'http://101.43.23.111:7529/api/task/create',
            withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({
                taskInfo: todoInfo
            })
        })
            .then(res => {
                console.log(res);
            }, error => {
                console.log('错误', error.message)
            })
    }
};