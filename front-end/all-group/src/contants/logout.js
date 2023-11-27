import axios from "axios";
import BackURL from "./backURL.js";
import FrontURL from "./frontURL.js";

const Logout = () => {
    axios({
        method: 'GET',
        url: BackURL + 'user/logout',
        withCredentials: true,
    })
        .then(res => {
            window.location.replace(FrontURL);
        }, error => {
            console.log('错误', error.message)
        })
}

export default Logout;