import { IonContent, IonDatetime, IonPage } from "@ionic/react";

import useHome from "../hooks/useHome";
import WeatherBox from "../components/home/WeatherBox";
import RowFiller from "../components/common/RowFiller";
import Button from "../components/common/Button";
import useCodis from "../hooks/useCodis";
import CodiCard from "../components/closet/CodiCard";

const Home = () => {
  const { setDate, date } = useHome();
  const { codis } = useCodis();
  console.log(codis[0]);
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
            value={date}
            color="primary"
            presentation="date"
            onIonChange={(e) => setDate(e.detail.value!)}
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
              >
                {codis[0] && "8월 27일의 코디"}
              </div>
            </div>
            {codis[0] && (
              <CodiCard
                type="big"
                codi={codis[0]}
                comment={""}
                onCodiClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
          </div>
          <RowFiller px={10} />
          <Button color="primary">
            <div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                옷 추천을 확인해 보세요
              </div>
            </div>
          </Button>
          <RowFiller px={10} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
