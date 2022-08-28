import { GET_CODIS } from "../lib/api/codi";
import { useEffect, useState } from "react";
import * as I from "../interfaces";
import { defaultTemplate } from "../assets/codiTemplates";
import { makeCodiTemplate } from "../lib/process/codi";
import address from "../lib/api/address";
import { useRecoilState } from "recoil";
import user from "../recoil/user";

const useCodis = () => {
  const [userState] = useRecoilState(user);
  const [codis, setCodis] = useState<I.CodiTemplate[]>([]);
  useEffect(() => {
    (async () => {
      const res = await GET_CODIS(userState.id!);
      const data = res.data;

      const codiList = data.codiList.map((codi: I.Codi) => {
        const codi_full_url: I.Codi = {
          id: 0,
          top: null,
          bottom: null,
          footwear: null,
          cap: null,
        };

        for (const key in codi) {
          if (key === "id") {
            codi_full_url[key] = codi[key];
          } else if (
            key === "top" ||
            key === "bottom" ||
            key === "footwear" ||
            key === "cap"
          ) {
            if (codi[key] !== null) {
              codi_full_url[key] = address.mediaAPI + codi[key];
            }
          }
        }

        return codi_full_url;
      });

      const codiArray: I.CodiTemplate[] = makeCodiTemplate(
        codiList,
        defaultTemplate
      );

      setCodis(codiArray);
    })();
  }, []);

  return {
    codis,
  };
};

export default useCodis;
