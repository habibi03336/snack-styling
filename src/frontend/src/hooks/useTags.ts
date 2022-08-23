import { getTags } from "../lib/api/tags";
import { useEffect, useState } from "react";
import * as I from "../interfaces";

const useTags = () => {
  const [tags, setTags] = useState<I.Tags>({});

  useEffect(() => {
    (async () => {
      const res = await getTags();
      const data: I.Tag[] = res.data;
      const tagsData: I.Tags = {};
      data.forEach((tag) => {
        tagsData[tag.name] = { id: tag.id, selected: false };
      });
      setTags(tagsData);
    })();
  }, []);

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
