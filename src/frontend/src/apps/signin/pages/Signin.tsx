import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useSignin from "../hooks/useSignin";
import { validEmail, validPwd } from "../../../lib/utils/validation";
import Header from "../../common/components/Header";
import BottomButton from "../../common/components/BottomButton";
import RowFiller from "../../common/components/RowFiller";
import Label from "../../common/components/Label";

const Signin = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    id,
    setId,
    pwd,
    setPwd,
    pwd2,
    setPwd2,
    code,
    setCode,
    verification,
    emailSend,
    emailConfirm,
    postSignin,
  } = useSignin();

  return (
    <IonPage>
      <Header type="back" text="회원가입" routeTo="/emailLogin" />
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
            <RowFiller px={15} />
            <Label text="이메일" />

            <IonInput
              autofocus
              value={id}
              placeholder="아이디를 입력해 주세요"
              onIonChange={(e) => setId(e.detail.value!)}
              type="email"
              maxlength={50}
              clearInput
              required
              disabled={verification !== -1}
            />

            <RowFiller px={8} />
            {verification === -1 && (
              <IonButton expand="full" onClick={emailSend}>
                이메일 확인
              </IonButton>
            )}
            {verification !== -1 && (
              <>
                <IonRow>
                  <IonInput
                    onIonChange={(e) => setCode(Number(e.detail.value!))}
                    value={code}
                    disabled={verification === 1}
                  ></IonInput>
                  <IonButton
                    disabled={verification === 1}
                    onClick={emailConfirm}
                  >
                    인증하기
                  </IonButton>
                </IonRow>
                <IonLabel>
                  {verification === 0 &&
                    "* 이메일로 전송된 인증번호를 입력해주세요"}
                  {verification === 1 && "* 이메일 인증이 성공했습니다."}
                  {verification === 2 &&
                    "* 이메일 인증이 실패했습니다. 다시 시도해주세요"}
                </IonLabel>
              </>
            )}

            <RowFiller px={15} />
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

            <RowFiller px={15} />
            <Label text="비밀번호 확인" />
            <IonInput
              value={pwd2}
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onIonChange={(e) => setPwd2(e.detail.value!)}
              maxlength={50}
              clearInput
              required
            />

            <IonItem>
              {pwd && pwd2 && pwd !== pwd2 && "비밀번호가 일치하지 않습니다."}
            </IonItem>
          </IonList>
          <BottomButton>
            <IonButton type="submit" expand="block">
              회원가입
            </IonButton>
          </BottomButton>
          <p>{errorMessage}</p>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Signin;
