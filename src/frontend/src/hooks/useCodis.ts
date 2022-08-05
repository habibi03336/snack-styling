import { getCodis } from "../lib/api/codi";
import { useEffect, useState } from "react";
import * as I from "../interfaces";
import { defaultTemplate } from "../asset/codiTemplates";
import { makeCodiTemplate } from "../lib/process/codi";

const useCodis = () => {
  const [codis, setCodis] = useState<I.CodiTemplate[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getCodis();
      const data = res.data;

      const codiArray: I.CodiTemplate[] = makeCodiTemplate(
        data.codiList,
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
