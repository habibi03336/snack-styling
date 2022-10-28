import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { AUTH_SIGNIN, EMAIL_CONFIRM, EMAIL_SEND } from "../../../lib/api/auth";
import { userAtom } from "../../common/state/user";
import storeToken from "../../login/lib/storeToken";

// interface IUserFeatures {
//   age: number | null;
//   sex: "m" | "f" | "none";
//   height: number | null;
//   weight: number | null;
//   shape: 0 | 1 | 2 | 3 | 4 | 5;
// }

const useSignin = () => {
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [pwd2, setPwd2] = useState<string>("");
  const [code, setCode] = useState<number>();
  const [user, setUser] = useRecoilState(userAtom);
  // -1 : 시도 X, 0: 인증코드 전송, 1: 인증 성공, 2: 인증 실패
  const [verification, setVerification] = useState<-1 | 0 | 1 | 2>(-1);

  const postSignin = new Observable((subscriber) => {
    (async () => {
      const res = await AUTH_SIGNIN({ email: id, pwd: pwd });
      if (res.status === 200) {
        const id = storeToken(
          res.data.tokens.accessToken,
          res.data.tokens.refreshToken
        );
        setUser({ ...user, isLogined: true, id: id });
        if (res.data.isMember === false) {
          window.location.href = "/memberDetailRegist";
          return;
        }
      }
      subscriber.complete();
    })();
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emailSend = async () => {
    const res = await EMAIL_SEND(id);
    if (res.status === 200) setVerification(0);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emailConfirm = async () => {
    if (!code) return;
    const res = await EMAIL_CONFIRM(id, code);
    if (res.status !== 200) {
      setVerification(2);
      return;
    }
    setVerification(1);
  };

  return {
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
  };
};

export default useSignin;
