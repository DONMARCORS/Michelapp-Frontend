import config from './config';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

const axios = require('axios');


class FastAPIClient {
    constructor(overrides) {
        this.config = {
            ...config,
            ...overrides,
        };
        this.authToken = config.authToken;

        this.login = this.login.bind(this);
        this.apiClient = this.getApiClient(this.config);
    }

    /* ----- Client Configuration ----- */

    // This is the base client configuration for the API client
    getApiClient(config) {
        const initialConfig = {
            baseURL: `${config.apiBasePath}/api/v1`,
        };
        const client = axios.create(initialConfig);
        client.interceptors.request.use(localStorageTokenInterceptor);
        return client;
    }



    /* ----- API Operations AUTH ----- */
    login(username, password) {
        delete this.apiClient.defaults.headers['Authorization'];

        const form_data = new FormData();
        const grant_type = 'password';
        const item = { grant_type, username, password };
        for (const key in item) {
            form_data.append(key, item[key]);
        }

        return this.apiClient
            .post('/auth/login', form_data)
            .then((resp) => {
                localStorage.setItem('token', JSON.stringify(resp.data));
                return this.fetchUser();
            });
    }

    fetchUser() {
        return this.apiClient.get('/auth/me').then(({ data }) => {
            return data;
        });
    }

    register(firstName, email, password, birthday) {
        const registerData = {
            first_name: firstName,
            password,
            email,
            birthday,
            privilege: 3
        };

        return this.apiClient.post('/auth/signup', registerData).then(
            (resp) => {
                return resp.data;
            });
    }


    // delete user jwt token
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }


    /* ----- API Operations ORDERS ----- */

    // 1 - Get all orders used by admin and vendedor
    getAllOrders() {
        return this.apiClient.get(`/order/all`);
    }


    // 2 - Get all orders belonging to user
    getOwnOrders() {
        return this.apiClient.get(`/order`).then(({ data }) => {
            return data;
        });
    }

    // 3 - Update order
    updateOrder(orderId, values) {
        // create orderData with only the values that are not null or undefined
        const orderData = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== null && values[key] !== undefined) {
                acc[key] = values[key];
            }
            return acc;
        }, {});
        

        console.log(orderData);
        return this.apiClient.put(`/order/${orderId}`, orderData).then(
            (resp) => {
                return resp.data;
            });
    }

    // 4 - Create order
    createOrder(status, owner_id, order_items) {
        const orderData = {
            status,
            owner_id,
            order_items
        };

        return this.apiClient.post('/order', orderData).then(
            (resp) => {
                return resp.data;
            });

    }

    // 5 - Delete order
    deleteOrder(orderId) {
        return this.apiClient.delete(`/order/${orderId}`);
    }

    

    /* ----- API Operations PRODUCTS ----- */


    /* ----- API Operations VENDEDORES ----- */
    getVendedores() {
        return this.apiClient.get(`/vendedores`).then(({ data }) => {
            return data;
        });

    }

    deleteVendedor(vendedorId){
        return this.apiClient.delete(`/vendedores/${vendedorId}`);
    }

    updateVendedor(vendedorId, values){
        // create vendedorData with only the values that are not null or undefined
        const vendedorData = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== null && values[key] !== undefined) {
                acc[key] = values[key];
            }
            return acc;
        }, {});
        

        console.log(vendedorData);
        return this.apiClient.put(`/vendedores/${vendedorId}`, vendedorData).then(
            (resp) => {
                return resp.data;
            });
    }

    createVendedor(values){
        // create vendedorData with only the values that are not null or undefined
        const vendedorData = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== null && values[key] !== undefined) {
                acc[key] = values[key];
            }
            return acc;
        }, {});
        vendedorData["privilege"] = 2;
        return this.apiClient.post('/vendedores', vendedorData).then(
            (resp) => {
                return resp.data;
            });
    }

    /* ----- API Operations CLIENTS ----- */



}


// This interceptor adds the Authorization header to all requests
function localStorageTokenInterceptor(config) {
    const headers = {};
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
        const token = JSON.parse(tokenString);
        const decodedAccessToken = jwtDecode(token.access_token);
        const isAccessTokenValid =
            moment.unix(decodedAccessToken.exp).toDate() > new Date();
        if (isAccessTokenValid) {
            headers['Authorization'] = `Bearer ${token.access_token}`;
        } else {
            alert('Your login session has expired');
        }
    }
    config['headers'] = headers;
    return config;
}

export default FastAPIClient;