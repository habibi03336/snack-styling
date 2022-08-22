import { useEffect, useState } from "react";
import { getCloths } from "../lib/api/cloth";
import * as I from "../interfaces";
import { useRecoilState } from "recoil";
import user from "../recoil/user";

const useCloths = (userId?: number) => {
  const [clothes, setClothes] = useState<I.Cloth[]>([]);
  const [userState] = useRecoilState(user);
  useEffect(() => {
    (async () => {
      const res = await getCloths(userId ? userId : userState.id!);
      const data = res.data;
      const clothArray: I.Cloth[] = [];
      data.clothList.forEach((clothData: any) => {
        const cloth: I.Cloth = {
          ...clothData,
          tags: new Set(clothData.tags),
        };
        clothArray.push(cloth);
      });
      setClothes(clothArray);
    })();
  }, []);

  return {
    clothes,
    setClothes,
  };
};

export default useCloths;
