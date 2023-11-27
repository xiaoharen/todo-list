import axios from "axios";
import BackURL from "./backURL.js";
import FrontURL from "./frontURL.js";
import {useEffect} from "react";

const LoginCheck = () => {
    useEffect(() => {
        axios({
            method: 'GET',
            url: BackURL + 'user/current',
            withCredentials: true,
        })
            .then(res => {
                let url = window.location.pathname;
                if (res.data.data !== null) {
                    if (url === FrontURL + "login") {
                        window.location.replace(FrontURL + "person.html");
                    }
                } else {
                    if (url !== FrontURL) {
                        window.location.replace(FrontURL);
                    }
                }
            }, error => {
                console.log('错误', error.message)
            })
    }, []);
}

export default LoginCheck;