import axios from 'axios';


const withAxios = (method, url, authorization) => {
    return (data) => axios({
        baseURL: process.env.REACT_APP_API_URL,
        method,
        headers : {
            authorization
        },
        url,
        data
    });
};

export default withAxios;