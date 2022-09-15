import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { AUTH_SIGNIN } from "../../../lib/api/user";
import user from "../../common/state/user";

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
  const [userState, setUserState] = useRecoilState(user);

  const postSignin = new Observable((subscriber) => {
    (async () => {
      const res = await AUTH_SIGNIN({ email: id, pwd: pwd });
      setUserState({ ...userState, uid: res.data.uid });
      subscriber.complete();
    })();
  });

  return {
    id,
    setId,
    pwd,
    setPwd,
    pwd2,
    setPwd2,
    postSignin,
  };
};

export default useSignin;
