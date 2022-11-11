import { atom } from "recoil";
export interface userState {
  isLogined: boolean;
  uid: number | null;
  id: number;
}
const id = window.localStorage.getItem("id");

export const userAtom = atom<userState>({
  key: "Common/userState",
  default: {
    isLogined: id ? true : false,
    uid: null,
    id: Number(id),
  },
});

export default userAtom;
