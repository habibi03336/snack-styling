import React, { useState } from "react";
import useEmailLogin from "../hooks/useEmailLogin";
import {
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import { validEmail, validPwd } from "../../../lib/utils/validation";
import { useHistory } from "react-router";
import Header from "../../common/components/Header";
import RowFiller from "../../common/components/RowFiller";
import Label from "../../common/components/Label";
import Button from "../../common/components/Button";
import { useSetRecoilState } from "recoil";
import routeContextAtom from "../../common/state/routeContext";
import BottomButton from "../../common/components/BottomButton";

const EmailLogin: React.FC = () => {
  const { id, setId, pwd, setPwd, postLogin } = useEmailLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  const history = useHistory();

  return (
    <IonPage>
      <Header text="이메일로 시작하기" type="back" routeTo="/home" />
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
                setRouteContextState(() => ["/home"]);
                history.push("/home");
              },
              error() {
                setErrorMessage("로그인에 실패했습니다.");
              },
            });

            return;
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
        <div style={{ color: "tomato" }}>
          <p>{errorMessage}</p>
        </div>
        <BottomButton>
          <IonRouterLink routerLink={"/signin"}>
            <Button color="light"> 회원가입 </Button>
          </IonRouterLink>
        </BottomButton>
      </IonContent>
    </IonPage>
  );
};

export default EmailLogin;
