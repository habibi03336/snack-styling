import { atom } from "recoil";
import { GET_PROFILE } from "../../../lib/api/user";

const userDetailAtom = atom({
  key: "Mypage/userDetail",
  default: {
    nickname: "",
    rank: 0,
  },
  effects: [
    ({ setSelf }) => {
      (async () => {
        const res = await GET_PROFILE();
        const data = res.data;
        setSelf(data);
      })();
    },
  ],
});

export default userDetailAtom;
