import { DELETE_CODI, GET_CODIS } from "../../../lib/api/codi";
import { useEffect } from "react";
import * as I from "../../../lib/types/interfaces";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { makeCodiTemplate } from "../../../lib/process/codi";
import { useRecoilState } from "recoil";
import { codisAtom } from "../state/codi";

const useCodis = () => {
  const [codis, setCodis] = useRecoilState<I.CodiTemplate[]>(codisAtom);
  useEffect(() => {
    (async () => {
      const res = await GET_CODIS();
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
              codi_full_url[key] = codi[key];
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

  const deleteCodi = async (codiId: number) => {
    const res = await DELETE_CODI(codiId);
    if (res.status >= 300) return;
    setCodis(codis.filter((elem) => elem.id !== codiId));
  };

  return {
    deleteCodi,
    codis,
  };
};

export default useCodis;
