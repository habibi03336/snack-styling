import { IonButton, IonContent, IonPage, IonTextarea } from "@ionic/react";
import { useState } from "react";

import { POST_SUGGESTION } from "../../../lib/api/user";
import Header from "../../common/components/Header";

const CustomerLetter = () => {
  const [text, setText] = useState("");
  const [notification, setNotification] = useState("");

  const onClickSubmit = async () => {
    await POST_SUGGESTION(text);
    setText("");
    setNotification("성공적으로 전달되었습니다.");
  };
  return (
    <IonPage>
      <Header text="건의함" type="back" />
      <IonContent>
        <IonTextarea
          placeholder="건의사항을 적어주세요"
          autofocus
          style={{ fontSize: "20px" }}
          value={text}
          rows={12}
          onIonChange={(e) => {
            if (!e.detail.value) return;
            setText(e.detail.value);
          }}
        />
        <IonButton onClick={onClickSubmit} expand="full">
          건의하기
        </IonButton>
        {notification}
      </IonContent>
    </IonPage>
  );
};

export default CustomerLetter;
