import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useSignin from "../hooks/useSignin";
import { validEmail, validPwd } from "../../../lib/utils/validation";

const Signin = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const { id, setId, pwd, setPwd, pwd2, setPwd2, postSignin } = useSignin();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>커피 스타일링</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!validEmail(id)) {
              setErrorMessage("이메일 형식이 맞지 않습니다");
              return;
            }
            if (!validPwd(pwd)) {
              setErrorMessage("비밀번호 형식이 맞지 않습니다.");
              return;
            }
            if (pwd !== pwd2) {
              setErrorMessage("비밀번호가 서로 다르게 입력되었습니다.");
              return;
            }
            postSignin.subscribe({
              complete() {
                history.push("/memberDetailRegist");
              },
            });

            setErrorMessage("");
          }}
        >
          <IonList>
            <IonItemDivider>아이디</IonItemDivider>
            <IonItem>
              <IonInput
                value={id}
                placeholder="Enter Input"
                onIonChange={(e) => setId(e.detail.value!)}
                type="email"
                maxlength={50}
                clearInput
                required
              />
            </IonItem>
            <IonItemDivider>비밀번호</IonItemDivider>
            <IonItem>
              <IonInput
                value={pwd}
                type="password"
                placeholder="Enter Input"
                onIonChange={(e) => setPwd(e.detail.value!)}
                maxlength={50}
                clearInput
                required
              />
            </IonItem>
            <IonItemDivider>비밀번호 확인</IonItemDivider>
            <IonItem>
              <IonInput
                value={pwd2}
                type="password"
                placeholder="Enter Input"
                onIonChange={(e) => setPwd2(e.detail.value!)}
                maxlength={50}
                clearInput
                required
              />
            </IonItem>
          </IonList>
          <IonItemDivider></IonItemDivider>
          <IonButton type="submit" expand="block">
            회원가입
          </IonButton>
          <p>{errorMessage}</p>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Signin;
