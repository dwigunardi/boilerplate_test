import { appConfig } from "@/config";
import axios from "axios";
const { AUTH_ATOM_KEY } = require("@/constant");
const { atom, selector } = require("recoil");

export const themeState = atom({
    key: "get-theme",
    default: 'dark'
})

// export const testSelector = selector({
//     key:'selector-post',
//     get: async() => {
//         let post = null
//         try {
//            let {data} = await axios.get(appConfig.apiUrl + '/posts')
//            post = {data:data}
//         } catch (error) {
//             console.log('ini error dari atom =>',error)
//         }
//         return post || null
//     }
// })