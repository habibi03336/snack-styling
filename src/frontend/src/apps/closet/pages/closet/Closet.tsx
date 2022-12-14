import {
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonPage,
  IonHeader,
} from "@ionic/react";
import { MouseEventHandler, useState } from "react";
import { RouteComponentProps } from "react-router";
import Header from "../../../common/components/Header";
import Label from "../../../common/components/Label";
import ClothCloset from "./ClothCloset";
import CodiCloset from "./CodiCloset";

type IClosetSetting = RouteComponentProps<{
  defaultTab: "cloth" | "codi";
}>;

const Closet = ({ match }: IClosetSetting) => {
  const [tabState, setTabState] = useState<"cloth" | "codi">(
    match.params.defaultTab
  );
  const toggleTab: MouseEventHandler = (e) => {
    const target = e.target as HTMLButtonElement;
    if (tabState === target.value) return;
    tabState === "cloth" && setTabState("codi");
    tabState === "codi" && setTabState("cloth");
  };

  return (
    <IonPage>
      <Header text="나의 옷장" type="title" />
      <div>
        <div style={{ padding: "10px 0px 10px 0px" }}>
          <IonSegment
            value={tabState}
            style={{
              height: "44px",
              alignItems: "center",
              marginTop: "5px",
            }}
            mode="ios"
          >
            <IonSegmentButton
              style={{ height: "40px" }}
              value="cloth"
              onClick={toggleTab}
            >
              <Label text="옷" type="big" />
            </IonSegmentButton>
            <IonSegmentButton
              style={{ height: "40px" }}
              value="codi"
              onClick={toggleTab}
            >
              <Label text="코디" type="big" />
            </IonSegmentButton>
          </IonSegment>
        </div>
      </div>

      {tabState === "cloth" && <ClothCloset />}
      {tabState === "codi" && <CodiCloset />}
    </IonPage>
  );
};

export default Closet;
