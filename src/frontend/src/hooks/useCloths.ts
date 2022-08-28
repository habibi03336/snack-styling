import { useEffect, useState } from "react";
import { GET_CLOTHS } from "../lib/api/cloth";
import * as I from "../interfaces";
import { useRecoilState } from "recoil";
import user from "../recoil/user";

const useCloths = (userId?: number) => {
  const [clothes, setClothes] = useState<I.Cloth[]>([]);
  const [userState] = useRecoilState(user);
  const [page, setPage] = useState<number>(1);
  const [loadDone, setLoadDone] = useState<boolean>(false);

  const loadMore = () => {
    if (loadDone) return;
    setPage(page + 1);
  };
  useEffect(() => {
    (async () => {
      const res = await GET_CLOTHS(userId ? userId : userState.id!, page);
      const data = res.data;
      const clothArray: I.Cloth[] = [];

      if (data.pageCnt === data.curPage) setLoadDone(true);
      data.clothList.forEach((clothData: any) => {
        const cloth: I.Cloth = {
          ...clothData,
          tags: new Set(clothData.tags),
        };
        clothArray.push(cloth);
      });
      setClothes(clothes.concat(clothArray));
    })();
  }, [page]);

  return {
    clothes,
    setClothes,
    loadMore,
    loadDone,
  };
};

export default useCloths;
