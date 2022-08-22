import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  accessibilityOutline,
  chevronDownOutline,
  chevronUpOutline,
  shirtOutline,
  trashOutline,
} from "ionicons/icons";
import { useState } from "react";

import styled from "styled-components";
import ClothCard from "../../components/closet/ClothCard";
import TagChip from "../../components/common/TagChip";
import useClothRegist from "../../hooks/useClothRegist";
import * as I from "../../interfaces";
import CardLayout from "../../components/closet/CardLayout";
import { useHistory } from "react-router-dom";
import useTags from "../../hooks/useTags";
import useClothes from "../../hooks/useCloths";

const ClothCloset = () => {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [categorySelected, setCategory] = useState("전체");
  const [modalDetail, setModalDetail] = useState<I.Cloth | null>(null);

  const { tags, toggleTag, clearSelection, selectTag, useSelectedTags } =
    useTags();
  const selectedTags = useSelectedTags();

  const { clothes } = useClothes();

  const { uploadClothes } = useClothRegist();
  const history = useHistory();

  const onSelectImages = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const $input = e.target as HTMLInputElement;
    uploadClothes($input.files);
    history.push("/clothRegist");
  };

  return (
    <div>
      <CategoryTab>
        <IconTab>
          <IonIcon
            style={{ color: categorySelected === "전체" ? "black" : "gray" }}
            icon={accessibilityOutline}
            onClick={() => {
              clearSelection();
              setCategory("전체");
            }}
          />
        </IconTab>
        <IconTab>
          <IonIcon
            style={{ color: categorySelected === "상의" ? "black" : "gray" }}
            icon={shirtOutline}
            onClick={() => {
              clearSelection();
              selectTag("상의");
              setCategory("상의");
            }}
          />
        </IconTab>
        <IconTab>
          <IonIcon
            style={{ color: categorySelected === "하의" ? "black" : "gray" }}
            icon={shirtOutline}
            onClick={() => {
              clearSelection();
              selectTag("하의");
              setCategory("하의");
            }}
          />
        </IconTab>
        <IconTab style={{ position: "absolute", right: "15px" }}>
          <IonIcon
            icon={showTags ? chevronUpOutline : chevronDownOutline}
            onClick={() => {
              setShowTags(!showTags);
            }}
          />
        </IconTab>
      </CategoryTab>
      {showTags && (
        <TagDiv>
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
        </TagDiv>
      )}
      <CardLayout
        cardComponents={clothes.map((cloth) => {
          if (!selectedTags.every((tagName) => cloth.tags.has(tagName)))
            return "";
          return (
            <div
              onClick={() => {
                setModalDetail(cloth);
              }}
              key={cloth.id}
            >
              <ClothCard cloth={cloth} />
            </div>
          );
        })}
      />
      <IonFab
        vertical="bottom"
        horizontal="end"
        style={{ position: "fixed" }}
        slot="fixed"
      >
        <IonFabButton>
          <IonIcon icon={shirtOutline} style={{ position: "absolute" }} />
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

      <IonModal isOpen={modalDetail !== null}>
        {modalDetail && (
          <>
            <IonHeader>
              <IonToolbar>
                <IonTitle>상세정보</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setModalDetail(null)}>
                    Close
                  </IonButton>
                </IonButtons>
                <IonButtons slot="start">
                  <IonButton onClick={() => setModalDetail(null)}>
                    <IonIcon
                      icon={trashOutline}
                      style={{ color: "tomato" }}
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent style={{ display: "flex", justifyContent: "center" }}>
              <ClothCard cloth={modalDetail} />
              <div style={{ padding: "10px" }}>
                {[...modalDetail.tags].map((tag) => (
                  <TagChip key={tag} tagName={tag} isSelected={false} />
                ))}
              </div>
            </IonContent>

            <IonButton>수정하기</IonButton>
          </>
        )}
      </IonModal>
    </div>
  );
};

export default ClothCloset;

const TagDiv = styled.div`
  border: solid 2px black;
  border-width: 2px 0 2px 0;
  margin: auto;
  padding: 5px;
  text-align: center;
`;

const CategoryTab = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  vertial-align: middle;
`;

const IconTab = styled.div`
  font-size: 30px;
  margin: 0 10px 0 10px;
`;
