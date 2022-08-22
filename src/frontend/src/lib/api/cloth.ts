import client from "./client";
import address from "./address";
// import { assert } from "console";

const baseURL = address["imgAPI"];

export const getCloths = (userId: number) => {
  // assert(type === "other" && userId === undefined ? false : true);

  return client.get(baseURL + `/api/cloth/user/${userId}/`);
};

export const postCloth = (userId: number, formData: FormData) =>
  client.post(baseURL + `/api/cloth/user/${userId}/`, formData);

interface IClothAndTags {
  id: number;
  tags: number[];
}

export const patchClothes = (clothesData: IClothAndTags[]) =>
  client.patch(baseURL + "/api/cloth/multi-update/", { clothes: clothesData });
