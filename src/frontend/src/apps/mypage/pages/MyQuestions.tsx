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
import StyleQBlock from "../../styleQ/components/StyleQBlock";
import myQuestions from "../lib/infiniteScroll/myQuestions";
import useTabBarControl from "../../common/hooks/useTabBarControl";

const MyQuestions = () => {
  const { elems, loadDone, loadMore } = useInfiniteScroll(myQuestions);
  useTabBarControl("useUnmount");
  return (
    <IonPage>
      <Header routeTo="/mypage" text="나의 질문" type="back" />
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

export default MyQuestions;
