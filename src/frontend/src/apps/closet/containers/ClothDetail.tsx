import ClothCard from "../components/ClothCard";
import * as I from "../../../lib/types/interfaces";
import useTags from "../../common/hooks/useTags";
import TagChip from "../../common/components/TagChip";
import { PATCH_CLOTH } from "../../../lib/api/cloth";
import BottomButton from "../../common/components/BottomButton";
import { useState } from "react";
import { IonButton } from "@ionic/react";

const ClothDetail = ({ cloth }: { cloth: I.Cloth }) => {
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const { tags, toggleTag, useSelectedTags } = useTags();

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
    window.location.href = "/closet/cloth";
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
        <BottomButton>
          <IonButton expand="full" onClick={onClickUpdateDone}>
            수정완료
          </IonButton>
        </BottomButton>
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
      <BottomButton>
        <IonButton
          expand="full"
          onClick={() => {
            setUpdateMode(true);
          }}
        >
          수정하기
        </IonButton>
      </BottomButton>
    </div>
  );
};

export default ClothDetail;
