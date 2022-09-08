import { atom, selector } from "recoil";
import * as I from "../../../lib/types/interfaces";

export const codisAtom = atom<I.CodiTemplate[]>({
  key: "Closet/codisState",
  default: [],
});

export const selectedCodiIdAtom = atom<number>({
  key: "Closet/selectedCodiIdAtom",
  default: -1,
});

export const codiDetailState = selector({
  key: "Closet/codiDetail",
  get: ({ get }) => {
    const codis = get(codisAtom);
    const selectedId = get(selectedCodiIdAtom);

    return codis.find((codi) => codi.id === selectedId);
  },
});

export const closetCodiInfiniteScrollParamAtom = atom({
  key: "Closet/closetCodiPage",
  default: {
    prev: 0,
    page: 1,
    loadDone: false,
  },
});
