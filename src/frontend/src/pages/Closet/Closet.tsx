import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonPage,
} from "@ionic/react";

import React, { MouseEventHandler, useState } from "react";
import Header from "../../components/common/Header";

import ClothCloset from "./ClothCloset";
import CodiCloset from "./CodiCloset";

const Closet: React.FC = () => {
  const [tabState, setTabState] = useState<"cloth" | "codi">("cloth");

  const toggleTab: MouseEventHandler = (e) => {
    const target = e.target as HTMLButtonElement;
    if (tabState === target.value) return;
    tabState === "cloth" && setTabState("codi");
    tabState === "codi" && setTabState("cloth");
  };

  return (
    <IonPage>
      <Header />
      <IonSegment>
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
