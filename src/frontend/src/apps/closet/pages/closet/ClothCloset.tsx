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
import ClothCard from "../../components/ClothCard";
import TagChip from "../../../common/components/TagChip";
import useClothRegist from "../../hooks/useClothRegist";
import * as I from "../../../../lib/types/interfaces";
import CardLayout from "../../components/CardLayout";
import { useHistory } from "react-router-dom";
import useClosetClothTags from "../../hooks/useClosetClothTags";
import useClothes from "../../hooks/useClothes";
import DownButton from "../../../common/components/DownButton";
import { Swiper, SwiperSlide } from "swiper/react";
import ClothDetail from "../../containers/ClothDetail";
import { selectedClothIdAtom } from "../../state/clothes";
import { useRecoilState } from "recoil";
import { DELETE_CLOTH } from "../../../../lib/api/cloth";

const ClothCloset = () => {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [selectedClothId, setSelectedClothId] =
    useRecoilState(selectedClothIdAtom);

  const { tags, toggleTag, clearAndSelect, selectTag, selectedTags } =
    useClosetClothTags();

  const { clothes, deleteCloth, loadMore, loadDone } = useClothes();

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
              width: `${
                window.innerWidth <= 400 ? window.innerWidth - 40 - 32 : 328
              }px`,
              marginLeft: "10px",
            }}
          >
            <Swiper slidesPerView={4.5}>
              <SwiperSlide key={"전체"}>
                <IonCard
                  onClick={() => {
                    clearAndSelect("");
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
                      clearAndSelect(cate);
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
                  setSelectedClothId(cloth.id);
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

      <IonModal isOpen={selectedClothId !== -1} mode="ios">
        {/* {selectedClothId && ( */}
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>상세정보</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedClothId(-1)}>
                  Close
                </IonButton>
              </IonButtons>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    deleteCloth(selectedClothId);
                    setSelectedClothId(-1);
                  }}
                >
                  <IonIcon
                    icon={trashOutline}
                    style={{ color: "tomato" }}
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ display: "flex", justifyContent: "center" }}>
            <ClothDetail />
          </IonContent>
        </>
        {/* )} */}
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
