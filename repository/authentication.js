import {http} from "../utils/http";
import {TokenUtil} from "../utils/token";
import Router from 'next/router';
import useSWR from "swr";
import {appConfig} from "../config/app";

const url = {
    login: () => '/authentication/login',
    register: () => appConfig.authService + '/auth/register',
    resendRegister: () => appConfig.authService + '/auth/registration-email',
    verifyEmail: (page) => appConfig.authService + `/auth/verify-email/${page}`,
    refreshToken: () => appConfig.authService + '/auth/refresh-token',
    forgotPassword: () => appConfig.authService + '/auth/forgot-password',
    resetPassword: () => appConfig.authService + '/auth/reset-password',
    checkEmail: () => appConfig.authService + '/auth/available-email',
    checkBlacklistEmail: () => appConfig.authService + '/auth/available-blacklist-email',
    logout: () => appConfig.authService + `/auth/logout`,
    contact: () => appConfig.authService + '/config_general/contact',
};

const hooks = {
    useVerify(code) {
        return useSWR(url.verifyEmail(code), http.fetcher);
    },
    useContact() {
        return useSWR(url.contact, http.fetcher);
    },
}

const api = {
    async login({email, password}) {
        return await http.post(url.login(), {
            email,
            password,
        })
    },
    register(data) {
        return http.post(url.register(), data);
    },
    resendRegister(email) {
        return http.post(url.resendRegister(), email);
    },
    forgotPassword(data) {
        return http.post(url.forgotPassword(), data);
    },
    resetPassword(data) {
        return http.post(url.resetPassword(), data);
    },
    checkEmail(data) {
        return http.post(url.checkEmail(), data);
    },
    async refreshToken() {
        try {

            let result = await http.post(url.refreshToken(), {
                refresh_token: TokenUtil.refreshToken,
            });

            console.log(this.refreshToken, "REFRESH")
            TokenUtil.setAccessToken(result.data.access_token);
            TokenUtil.persistToken();
        } catch (e) {
            TokenUtil.clearAccessToken();
            TokenUtil.clearRefreshToken();
            TokenUtil.persistToken();
            await Router.push("/login");
            throw e;
        }
    },
    async logOut () {
        // const result = await http.post(url.logout())
        TokenUtil.clearAccessToken();
        // TokenUtil.clearRefreshToken();
        TokenUtil.persistToken();
        await Router.push("/login");
        return
    },
    async checkBlacklistEmail({pic_email}) {
        return http.post(url.checkBlacklistEmail(), {
            pic_email: pic_email
        });
    },
};

export const authenticationRepository = {
    url,
    hooks,
    api,
}