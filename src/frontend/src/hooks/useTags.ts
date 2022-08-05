import { getTags } from "../lib/api/tags";
import { useEffect, useState } from "react";
import * as I from "../interfaces";

interface ITags {
  [key: string]: {
    id: number;
    selected: boolean;
  };
}

const useTags = () => {
  const [tags, setTags] = useState<ITags>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getTags();
      const data: I.Tag[] = res.data;
      const tagsData: ITags = {};
      data.forEach((tag) => {
        tagsData[tag.name] = { id: tag.id, selected: false };
      });
      setTags(tagsData);
    })();
  }, []);

  const selectTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = true;
    tagsSelectionChange(newTags);
  };

  const unselectTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = false;
    tagsSelectionChange(newTags);
  };

  const toggleTag = (tagName: string) => {
    const newTags = { ...tags };
    newTags[tagName].selected = !newTags[tagName].selected;
    tagsSelectionChange(newTags);
  };

  const clearSelection = () => {
    const newTags = { ...tags };
    Object.keys(newTags).forEach(
      (tagName) => (newTags[tagName].selected = false)
    );
    tagsSelectionChange(newTags);
  };

  const tagsSelectionChange = (newTags: ITags) => {
    setTags(newTags);
    setSelectedTags(getSelectedTags());
  };

  const getSelectedTags = () => {
    const selectTags: string[] = [];
    Object.keys(tags).forEach((tagName) => {
      if (tags[tagName].selected) selectTags.push(tagName);
    });

    return selectTags;
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
