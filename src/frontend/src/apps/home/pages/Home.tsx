import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
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
import useCodis from "../hooks/useCodis";
import CardLayout from "../../closet/components/CardLayout";
import { POST_CODIPLAN } from "../../../lib/api/codiplan";

const Home = () => {
  const { setDate, date, codiSelected, setCodiplan, codiplan } = useHome();
  const modal = useRef<HTMLIonModalElement>(null);
  const { codis } = useCodis();
  function dismiss() {
    modal.current?.dismiss();
  }

  const codiplanning = async (codiId: number, date: string) => {
    try {
      console.log(date);
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
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div></div>
          <IonDatetime
            style={{
              width: `${window.innerWidth - 40}px`,
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
                  throw new Error("Function not implemented.");
                }}
              />
            )}
            <div style={{ display: codiSelected ? "none" : "block" }}>
              <div>등록된 코디가 없습니다.</div>

              <IonButton id="open-modal" expand="block">
                코디 등록하기
              </IonButton>
            </div>
          </div>

          <IonModal ref={modal} trigger="open-modal">
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
            </IonContent>
          </IonModal>
          <RowFiller px={10} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
