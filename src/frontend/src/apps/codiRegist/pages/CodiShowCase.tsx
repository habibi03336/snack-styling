import {
  IonButton,
  IonContent,
  IonLabel,
  IonModal,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import ClothCard from "../../closet/components/ClothCard";
import Header from "../../common/components/Header";

import useClothes from "../../common/hooks/useCloths";
import useCodiRegist from "../hooks/useCodiRegist";
import CodiBoard from "../../common/components/CodiBoard";
import useTags from "../../common/hooks/useTags";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import useTabBarControl from "../../common/hooks/useTabBarControl";
import BottomButton from "../../common/components/BottomButton";
import { useRef } from "react";

interface ICodiShowCase
  extends RouteComponentProps<{ mid: string; qid: string }> {
  questionId?: number;
}

const CodiShowCase = ({ match }: ICodiShowCase) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isSelfCodi = Number(match.params.qid) === -1;
  const { clothes, loadMore, loadDone } = useClothes(
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

  const checkAndLoadMore = () => {
    const loadMoreChecker = loadMoreRef.current as HTMLDivElement;
    const xPosition = loadMoreChecker.getBoundingClientRect().x;
    if (xPosition < 400 && !loadDone) {
      loadMore();
    }
  };

  useTabBarControl(isSelfCodi ? "useUnmount" : undefined);
  let clothCnt = 0;
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
          onSlideChange={checkAndLoadMore}
          slidesPerView={2.4}
          spaceBetween={7}
          style={{ height: "calc(30vh)", padding: "10px" }}
        >
          {
            // render cloth cards filterd by selected category.
            clothes.map((cloth) => {
              if (!cloth.tags.has(selectedTags[0])) return "";
              clothCnt++;
              return (
                <SwiperSlide key={cloth.id}>
                  <ClothCard
                    type="small"
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
          <div style={{ display: "none" }}>
            {clothCnt < 3 && !loadDone && setTimeout(loadMore, 500)}
          </div>
          {selectedTags.length > 0 && (
            <SwiperSlide key={-1}>
              <div ref={loadMoreRef}></div>
            </SwiperSlide>
          )}
        </Swiper>

        <BottomButton activated={true}>
          <IonButton
            color={"primary"}
            style={{ width: "100%" }}
            id="open-modal"
            expand="full"
          >
            다음
          </IonButton>
        </BottomButton>
        <IonModal trigger="open-modal" initialBreakpoint={0.3}>
          <IonContent className="ion-padding">
            <div className="ion-margin-top">
              <IonLabel position="stacked">코디 설명</IonLabel>
              <IonTextarea
                rows={5}
                value={comment}
                onIonChange={(e) => setComment(e.detail.value!)}
              />
              <IonButton expand="block" onClick={onClickCodiSave}>
                완료
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
