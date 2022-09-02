import { atom } from "recoil";
export interface IProcessClothes {
  tempId: string;
  id?: number;
  imageFile: File;
  tags: number[];
  imageUpdated: boolean;
  imgSrc?: string;
}

export const processClothesState = atom<IProcessClothes[]>({
  key: "processClothes",
  default: [],
});

export default processClothesState;
