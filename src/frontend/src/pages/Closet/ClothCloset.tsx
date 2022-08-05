import { IonFab, IonFabButton } from "@ionic/react";
import { useRecoilState } from "recoil";
import ClothCard from "../../components/closet/ClothCard";
import TagChip from "../../components/common/TagChip";
import useClothes from "../../hooks/useClothes";
import useImageRegist from "../../hooks/useClothRegist";
import useTags from "../../hooks/useTags";
import page from "../../recoil/page";

const ClothCloset = () => {
  const [pageState, setPageState] = useRecoilState(page);
  const { clothes } = useClothes();
  const { tags, toggleTag, selectedTags } = useTags();
  const { uploadClothes } = useImageRegist();

  const onSelectImages = (e: React.FormEvent<HTMLInputElement>) => {
    const $input = e.target as HTMLInputElement;
    uploadClothes($input.files);
    setPageState({ ...pageState, pageType: "clothRegist" });
  };

  return (
    <div>
      {Object.keys(tags).map((tagName) => (
        <TagChip
          key={tagName}
          onTagClick={() => {
            toggleTag(tagName);
          }}
          tagName={tagName}
          isSelected={tags[tagName].selected}
        />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {
          //only render cloth card that has all of selected tags
          clothes.map((cloth) => {
            if (
              !selectedTags.every((selectedTag) => cloth.tags.has(selectedTag))
            )
              return "";
            return <ClothCard key={cloth.id} cloth={cloth} />;
          })
        }
      </div>
      <IonFab
        vertical="bottom"
        horizontal="end"
        style={{ position: "fixed" }}
        slot="fixed"
      >
        <IonFabButton>
          <input
            style={{ opacity: 0 }}
            onInput={onSelectImages}
            id="image-input"
            type="file"
            accept="image/*"
            alt="cloth-upload"
            multiple
          />
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default ClothCloset;
