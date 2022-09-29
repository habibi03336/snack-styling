import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { AUTH_LOGIN } from "../../../lib/api/auth";
import { userAtom } from "../../common/state/user";

const useLogin = () => {
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [user, setUser] = useRecoilState(userAtom);

  const postLogin = new Observable((subscriber) => {
    (async () => {
      const res = await AUTH_LOGIN({ email: id, pwd: pwd });
      if (res.status < 300) {
        window.localStorage.setItem("accessToken", res.data.tokens.accessToken);
        window.localStorage.setItem(
          "refreshToken",
          res.data.tokens.refreshToken
        );
        const token = res.data.tokens.accessToken.split(".");
        const { Key } = JSON.parse(atob(token[1]));
        window.localStorage.setItem("id", Key);
        setUser({ ...user, isLogined: true, id: Key });
        subscriber.complete();
      }
    })();
  });

  return { id, setId, pwd, setPwd, postLogin };
};

export default useLogin;
