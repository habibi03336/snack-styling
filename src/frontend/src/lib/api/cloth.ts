import client from "./client";
import address from "./address";

client.defaults.baseURL = address["imgAPI"];

export const getCloths = () => client.get("/api/cloth/");

export const postCloth = (formData: FormData) =>
  client.post("/api/cloth/", formData);

interface IClothAndTags {
  id: number;
  tags: number[];
}

export const patchClothes = (clothesData: IClothAndTags[]) =>
  client.patch("/api/cloth/multi-update/", { clothes: clothesData });
