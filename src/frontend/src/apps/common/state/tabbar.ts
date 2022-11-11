import { selector } from "recoil";
import routeContextAtom from "./routeContext";

const tabbarAtom = selector<boolean>({
  key: "Common/tabbar",
  get: ({ get }) => {
    const routeContext = get(routeContextAtom);

    return routeContext.length === 1;
  },
});

export default tabbarAtom;
