import {
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import * as I from "../../../lib/types/interfaces";
import Header from "../../common/components/Header";
import ListDiv from "../../common/components/ListDiv";
import useInfiniteScroll from "../../common/hooks/useInfiniteScroll";
import myAnswers from "../lib/infiniteScroll/myAnswers";

import StyleQBlock from "../../styleQ/components/StyleQBlock";

import { useSetRecoilState } from "recoil";
import routeContextAtom from "../../common/state/routeContext";

const MyAnswers = () => {
  const { elems, loadDone, loadMore } = useInfiniteScroll(myAnswers);
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  return (
    <IonPage>
      <Header text="나의 답변" type="back" />
      <IonContent>
        <ListDiv>
          {
            //render styleQs
            elems.map((elem: I.StyleQ) => (
              <StyleQBlock
                key={elem.qid}
                routeTo={`/styleQ/${elem.qid}`}
                styleQ={elem}
                type="small"
                onClick={() =>
                  setRouteContextState((state) => [
                    ...state,
                    `/styleQ/${elem.qid}`,
                  ])
                }
              />
            ))
          }
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
      </IonContent>
    </IonPage>
  );
};

export default MyAnswers;
