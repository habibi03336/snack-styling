import { atom } from "recoil";

type TPageState = "main" | "clothRegist" | "codiShowCase";

const page = atom<TPageState>({
  key: "pageState",
  default: "main",
});

export default page;
