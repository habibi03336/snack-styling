import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonPage,
} from "@ionic/react";

import React, { MouseEventHandler, useState } from "react";
import { RouteComponentProps } from "react-router";
import Header from "../../components/common/Header";

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
      <Header />
      <IonSegment value={tabState} mode="md">
        <IonSegmentButton value="cloth" onClick={toggleTab}>
          <IonLabel>옷</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="codi" onClick={toggleTab}>
          <IonLabel>코디</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonContent>
        {tabState === "cloth" && <ClothCloset />}
        {tabState === "codi" && <CodiCloset />}
      </IonContent>
    </IonPage>
  );
};

export default Closet;
