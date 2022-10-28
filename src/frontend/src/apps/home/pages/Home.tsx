import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import useHome from "../hooks/useHome";
import WeatherBox from "../components/WeatherBox";
import RowFiller from "../../common/components/RowFiller";
import CodiCard from "../../closet/components/CodiCard";
import { useRef } from "react";
import useCodis from "../../common/hooks/useCodis";
import CardLayout from "../../closet/components/CardLayout";
import { POST_CODIPLAN } from "../../../lib/api/codiplan";
import Header from "../../common/components/Header";
import innerViewWidth from "../../../lib/constants/innerViewWidth";

const Home = () => {
  const { setDate, date, codiSelected, setCodiplan, codiplan } = useHome();
  const modal = useRef<HTMLIonModalElement>(null);
  const { codis, loadMore, loadDone } = useCodis();
  function dismiss() {
    modal.current?.dismiss();
  }

  const codiplanning = async (codiId: number, date: string) => {
    try {
      await POST_CODIPLAN(codiId, date);
      setCodiplan({
        ...codiplan,
        [date.split("-")[2]]: codiId,
      });
    } catch {
      console.log("error");
    }
    dismiss();
  };
  return (
    <IonPage>
      <Header type="title" text="스낵 스타일링" />
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IonDatetime
            style={{
              width: `${innerViewWidth - 40}px`,
            }}
            mode="ios"
            value={date.toISOString().split("T")[0]}
            color="primary"
            presentation="date"
            onIonChange={(e) => {
              const selectedDate = new Date(e.detail.value!.split("T")[0]);
              setDate(selectedDate);
            }}
          ></IonDatetime>
          <RowFiller px={10} />
          <WeatherBox />
          <RowFiller px={10} />
          <div>
            <div
              style={{
                position: "absolute",
                zIndex: "2",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  position: "relative",
                  left: "20px",
                  top: "20px",
                }}
              ></div>
            </div>
            {true && <strong>{date.toDateString()}</strong>}
            {codiSelected && (
              <CodiCard
                type="big"
                codi={codiSelected}
                comment={""}
                onCodiClick={function (): void {
                  1 + 1;
                }}
              />
            )}
            <div style={{ display: codiSelected ? "none" : "block" }}>
              <div>등록된 코디가 없습니다.</div>

              <IonButton id="open-home-modal" expand="block">
                코디 등록하기
              </IonButton>
            </div>
          </div>

          <IonModal ref={modal} trigger="open-home-modal">
            <IonHeader>
              <IonToolbar>
                <IonTitle>코디 옷장</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={dismiss}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <CardLayout
                cardComponents={codis.map((codi) => {
                  return (
                    <CodiCard
                      key={codi.id}
                      codi={codi}
                      comment={""}
                      onCodiClick={() => {
                        if (!codi.id) return;
                        codiplanning(codi.id, date.toISOString().split("T")[0]);
                      }}
                    />
                  );
                })}
              />
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
          </IonModal>
          <RowFiller px={10} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
