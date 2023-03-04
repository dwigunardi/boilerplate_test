import {appConfig} from "../config/app";
import {TokenUtil} from "./token";
import axios from "axios";


const instance = axios.create({
    baseURL: appConfig.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        if (TokenUtil.accessToken) {
            // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            config.headers["Authorization"] = 'Bearer ' + TokenUtil.accessToken; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    // await authenticationRepository.api.refreshToken()
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export const http = {
    fetcher: async (url) => {
        const resp = await instance.get(appConfig.apiUrl + url);

        return resp.data;
    },
    get: async (url, opts = {}) => {
        const resp = await instance.post(appConfig.apiUrl + url);

        return resp.data;
    },
    post: async (url, data, opts) => {
        const resp = await instance.post(appConfig.apiUrl + url, data);

        return resp.data;
    },
    put: async (url, data, opts) => {
        const resp = await instance.put(appConfig.apiUrl + url, data);

        return resp.data;
    },
    del: async (url, opts) => {
        const resp = await instance.delete(appConfig.apiUrl + url);

        return resp.data;
    },
    upload: async (url, data) => {

        let req = await instance.post(appConfig.apiUrl + url, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return req.data;
    },
    uploadAntd: (args) => {
        const file = args.file;
        const request = http.upload(file)
            .use(AuthIntercept);

        request
            .on('progress', event => {
                args.onProgress(event);
            })
            .then(it => {
                args.onSuccess(it);
            }).catch(err => {
            args.onError(err);
        });

        return request;
    }
};