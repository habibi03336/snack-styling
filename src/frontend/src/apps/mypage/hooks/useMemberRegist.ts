import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { PATCH_MEMBER_DETAIL, IMemberInfo } from "../../../lib/api/user";
import user from "../../common/state/user";

const defaultFeatures: IMemberInfo = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  id: 0,
  nickname: null,
};

const userMemeberRegist = () => {
  const [features, setFeatures] = useState(defaultFeatures);
  const [userState] = useRecoilState(user);

  const postSignin = new Observable((subscriber) => {
    (async () => {
      const res = await PATCH_MEMBER_DETAIL({
        ...features,
        id: userState.uid!,
      });

      subscriber.complete();
    })();
  });

  return {
    features,
    setFeatures,
    postSignin,
  };
};

export default userMemeberRegist;
