import { atom } from "recoil";
import * as I from "../../../lib/types/interfaces";

export const clothesState = atom<I.Cloth[]>({
  key: "Closet/clothesState",
  default: [],
});
