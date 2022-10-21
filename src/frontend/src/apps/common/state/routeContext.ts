import { atom } from "recoil";

export const routeContextAtom = atom<string[]>({
  key: "Common/routeContext",
  default: ["/home"],
});

export default routeContextAtom;
