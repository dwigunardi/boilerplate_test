import { appConfig } from "@/config";
import axios from "axios";
const { AUTH_ATOM_KEY } = require("@/constant");
const { atom, selector, DefaultValue } = require("recoil");

export const themeState = atom({
    key: "get-theme",
    default: 'dark'
})
export const validateAtom = atom({
    key: "validate-selector",
    default: false
})
export const testSelector = selector({
    key:'selector-post',
    get: async({get}) => {
        const validate = get(validateAtom)
        let post = null
     if(validate == 'allow me'){
            post = await axios.get(appConfig.apiUrl + `/posts`).then(res => res).catch(err => err)
            console.log(validate)
        }else{
            post = null
        }
        
        return post || null
    },
    set: ({set}, newValue) => {
        set(validateAtom, 
            newValue instanceof DefaultValue ? newValue : 'test')
    }
})