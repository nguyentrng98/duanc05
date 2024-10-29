import axios from 'axios';
export const METHOD_HTTP = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT"
}
const baseAxios = async (method, url, data = null, customHeaders = {}) => {
    try {
        const token = localStorage.getItem('token');

        const config = {
            baseURL: 'http://localhost:3000',
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
                ...customHeaders
            },
            data: data,
            timeout: 10000
        };
        const response = await axios(config);
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
            throw new Error(error.response.data.message || 'Request failed');
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received from server');
        } else {
            console.error('Request error:', error.message);
            throw new Error('Request failed');
        }
    }
};

export default baseAxios;