import { TokenUtil } from "@/utils/token"
import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist()

const persistState = atom({
  key: 'count',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})

const localStorageState = recoilPersist({
    key: 'recoil-persist', // this key is using to store data in local storage
    storage: TokenUtil.stateToken, // configurate which stroage will be used to store the data
  })