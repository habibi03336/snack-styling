import { IonPage, IonTextarea, IonContent, IonDatetime } from "@ionic/react";
import useApplyForm from "../hooks/useApplyForm";

import Header from "../../common/components/Header";
import React, { ChangeEventHandler } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Label from "../../common/components/Label";
import RowFiller from "../../common/components/RowFiller";
import TPOButton from "../components/TPOButton";
import Button from "../../common/components/Button";
import Notification from "../../common/components/Notification";

import BottomButton from "../../common/components/BottomButton";

type IApplyForm = RouteComponentProps<{
  type: "create" | "update";
  qid: string;
}>;

const ApplyForm = ({ match }: IApplyForm) => {
  const {
    date,
    setDate,
    tpos,
    selectTpo,
    description,
    setDescription,
    uploadStyleQ,
    clearTpoSelection,
    notification,
  } = useApplyForm(
    match.params.type === "update" ? Number(match.params.qid) : undefined
  );

  const changeDate = (e: any) => {
    const target = e.target as HTMLInputElement;
    setDate(target.value.split("T")[0]);
  };

  return (
    <IonPage>
      <IonContent>
        <Header type="back" text="스타일링 요청하기" />
        <RowFiller px={10} />
        <Label type="big" text="날짜를 선택해주세요" />
        <RowFiller px={16} />
        <IonDatetime
          presentation="date"
          value={date?.toString()}
          onIonChange={changeDate}
          placeholder="날짜 선택"
        />

        <Label type="big" text="TPO를 선택해주세요" />
        <RowFiller px={16} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {Object.keys(tpos).map((tpoName) => (
            <TPOButton
              onClick={() => {
                if (tpos[tpoName] === true) clearTpoSelection();
                else selectTpo(tpoName);
              }}
              selected={tpos[tpoName]}
              key={tpoName}
              text={tpoName}
            />
          ))}
        </div>
        <RowFiller px={40} />
        <Label type="big" text="간단한 설명을 입력해주세요" />
        <RowFiller px={16} />
        <IonTextarea
          style={{
            height: "120px",
            border: "0.5px solid #eeeeee",
            padding: "16px 20px",
          }}
          placeholder="간단한 설명을 입력해주세요"
          value={description}
          onIonChange={(e) => setDescription(e.detail.value!)}
        ></IonTextarea>
        <Notification text={notification} />
        <RowFiller px={70} />
        <div
          style={{
            position: "absolute",
            width: "100%",
            bottom: "10px",
          }}
        >
          <BottomButton>
            <Button
              onClick={() =>
                uploadStyleQ.subscribe({
                  next(styleQId) {
                    window.location.href = `/styleQ/${styleQId}`;
                  },
                })
              }
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
              color="primary"
            >
              {"Snack !"}
            </Button>
          </BottomButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ApplyForm;
