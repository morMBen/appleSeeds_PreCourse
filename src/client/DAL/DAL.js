import axios from "axios";

const END_POINT = '/api/'


export const get = (url) => {
    return axios.get(END_POINT + url,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
}

export const post = (url,data)=>{
    return axios.post(END_POINT + url,data,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
}


