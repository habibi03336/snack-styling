import client from "./client";
import address from "./address";
// import { assert } from "console";

const baseURL = address["imgAPI"];

export const GET_CLOTHS = (
  userId?: number,
  page = 0,
  selectedCategory?: string
) => {
  // assert(type === "other" && userId === undefined ? false : true);
  console.log(selectedCategory);
  return client.get(
    baseURL +
      `/cloth/user/?page=${page}` +
      (userId ? `&id=${userId}` : "") +
      (selectedCategory ? `&category=${selectedCategory}` : "")
  );
};

export const GET_CLOTH = (clothId: number) => {
  return client.get(baseURL + `/cloth/${clothId}/`);
};

// export const DELETE_CLOTH = (clothId: number) => {
//   return client.get(baseURL + )
// }

export const POST_CLOTHS = (formData: FormData) =>
  client.post(baseURL + `/cloth/user/`, formData);

interface IClothAndTags {
  id: number;
  tags: number[];
}

export const PATCH_CLOTHS = (clothesData: IClothAndTags[]) =>
  client.patch(baseURL + "/cloth/multi-update/", { clothes: clothesData });

interface IClothData {
  tags: number[];
}
export const PATCH_CLOTH = (clothId: number, clothData: IClothData) =>
  client.patch(baseURL + `/cloth/${clothId}/`, clothData);

export const DELETE_CLOTH = (clothId: number) =>
  client.delete(baseURL + `/cloth/${clothId}/`);
