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
  useIonViewWillEnter,
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
import useClothes from "../../../common/hooks/useClothes";
import DownButton from "../../../common/components/DownButton";
import { Swiper, SwiperSlide } from "swiper/react";
import ClothDetail from "../../containers/ClothDetail";
import { selectedClothIdAtom } from "../../state/clothes";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DELETE_CLOTH } from "../../../../lib/api/cloth";
import routeContextAtom from "../../../common/state/routeContext";
import innerViewWidth from "../../../../lib/constants/innerViewWidth";
import RowFiller from "../../../common/components/RowFiller";

const ClothCloset = () => {
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [selectedCloth, setSelectedCloth] = useState<I.Cloth | null>(null);

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
    setRouteContextState((state) => [...state, "/clothRegist"]);
  };

  return (
    <IonContent>
      <CategoryTab>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "unset" }}
        >
          <DownButton onClickButton={() => setShowTags(!showTags)} />
          <div
            style={{
              width: `${innerViewWidth - 40 - 32}px`,
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
        cardComponents={clothes.map((cloth) => {
          if (!selectedTags.every((tagName) => cloth.tags.has(tagName)))
            return false;
          return (
            <div
              onClick={() => {
                setSelectedCloth(cloth);
              }}
              key={cloth.id}
            >
              <ClothCard cloth={cloth} type="small" />
            </div>
          );
        })}
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

      {!loadDone && <RowFiller px={300} />}
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
      <IonModal isOpen={selectedCloth !== null} mode="ios">
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>상세정보</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedCloth(null)}>
                  Close
                </IonButton>
              </IonButtons>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    deleteCloth(selectedCloth!.id);
                    setSelectedCloth(null);
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
            {selectedCloth && <ClothDetail cloth={selectedCloth} />}
          </IonContent>
        </>
      </IonModal>
    </IonContent>
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
