import {
  IonButton,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonModal,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import ClothCard from "../../closet/components/ClothCard";
import Header from "../../common/components/Header";

import useClothes from "../../common/hooks/useClothes";
import useCodiRegist from "../hooks/useCodiRegist";
import CodiBoard from "../../common/components/CodiBoard";
import useTags from "../../common/hooks/useTags";
import { RouteComponentProps } from "react-router-dom";

import BottomButton from "../../common/components/BottomButton";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import routeContextAtom from "../../common/state/routeContext";
import CardLayout from "../../closet/components/CardLayout";
import RowFiller from "../../common/components/RowFiller";

type ICodiShowCase = RouteComponentProps<{
  type: "create" | "update";
  mid: string;
  qid: string;
  cid: string;
}>;

const CodiShowCase = ({ match }: ICodiShowCase) => {
  const setRouteContext = useSetRecoilState(routeContextAtom);
  const { selectTag, clearSelection, getSelectedCategory } = useTags();
  const selectedCategory = getSelectedCategory();
  const isSelfCodi = Number(match.params.qid) === -1;
  const { clothes, loadMore, loadDone } = useClothes(
    isSelfCodi ? undefined : Number(match.params.mid),
    selectedCategory
  );

  const codiContext =
    match.params.type === "update" ? "update" : isSelfCodi ? "own" : "answer";
  const {
    codiTemplate,
    putCodiCloth,
    boardConfig,
    setComment,
    comment,
    uploadCodi,
    deleteCodiCloth,
  } = useCodiRegist(
    codiContext,
    Number(match.params.cid),
    Number(match.params.qid)
  );

  const onClickCodiSave = () => {
    uploadCodi.subscribe({
      complete() {
        setRouteContext((context) => {
          const newContext = [...context];
          if (context.length > 1) {
            newContext.pop();
          }
          return newContext;
        });
        if (match.params.mid === "-1") window.location.href = "/closet/codi";
        else window.location.href = `/styleQ/${match.params.qid}`;
      },
    });
  };

  const onBoardImgClick = (category: string) => {
    if (category === selectedCategory) deleteCodiCloth(selectedCategory!);
    else {
      clearSelection();
      selectTag(category);
    }
  };

  return (
    <IonPage>
      <Header type="back" />
      <CodiBoard
        boardConfig={boardConfig}
        codiClothes={codiTemplate.clothes}
        onBoardImgClick={onBoardImgClick}
      />

      <IonContent>
        <CardLayout
          cardComponents={clothes.map((cloth) => {
            if (cloth.category !== selectedCategory) return false;
            return (
              <div
                onClick={() => {
                  putCodiCloth(cloth);
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
          threshold="300px"
          disabled={loadDone}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          />
        </IonInfiniteScroll>
        <RowFiller px={80} />
        <BottomButton activated={true}>
          <IonButton
            color={"primary"}
            style={{ width: "100%" }}
            id="open-modal-codishowcase"
            expand="full"
          >
            ??????
          </IonButton>
        </BottomButton>
        <IonModal trigger="open-modal-codishowcase" initialBreakpoint={0.8}>
          <IonContent className="ion-padding">
            <IonLabel position="stacked">?????? ??????</IonLabel>
            <IonTextarea
              style={{ fontSize: "20px" }}
              rows={8}
              value={comment}
              onIonChange={(e) => setComment(e.detail.value!)}
              autofocus
              placeholder="?????? ????????? ??????????????????"
            />
            <IonButton expand="block" onClick={onClickCodiSave}>
              ??????
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
//?????? 5???, ?????? 6???
export default CodiShowCase;
