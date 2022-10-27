import * as I from "../../../lib/types/interfaces";
import { GET_CODIS } from "../../../lib/api/codi";
import { makeCodiTemplate } from "../../../lib/process/codi";
import { defaultTemplate } from "../../../assets/codiTemplates";

async function infiniteCodis(page: number) {
  const res = await GET_CODIS(page);
  const data = res.data.codiList as I.Codi[];

  const codiList = data.map((codi: I.Codi) => {
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

  const isDone = res.data.curPage === res.data.pageCnt;
  return [codiArray, isDone] as [[], boolean];
}

export default infiniteCodis;
