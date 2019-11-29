import Axios from 'axios';

export default class ResourceAPI {

    getHTTPClient() {
        let httpClient = Axios.create({
            baseURL: "http://www.mocky.io/v2",
            timeout: 30000,
        });
        httpClient.defaults.headers.post['Content-Type'] = 'application/json';
        httpClient.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            console.log(error);
            return Promise.reject(error);
        });
        return httpClient;
    }

    getflow() {
        return this.getHTTPClient().get("/5de0db3f350000225e480e22");
    }
}