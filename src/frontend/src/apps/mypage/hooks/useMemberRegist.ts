import { useLayoutEffect, useState } from "react";
import { Observable } from "rxjs";
import {
  PATCH_MEMBER_DETAIL,
  IMemberInfo,
  GET_MEMBER_DETAIL,
} from "../../../lib/api/user";

const defaultFeatures: IMemberInfo = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  nickname: null,
};

const userMemeberRegist = () => {
  const [features, setFeatures] = useState(defaultFeatures);
  const [errorMessage, setErrorMessage] = useState("");

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

  const updateMemberDetail = new Observable((subscriber) => {
    (async () => {
      const res = await PATCH_MEMBER_DETAIL({
        ...features,
      });

      if (res.status !== 200) {
        setErrorMessage(res.data.message);
        return;
      }

      subscriber.complete();
    })();
  });

  return {
    errorMessage,
    features,
    setFeatures,
    updateMemberDetail,
  };
};

export default userMemeberRegist;
