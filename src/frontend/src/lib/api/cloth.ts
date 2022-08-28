import client from "./client";
import address from "./address";
// import { assert } from "console";

const baseURL = address["imgAPI"];

export const GET_CLOTHS = (userId: number, page = 0) => {
  // assert(type === "other" && userId === undefined ? false : true);

  return client.get(baseURL + `/cloth/user/${userId}/?page=${page}`);
};

export const POST_CLOTHS = (userId: number, formData: FormData) =>
  client.post(baseURL + `/cloth/user/${userId}/`, formData);

interface IClothAndTags {
  id: number;
  tags: number[];
}

export const PATCH_CLOTHS = (clothesData: IClothAndTags[]) =>
  client.patch(baseURL + "/cloth/multi-update/", { clothes: clothesData });
