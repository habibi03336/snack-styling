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
import useTabBarControl from "../../common/hooks/useTabBarControl";
import StyleQBlock from "../../styleQ/components/StyleQBlock";

const MyAnswers = () => {
  const { elems, loadDone, loadMore } = useInfiniteScroll(myAnswers);
  useTabBarControl("useUnmount");
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
