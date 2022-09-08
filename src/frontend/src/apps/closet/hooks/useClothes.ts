import { useEffect } from "react";
import { GET_CLOTHS } from "../../../lib/api/cloth";
import * as I from "../../../lib/types/interfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import user from "../../common/state/user";
import {
  closetClothInfiniteScrollParamAtom,
  clothesAtom,
} from "../state/clothes";

const useCloths = (userId?: number) => {
  const [clothes, setClothes] = useRecoilState(clothesAtom);
  const userState = useRecoilValue(user);
  const [infiniteParam, setInfiniteParam] = useRecoilState(
    closetClothInfiniteScrollParamAtom
  );

  const loadMore = () => {
    if (infiniteParam.loadDone) return;
    setInfiniteParam({
      ...infiniteParam,
      page: infiniteParam.page + 1,
    });
  };
  useEffect(() => {
    if (infiniteParam.prev === infiniteParam.page) return;
    (async () => {
      const res = await GET_CLOTHS(
        userId ? userId : userState.id!,
        infiniteParam.page
      );
      const data = res.data;
      const clothArray: I.Cloth[] = [];

      setInfiniteParam({
        ...infiniteParam,
        prev: infiniteParam.page,
        loadDone: data.pageCnt === data.curPage,
      });

      data.clothList.forEach((clothData: any) => {
        const cloth: I.Cloth = {
          ...clothData,
          tags: new Set(clothData.tags),
        };
        clothArray.push(cloth);
      });

      setClothes(clothes.concat(clothArray));
    })();
  });

  return {
    clothes,
    loadMore,
    loadDone: infiniteParam.loadDone,
  };
};

export default useCloths;
