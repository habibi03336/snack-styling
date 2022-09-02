import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";

import Header from "../../common/components/Header";
import StyleQBlock from "../components/StyleQBlock";
import useStyleQList from "../hooks/useStyleQList";

import FloatingButton from "../../common/components/FloatingButton";
import ListDiv from "../../common/components/ListDiv";

// const dummyContents = [
//   { title: "옷 예쁘게 입는법 1탄", id: 1 },
//   { title: "옷 예쁘게 입는법 2탄", id: 2 },
//   { title: "옷 예쁘게 입는법 3탄", id: 3 },
//   { title: "옷 예쁘게 입는법 4탄", id: 4 },
// ];

const StyleQList = () => {
  const { styleQs, loadDone, loadMore } = useStyleQList();

  return (
    <IonPage>
      <Header text="스타일 커뮤니티" type="title" />
      <IonContent>
        {/* <Title title={"Magazine"} />
        <Swiper slidesPerView={2.5} style={{ height: "calc(25vh)" }}>
          {dummyContents.map((content) => {
            // make cloth swiper with tags
            return (
              <SwiperSlide key={content.id}>
                <IonCard style={{ height: "70%" }}>
                  <IonCardHeader>{content.title}</IonCardHeader>
                </IonCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Label text={"Open Styling"} type="big" />
        <RowFiller px={12} /> */}
        <ListDiv>
          {
            //render styleQs
            styleQs.map((styleQ) => (
              <StyleQBlock
                key={styleQ.qid}
                routeTo={`/styleQ/${styleQ.qid}`}
                styleQ={styleQ}
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
          {/* 모든 보기가 끝났습니다. */}
        </IonInfiniteScroll>
        <FloatingButton routeTo={"/apply"} />
      </IonContent>
    </IonPage>
  );
};

export default StyleQList;
