import * as I from "../../../lib/types/interfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedTagsState, tagState } from "../state/tag";
import produce from "immer";

const useTags = () => {
  const [tags, setTags] = useRecoilState<I.Tags>(tagState);
  const selectedTags = useRecoilValue(selectedTagsState);

  const selectTag = (tagName: string) => {
    const newTagState = produce(tags, (draft) => {
      draft[tagName].selected = true;
    });

    setTags(newTagState);
  };

  const unselectTag = (tagName: string) => {
    const newTagState = produce(tags, (draft) => {
      draft[tagName].selected = false;
    });
    setTags(newTagState);
  };

  const toggleTag = (tagName: string) => {
    const newTagState = produce(tags, (draft) => {
      draft[tagName].selected = !draft[tagName].selected;
    });
    setTags(newTagState);
  };

  const clearSelection = () => {
    const newTagState = produce(tags, (draft) => {
      Object.keys(draft).forEach(
        (tagName) => (draft[tagName].selected = false)
      );
    });
    setTags(newTagState);
  };

  return {
    tags,
    selectTag,
    unselectTag,
    toggleTag,
    clearSelection,
    selectedTags,
  };
};

export default useTags;
