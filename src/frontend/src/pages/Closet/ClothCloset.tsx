import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { shirtOutline, trashOutline } from "ionicons/icons";
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
import DownButton from "../../components/common/DownButton";
import { Swiper, SwiperSlide } from "swiper/react";

const ClothCloset = () => {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [modalDetail, setModalDetail] = useState<I.Cloth | null>(null);

  const { tags, toggleTag, clearSelection, selectTag, useSelectedTags } =
    useTags();
  const selectedTags = useSelectedTags();

  const { clothes, loadMore, loadDone } = useClothes();

  const { uploadClothes } = useClothRegist();
  const history = useHistory();

  const onSelectImages = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const $input = e.target as HTMLInputElement;
    uploadClothes($input.files);
    history.push("/clothRegist");
  };

  return (
    <>
      <CategoryTab>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "unset" }}
        >
          <DownButton onClickButton={() => setShowTags(!showTags)} />
          <div
            style={{
              width: `${window.innerWidth - 40 - 32}px`,
              marginLeft: "10px",
            }}
          >
            <Swiper slidesPerView={4.5}>
              <SwiperSlide key={"전체"}>
                <IonCard
                  onClick={() => {
                    clearSelection();
                  }}
                  style={{
                    height: "32px",
                    width: "53px",
                    fontSize: "16px",
                    margin: "0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                  color={selectedTags.length === 0 ? "primary" : "medium"}
                >
                  전체
                </IonCard>
              </SwiperSlide>
              {["상의", "하의", "신발", "모자"].map((cate) => (
                <SwiperSlide key={cate}>
                  <IonCard
                    onClick={() => {
                      clearSelection();
                      selectTag(cate);
                    }}
                    style={{
                      height: "32px",
                      width: "53px",
                      fontSize: "16px",
                      margin: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                    }}
                    color={selectedTags.includes(cate) ? "primary" : "medium"}
                  >
                    {cate}
                  </IonCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </CategoryTab>

      {showTags && (
        <TagDiv>
          {Object.keys(tags).map((tagName) => {
            if (["상의", "하의", "신발", "모자"].includes(tagName)) return;
            return (
              <TagChip
                key={tagName}
                onTagClick={() => {
                  toggleTag(tagName);
                }}
                tagName={"#" + tagName}
                isSelected={tags[tagName].selected}
              />
            );
          })}
        </TagDiv>
      )}
      <CardLayout
        cardComponents={clothes
          .map((cloth) => {
            if (!selectedTags.every((tagName) => cloth.tags.has(tagName)))
              return "";
            return (
              <div
                onClick={() => {
                  setModalDetail(cloth);
                }}
                key={cloth.id}
              >
                <ClothCard cloth={cloth} type="small" />
              </div>
            );
          })
          .filter((elem) => elem !== "")}
      />

      <IonInfiniteScroll
        onIonInfinite={loadMore}
        threshold="100px"
        disabled={loadDone}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        />
      </IonInfiniteScroll>

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
              <ClothCard cloth={modalDetail} type="big" />
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
    </>
  );
};

export default ClothCloset;

const TagDiv = styled.div`
  margin: auto;
  padding: 5px;
  text-align: center;
`;

const CategoryTab = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px 0px;
  vertial-align: middle;
`;
