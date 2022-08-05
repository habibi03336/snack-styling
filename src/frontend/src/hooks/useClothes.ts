import { useEffect, useState } from "react";
import { getCloths } from "../lib/api/cloth";
import * as I from "../interfaces";

const useClothes = () => {
  const [clothes, setClothes] = useState<I.Cloth[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getCloths();
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

export default useClothes;
