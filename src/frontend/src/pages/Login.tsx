import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonList,
  IonItemDivider,
  IonRouterLink,
} from "@ionic/react";
import { validEmail, validPwd } from "../lib/utils/validation";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const { id, setId, pwd, setPwd, postLogin } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

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

            postLogin.subscribe({
              complete() {
                history.push("/styleQ");
              },
            });
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
          </IonList>
          <IonItemDivider></IonItemDivider>
          <IonButton type="submit" expand="block">
            로그인
          </IonButton>
        </form>
        <p>{errorMessage}</p>
        <IonItemDivider></IonItemDivider>
        <IonRouterLink routerLink={"/signin"}>
          <IonButton expand="block">회원가입</IonButton>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Login;
