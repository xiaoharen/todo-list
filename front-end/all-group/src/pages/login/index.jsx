import axios from 'axios';
import './index.css'
import BackURL from '../../contants/backURL.js';
import FrontURL from "../../contants/frontURL.js";

const handleSubmit = () => {
    let account = document.getElementById('account').value;
    let password = document.getElementById('password').value;
    let submit_bnt = document.getElementById('submit');
    const loginData = {
        userAccount: account,
        userPassword: password
    };
    axios({
        method: 'POST',
        url: BackURL + 'user/login',
        withCredentials: true,
        headers: {'content-type': 'application/json'},
        data: JSON.stringify(loginData)
    })
        .then(res => {
            if (res.data.data != null) {
                let uid = res.data.data.uid;
                if (uid >= 1 && uid <= 3) {
                    open(FrontURL + 'todo/xhr.html');
                } else {
                    open(FrontURL + 'person.html');
                }
            } else {
                alert("账号或密码错误!")
            }
        }, error => {
            console.log('错误', error.message)
        })
}

export default function Index() {
    return (
        <>
            <meta charSet="UTF-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <title>Document</title>
            <form style={{marginTop: "10%"}}>
                <div className="segment">
                    <h1>Undefined C</h1>
                    <h3>Group schedule</h3>
                </div>
                <label>
                    <input type="text" id="account" placeholder="Account"/>
                </label>
                <label>
                    <input type="password" id="password" placeholder="Password"/>
                </label>
                <button className="red" type="button" id="submit" onClick={handleSubmit}>
                    <i className="icon ion-md-lock"/> Log in
                </button>
            </form>
        </>
    )
}