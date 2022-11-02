import { GET_TAGS } from "../../../lib/api/tags";
import * as I from "../../../lib/types/interfaces";
import useOnMount from "../../common/hooks/useOnMount";
import { useState } from "react";

const useTags = () => {
  const [tags, setTags] = useState<I.Tags>({});

  useOnMount(() => {
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
      setTags(tagsData);
    })();
  });

  const selectTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = true;
    setTags(newTags);
  };

  const unselectTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = false;
    setTags(newTags);
  };

  const toggleTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = !newTags[tagName].selected;
    setTags(newTags);
  };

  const clearSelection = () => {
    const newTags = { ...tags };
    Object.keys(newTags).forEach(
      (tagName) => (newTags[tagName].selected = false)
    );
    setTags(newTags);
  };

  const useSelectedTags = () => {
    return Object.keys(tags).filter((tagName) => tags[tagName].selected);
  };

  return {
    tags,
    selectTag,
    unselectTag,
    toggleTag,
    clearSelection,
    useSelectedTags,
  };
};

export default useTags;
