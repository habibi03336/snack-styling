import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { AUTH_LOGIN } from "../../../lib/api/user";
import user from "../../common/state/user";

const useLogin = () => {
  const [userState, setUserState] = useRecoilState(user);
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const postLogin = new Observable((subscriber) => {
    (async () => {
      const res = await AUTH_LOGIN({ email: id, pwd: pwd });
      if (res.status < 300) {
        console.log(res);
        window.localStorage.setItem("mid", res.data.mid);
        window.localStorage.setItem("accessToken", res.data.tokens.accessToken);
        window.localStorage.setItem(
          "refreshToken",
          res.data.tokens.refreshToken
        );
        setUserState({ ...userState, isLogined: true, id: res.data.mid });
        subscriber.complete();
      }
    })();
  });

  return { id, setId, pwd, setPwd, postLogin };
};

export default useLogin;
