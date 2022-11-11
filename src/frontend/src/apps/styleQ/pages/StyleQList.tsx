import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import Header from "../../common/components/Header";
import StyleQBlock from "../components/StyleQBlock";
import useStyleQList from "../hooks/useStyleQList";

import FloatingButton from "../../common/components/FloatingButton";
import ListDiv from "../../common/components/ListDiv";
import { useSetRecoilState } from "recoil";
import routeContextAtom from "../../common/state/routeContext";

const StyleQList = () => {
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  const { styleQs, loadDone, loadMore, filterChange } = useStyleQList();

  return (
    <IonPage>
      <Header text="스타일 커뮤니티" type="title" />
      <IonContent>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <IonList>
            <IonItem>
              <IonSelect
                placeholder="채택"
                onIonChange={(e) => filterChange(e, "adopt")}
                mode="ios"
              >
                <IonSelectOption value={0}>미채택</IonSelectOption>
                <IonSelectOption value={1}>채택</IonSelectOption>
                <IonSelectOption value={-1}>전체 보기</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          <IonList>
            <IonItem>
              <IonSelect
                placeholder="TPO"
                onIonChange={(e) => filterChange(e, "tpo")}
                mode="ios"
              >
                <IonSelectOption value={-1}>전체</IonSelectOption>
                <IonSelectOption value="0">데일리</IonSelectOption>
                <IonSelectOption value="1">소개팅</IonSelectOption>
                <IonSelectOption value="2">데이트</IonSelectOption>
                <IonSelectOption value="3">동창회</IonSelectOption>
                <IonSelectOption value="4">결혼식</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </div>

        <ListDiv>
          {styleQs.map((styleQ) => (
            <StyleQBlock
              key={styleQ.qid}
              routeTo={`/styleQ/${styleQ.qid}`}
              styleQ={styleQ}
              type="small"
              onClick={() => {
                setRouteContextState((state) => [
                  ...state,
                  `/styleQ/${styleQ.qid}`,
                ]);
              }}
            />
          ))}
        </ListDiv>
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
        <FloatingButton routeTo={"/apply/create/-1"} />
      </IonContent>
    </IonPage>
  );
};

export default StyleQList;
