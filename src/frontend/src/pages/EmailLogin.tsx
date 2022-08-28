import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import {
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import { validEmail, validPwd } from "../lib/utils/validation";
import { useHistory } from "react-router";
import Header from "../components/common/Header";
import RowFiller from "../components/common/RowFiller";
import Label from "../components/common/Label";
import Button from "../components/common/Button";

const EmailLogin: React.FC = () => {
  const { id, setId, pwd, setPwd, postLogin } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  return (
    <IonPage>
      <Header
        text="이메일로 시작하기"
        type="back"
        onHeaderClick={() => {
          window.location.href = "/login";
        }}
      />
      <RowFiller px={24} />
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
                history.push("/home");
              },
            });
          }}
        >
          <IonList>
            <Label text="이메일" />
            <IonInput
              value={id}
              placeholder="이메일을 입력해주세요"
              onIonChange={(e) => setId(e.detail.value!)}
              type="email"
              maxlength={50}
              clearInput
              required
            />
            <RowFiller px={20} />
            <Label text="비밀번호" />
            <IonInput
              value={pwd}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onIonChange={(e) => setPwd(e.detail.value!)}
              maxlength={50}
              clearInput
              required
            />
          </IonList>
          <RowFiller px={40} />
          <Button color="primary" activated={id !== "" && pwd !== ""}>
            로그인
          </Button>
        </form>
        <p>{errorMessage}</p>
        <div style={{ position: "absolute", width: "100%", bottom: "20px" }}>
          <IonRouterLink routerLink={"/signin"}>
            <Button color="light"> 회원가입 </Button>
          </IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EmailLogin;
