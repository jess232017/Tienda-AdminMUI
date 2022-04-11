import axios from 'axios';

const withAxios = (method, url, authorization) => {
    return (data) => axios({
        //baseURL: import.meta.env.VITE_API_URL,
        baseURL: import.meta.env.VITE_API_URL,
        method,
        headers: {
            authorization
        },
        url,
        data
    });
};

export default withAxios;
