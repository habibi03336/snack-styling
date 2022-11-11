import { atom, selector } from "recoil";
import { GET_TAGS } from "../../../lib/api/tags";
import * as I from "../../../lib/types/interfaces";

export const tagState = atom<I.Tags>({
  key: "Closet/tagState",
  default: {},
  effects: [
    ({ setSelf }) => {
      (async () => {
        const res = await GET_TAGS();
        const data: I.Tag[] = res.data;
        const tagsData: I.Tags = {};
        data.forEach((tag) => {
          tagsData[tag.name] = {
            id: tag.id,
            selected: false,
            categoryId: tag.category_id,
          };
        });
        setSelf(tagsData);
      })();
    },
  ],
});

export const selectedCategoryState = selector({
  key: "Closet/selectedCategory",
  get: ({ get }) => {
    const tags: I.Tags = get(tagState);

    return Object.keys(tags).filter(
      (tagName) => tags[tagName].categoryId === 100 && tags[tagName].selected
    );
  },
});

export const selectedTagsState = selector({
  key: "Closet/seletedTags",
  get: ({ get }) => {
    const tags: I.Tags = get(tagState);

    return Object.keys(tags).filter((tagName) => tags[tagName].selected);
  },
});
