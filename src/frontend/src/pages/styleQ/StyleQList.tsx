import {
  IonCard,
  IonCardHeader,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";

import Header from "../../components/common/Header";
import StyleQBlock from "../../components/styleQ/StyleQBlock";
import useStyleQList from "../../hooks/useStyleQList";

import FloatingButton from "../../components/common/FloatingButton";
import ListDiv from "../../components/styleComponent/ListDiv";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../../components/common/Title";

const dummyContents = [
  { title: "옷 예쁘게 입는법 1탄", id: 1 },
  { title: "옷 예쁘게 입는법 2탄", id: 2 },
  { title: "옷 예쁘게 입는법 3탄", id: 3 },
  { title: "옷 예쁘게 입는법 4탄", id: 4 },
];

const StyleQList = () => {
  const { styleQs, load, loadMore } = useStyleQList();

  return (
    <IonPage>
      <Header />
      <IonContent>
        <Title title={"Magazine"} />
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
        <Title title={"Open Styling"} />
        <ListDiv>
          {
            //render styleQs
            styleQs.map((styleQ) => (
              <StyleQBlock
                key={styleQ.qid}
                routeTo={`/styleQ/${styleQ.qid}`}
                styleQ={styleQ}
              />
            ))
          }
        </ListDiv>

        <IonInfiniteScroll
          onIonInfinite={loadMore}
          threshold="100px"
          disabled={load}
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
