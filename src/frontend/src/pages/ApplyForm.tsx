import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonChip,
  IonContent,
  IonLabel,
  IonButton,
} from "@ionic/react";
import useApplyForm from "../hooks/useApplyForm";

import Header from "../components/common/Header";
import React, { ChangeEventHandler } from "react";
import { useHistory } from "react-router";

const ApplyForm: React.FC = () => {
  const {
    date,
    setDate,
    tpos,
    selectTpo,
    description,
    setDescription,
    uploadStyleQ,
  } = useApplyForm();

  const changeDate: ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    setDate(target.value);
  };
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <Header type="back" onHeaderClick={() => history.goBack()} />
        <IonToolbar>
          <IonTitle>날짜</IonTitle>
        </IonToolbar>
        <input type="date" value={date?.toString()} onChange={changeDate} />
        <IonToolbar>
          <IonTitle>TPO</IonTitle>
        </IonToolbar>
        {Object.keys(tpos).map((tpoName) => (
          <IonChip
            onClick={() => {
              selectTpo(tpoName);
            }}
            key={tpoName}
            color={tpos[tpoName] ? "primary" : ""}
          >
            <IonLabel>{tpoName}</IonLabel>
          </IonChip>
        ))}

        <IonToolbar>
          <IonTitle>간단한 설명</IonTitle>
        </IonToolbar>
        <IonTextarea
          placeholder="Enter more information here..."
          value={description}
          onIonChange={(e) => setDescription(e.detail.value!)}
        ></IonTextarea>
        <IonButton
          expand="block"
          onClick={() =>
            uploadStyleQ.subscribe({
              next(styleQId) {
                window.location.href = `/styleQ/${styleQId}`;
              },
            })
          }
        >
          신청하기
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ApplyForm;
