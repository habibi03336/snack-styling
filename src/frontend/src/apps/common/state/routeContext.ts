import { atom } from "recoil";

const baseContext =
  window.localStorage.getItem("routeContext") !== null
    ? JSON.parse(window.localStorage.getItem("routeContext")!)
    : ["/home"];

export const routeContextAtom = atom<string[]>({
  key: "Common/routeContext",
  default: baseContext,
  effects: [
    ({ onSet }) => {
      onSet((newContext) => {
        window.localStorage.setItem("routeContext", JSON.stringify(newContext));
      });
    },
  ],
});

export default routeContextAtom;
