import { atom } from "recoil";
export interface userState {
  isLogined: boolean;
  uid: number | null;
  id: number | null;
}
const mid = window.localStorage.getItem("mid");

export const userState = atom<userState>({
  key: "userState",
  default: {
    isLogined: mid ? true : false,
    uid: null,
    id: mid ? Number(mid) : null,
  },
});

export default userState;
