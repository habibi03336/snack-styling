import { useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Observable } from "rxjs";
import {
  PATCH_MEMBER_DETAIL,
  IMemberInfo,
  GET_MEMBER_DETAIL,
} from "../../../lib/api/user";
import useOnMount from "../../common/hooks/useOnMount";

const defaultFeatures: IMemberInfo = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  nickname: null,
};

const userMemeberRegist = () => {
  const [features, setFeatures] = useState(defaultFeatures);

  useLayoutEffect(() => {
    (async () => {
      const res = await GET_MEMBER_DETAIL();
      const dat = res.data;

      setFeatures({
        age: dat.age ? Number(dat.age) : null,
        gender: dat.gender ? Number(dat.gender) : null,
        height: dat.height ? Number(dat.height) : null,
        nickname: dat.nickname ? String(dat.nickname) : null,
        weight: dat.weight ? Number(dat.weight) : null,
      });
    })();
  }, []);

  const postSignin = new Observable((subscriber) => {
    (async () => {
      const res = await PATCH_MEMBER_DETAIL({
        ...features,
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
