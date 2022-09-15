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
import StyleAnsCard from "../../styleQ/components/StyleAnsCard";
import myAnswers from "../lib/infiniteScroll/myAnswers";
import useTabBarControl from "../../common/hooks/useTabBarControl";

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
            elems.map((elem: I.StyleAns) => (
              <StyleAnsCard key={elem.id} styleAns={elem} />
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
