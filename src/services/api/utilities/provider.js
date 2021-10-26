import axios from 'axios';

const withAxios = (method, url, authorization) => {
    return (data) => axios({
        baseURL: 'https://tienda-js-api.azurewebsites.net/api',
        //baseURL: 'https://localhost:5001/api', 
        method,
        headers : {
            authorization
        },
        url,
        data
    });
};

export default withAxios;