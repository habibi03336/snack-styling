import ClothCard from "../components/ClothCard";
import * as I from "../../../lib/types/interfaces";
import useTags from "../../common/hooks/useTags";
import TagChip from "../../common/components/TagChip";
import { PATCH_CLOTH } from "../../../lib/api/cloth";
import BottomButton from "../../common/components/BottomButton";
import { useState } from "react";
import { clothDetailState, clothesAtom } from "../state/clothes";
import { useRecoilState, useRecoilValue } from "recoil";

const ClothDetail = () => {
  const [clothes, setClothes] = useRecoilState(clothesAtom);
  const cloth = useRecoilValue(clothDetailState);

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const { tags, toggleTag, useSelectedTags, clearSelection } = useTags();

  if (cloth === undefined) {
    return <div></div>;
  }

  const onClickUpdateDone = async () => {
    const selectedTags = useSelectedTags();
    const tagsId: number[] = [];
    selectedTags.forEach((tagName) => {
      tagsId.push(tags[tagName].id);
    });
    const res = await PATCH_CLOTH(cloth.id, { tags: tagsId });
    const clothIdx = clothes.findIndex((elem) => elem.id === cloth.id);
    const newCloth = { ...clothes[clothIdx] };
    newCloth.tags = new Set(selectedTags);
    setClothes([
      ...clothes.slice(0, clothIdx),
      newCloth,
      ...clothes.slice(clothIdx + 1),
    ]);
    clearSelection();
    setUpdateMode(false);
  };

  updateMode === false &&
    cloth &&
    [...cloth.tags.values()].forEach((elem) => {
      if (tags[elem]) tags[elem].selected = true;
    });
  if (updateMode) {
    return (
      <div style={{ padding: "5px 20px" }}>
        <ClothCard cloth={cloth} type="big" />
        <div style={{ padding: "10px" }}>
          {Object.keys(tags).map((tag) => (
            <TagChip
              key={tag}
              tagName={tag}
              isSelected={tags[tag].selected}
              onTagClick={() => toggleTag(tag)}
            />
          ))}
        </div>
        <BottomButton onClick={onClickUpdateDone}>수정완료</BottomButton>
      </div>
    );
  }
  return (
    <div style={{ padding: "5px 20px" }}>
      <ClothCard cloth={cloth} type="big" />
      <div style={{ padding: "10px" }}>
        {[...cloth.tags].map((tag) => (
          <TagChip key={tag} tagName={tag} isSelected={false} />
        ))}
      </div>
      <BottomButton
        onClick={() => {
          setUpdateMode(true);
        }}
      >
        수정하기
      </BottomButton>
    </div>
  );
};

export default ClothDetail;
