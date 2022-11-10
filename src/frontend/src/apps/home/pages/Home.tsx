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
import { useRef, useState } from "react";
import useCodis from "../../common/hooks/useCodis";
import CardLayout from "../../closet/components/CardLayout";
import {
  POST_CODIPLAN,
  PATCH_CODIPLAN,
  DELETE_CODIPLAN,
} from "../../../lib/api/codiplan";
import Header from "../../common/components/Header";
import innerViewWidth from "../../../lib/constants/innerViewWidth";

const Home = () => {
  const { setDate, date, codiSelected, setCodiplan, codiplan } = useHome();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { codis, loadMore, loadDone } = useCodis();

  const codiplanning = async (codiId: number) => {
    const dateString = date.toISOString().split("T")[0];
    if (codiplan[dateString.split("-")[2]] === undefined) {
      await POST_CODIPLAN(codiId, dateString);
      setCodiplan({
        ...codiplan,
        [dateString.split("-")[2]]: codiId,
      });
    } else {
      await PATCH_CODIPLAN(codiId, dateString);
      setCodiplan({
        ...codiplan,
        [dateString.split("-")[2]]: codiId,
      });
    }
    setIsModalOpen(false);
  };

  const deleteCodi = async () => {
    const dateString = date.toISOString().split("T")[0];
    if (codiplan[dateString.split("-")[2]] === undefined) {
      return;
    } else {
      const codiId = codiplan[dateString.split("-")[2]];
      await DELETE_CODIPLAN(codiId, dateString);
      setCodiplan({
        ...codiplan,
        [codiId]: undefined,
      });
      setIsModalOpen(false);
    }
  };

  const codiCards = codis.map((codi) => {
    return (
      <CodiCard
        key={codi.id}
        codi={codi}
        comment={""}
        onCodiClick={() => {
          if (!codi.id) return;
          codiplanning(codi.id);
        }}
      />
    );
  });
  codiCards.unshift(
    <div
      onClick={deleteCodi}
      style={{
        borderRadius: "15px",
        margin: "8px 8px",
        width: `${(innerViewWidth - 40) / 2 - 7.5}px`,
        height: `${(innerViewWidth - 40) / 2 - 7.5}px`,
        backgroundColor: "#fafafa",
        color: "color",
        fontSize: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      X{" "}
    </div>
  );

  return (
    <IonPage>
      <Header type="title" text="스낵 스타일링" />
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonDatetime
            mode="ios"
            value={date.toISOString().split("T")[0]}
            color="primary"
            presentation="date"
            onIonChange={(e) => {
              const selectedDate = new Date(e.detail.value!.split("T")[0]);
              setDate(selectedDate);
            }}
          ></IonDatetime>

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
            <div>
              <strong
                style={{ position: "absolute", padding: "10px", zIndex: 20 }}
              >
                {date.toDateString()}
              </strong>

              {codiSelected && (
                <CodiCard
                  type="big"
                  codi={codiSelected}
                  comment={""}
                  onCodiClick={() => setIsModalOpen(true)}
                />
              )}
              {!codiSelected && (
                <div
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    borderRadius: "15px",
                    margin: "8px 8px",
                    width: `${innerViewWidth * 0.9}px`,
                    height: `${innerViewWidth * 0.9}px`,
                    backgroundColor: "#fafafa",
                    color: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  탭하여 일정에 코디 등록하기.
                </div>
              )}
            </div>
          </div>

          <IonModal isOpen={isModalOpen}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>코디 옷장</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsModalOpen(false)}>
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <CardLayout cardComponents={codiCards} />
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
