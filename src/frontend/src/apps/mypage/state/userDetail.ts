import { atom } from "recoil";

const userDetailAtom = atom({
  key: "Mypage/userDetail",
  default: {
    nickname: "춤추는 훌라후프",
    level: 3,
  },
});

export default userDetailAtom;
