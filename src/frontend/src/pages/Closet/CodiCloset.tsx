import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";

import CardLayout from "../../components/closet/CardLayout";
import CodiCard from "../../components/closet/CodiCard";
import FloatingButton from "../../components/common/FloatingButton";
import useCodis from "../../hooks/useCodis";

import * as I from "../../interfaces";

const CodiCloset = () => {
  const { codis } = useCodis();
  const [modalDetail, setModalDetail] = useState<I.CodiTemplate | null>(null);

  return (
    <div>
      <CardLayout
        cardComponents={codis.map((codi) => {
          return (
            <CodiCard
              key={codi.id}
              codi={codi}
              onCodiClick={() => setModalDetail(codi)}
            />
          );
        })}
      />
      <FloatingButton routeTo="/codiShowcase/-1/-1" />

      <IonModal isOpen={modalDetail !== null}>
        {modalDetail && (
          <>
            <IonHeader>
              <IonToolbar>
                <IonTitle>상세정보</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setModalDetail(null)}>
                    Close
                  </IonButton>
                </IonButtons>
                <IonButtons slot="start">
                  <IonButton onClick={() => setModalDetail(null)}>
                    <IonIcon
                      icon={trashOutline}
                      style={{ color: "tomato" }}
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <CodiCard
                codi={modalDetail}
                onCodiClick={() => {
                  console.log("codiCard");
                }}
                type="big"
              />
            </IonContent>

            <IonButton>수정하기</IonButton>
          </>
        )}
      </IonModal>
    </div>
  );
};

export default CodiCloset;
