import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";

import CardLayout from "../../components/CardLayout";
import CodiCard from "../../components/CodiCard";
import FloatingButton from "../../../common/components/FloatingButton";
import useCodis from "../../../common/hooks/useCodis";

import * as I from "../../../../lib/types/interfaces";
import { selectedCodiIdAtom } from "../../state/codi";
import { useRecoilState } from "recoil";
import RoutingLink from "../../../common/components/RoutingLink";

const CodiCloset = () => {
  const { codis, deleteCodi, loadDone, loadMore } = useCodis();
  const [_, setSelectedCodi] = useRecoilState(selectedCodiIdAtom);
  const [modalDetail, setModalDetail] = useState<I.CodiTemplate | null>(null);

  return (
    <IonContent>
      <CardLayout
        cardComponents={codis.map((codi) => {
          return (
            <CodiCard
              key={codi.id}
              codi={codi}
              comment={""}
              onCodiClick={() => setModalDetail(codi)}
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
      <FloatingButton routeTo="/codiShowcase/create/-1/-1/-1" />
      <IonModal isOpen={modalDetail !== null} mode="ios">
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
                  <IonButton
                    onClick={() => {
                      deleteCodi(modalDetail.id!);
                      setModalDetail(null);
                    }}
                  >
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
                  setSelectedCodi(modalDetail.id!);
                  setModalDetail(null);
                }}
                type="big"
                comment=""
              />
            </IonContent>

            <RoutingLink
              onClick={() => {
                setSelectedCodi(modalDetail.id!);
                setModalDetail(null);
              }}
              routerLink={`/codiShowcase/update/-1/-1/${modalDetail.id}`}
            >
              <>수정하기</>
            </RoutingLink>
          </>
        )}
      </IonModal>
    </IonContent>
  );
};

export default CodiCloset;
