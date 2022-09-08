import { atom, selector } from "recoil";
import * as I from "../../../lib/types/interfaces";

export const clothesAtom = atom<I.Cloth[]>({
  key: "Closet/clothesState",
  default: [],
});

export const selectedClothIdAtom = atom<number>({
  key: "Closet/selectedClothId",
  default: -1,
});

export const clothDetailState = selector({
  key: "Closet/clothDetail",
  get: ({ get }) => {
    const clothes = get(clothesAtom);
    const selectedId = get(selectedClothIdAtom);

    return clothes.find((cloth) => cloth.id === selectedId);
  },
});

export const closetClothInfiniteScrollParamAtom = atom({
  key: "Closet/closetClothPage",
  default: {
    prev: 0,
    page: 1,
    loadDone: false,
  },
});
