import {
  IonButton,
  IonContent,
  IonLabel,
  IonModal,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import ClothCard from "../components/closet/ClothCard";
import Header from "../components/common/Header";

import useClothes from "../hooks/useCloths";
import useCodiRegist from "../hooks/useCodiRegist";
import CodiBoard from "../components/common/CodiBoard";
import useTags from "../hooks/useTags";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { useRef } from "react";

interface ICodiShowCase
  extends RouteComponentProps<{ mid: string; qid: string }> {
  questionId?: number;
}

const CodiShowCase = ({ match }: ICodiShowCase) => {
  const isSelfCodi = Number(match.params.qid) === -1;
  const { clothes } = useClothes(
    Number(match.params.mid) === -1 ? undefined : Number(match.params.mid)
  ); //
  const { selectTag, clearSelection, useSelectedTags } = useTags();
  const selectedTags = useSelectedTags();
  const {
    codiTemplate,
    putCodiCloth,
    boardConfig,
    setComment,
    comment,
    uploadCodi,
  } = useCodiRegist(isSelfCodi ? "own" : "answer", Number(match.params.qid));
  const history = useHistory();

  const onClickCodiSave = () => {
    uploadCodi.subscribe({
      complete() {
        if (match.params.mid === "-1") window.location.href = "/closet/codi";
        else window.location.href = `/styleQ/${match.params.qid}`;
      },
    });
  };

  const onBoardImgClick = (category: string) => {
    clearSelection();
    selectTag(category);
  };

  return (
    <IonPage>
      <Header type="back" onHeaderClick={() => history.goBack()} />
      <IonContent>
        <CodiBoard
          boardConfig={boardConfig}
          codiClothes={codiTemplate.clothes}
          onBoardImgClick={onBoardImgClick}
        />
        <Swiper
          slidesPerView={2.5}
          style={{ height: "calc(25vh)", padding: "10px" }}
        >
          {
            // render cloth cards filterd by selected category.
            clothes.map((cloth) => {
              if (!cloth.tags.has(selectedTags[0])) return "";
              return (
                <SwiperSlide key={cloth.id}>
                  <ClothCard
                    key={cloth.id}
                    cloth={cloth}
                    onCardClick={() => {
                      putCodiCloth(cloth);
                    }}
                  />
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        <IonButton id="open-modal" expand="block">
          코디 완성
        </IonButton>
        <IonModal trigger="open-modal" initialBreakpoint={0.5}>
          <IonContent className="ion-padding">
            <div className="ion-margin-top">
              <IonLabel position="stacked">코디 설명</IonLabel>
              <IonTextarea
                rows={5}
                value={comment}
                onIonChange={(e) => setComment(e.detail.value!)}
              />
              <IonButton expand="block" onClick={onClickCodiSave}>
                코디 등록하기
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
//상의 5번, 하의 6번
export default CodiShowCase;
