import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { login } from "../lib/api/user";
import user from "../recoil/user";

const useLogin = () => {
  const [userState, setUserState] = useRecoilState(user);
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const postLogin = new Observable((subscriber) => {
    (async () => {
      const res = await login({ email: id, pwd: pwd });
      if (res.status < 300) {
        window.localStorage.setItem("mid", res.data.id);
        setUserState({ ...userState, isLogined: true, id: res.data.id });
        subscriber.complete();
      }
    })();
  });

  return { id, setId, pwd, setPwd, postLogin };
};

export default useLogin;
