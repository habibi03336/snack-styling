import { atom, selector } from "recoil";
import * as I from "../../../lib/types/interfaces";

export const styleQState = atom<I.StyleQ[]>({
  key: "styleQ/styleQs",
  default: [],
});

export const selectedFilterState = atom<{
  adopt?: 0 | 1;
  tpo?: 0 | 1 | 2 | 3 | 4;
}>({
  key: "styleQ/styleQFilter",
  default: {},
});

export const pageState = atom({
  key: "styleQ/page",
  default: 1,
});

export const filterState = selector({
  key: "styleQ/newFilterState",
  get: ({ get }) => {
    const filterState = get(selectedFilterState);
    return filterState;
  },
  set: ({ set }, newValue) => {
    set(pageState, 1);
    set(selectedFilterState, newValue);
    set(styleQState, []);
  },
});
