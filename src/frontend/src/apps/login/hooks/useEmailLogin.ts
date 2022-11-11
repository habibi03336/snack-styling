import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { AUTH_LOGIN, AUTH_SOCIAL_LOGIN } from "../../../lib/api/auth";
import { userAtom } from "../../common/state/user";
import storeToken from "../lib/storeToken";

const useEmailLogin = () => {
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [user, setUser] = useRecoilState(userAtom);

  const postLogin = new Observable((subscriber) => {
    (async () => {
      const res = await AUTH_LOGIN({ email: id, pwd: pwd });
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
        subscriber.complete();
      }
      if (res.status === 409) {
        subscriber.error();
      }
    })();
  });

  return { id, setId, pwd, setPwd, postLogin };
};

export default useEmailLogin;
