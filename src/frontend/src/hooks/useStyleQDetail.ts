import { getStyleQ } from "../lib/api/styleQ";
import { makeCodiTemplate } from "../lib/process/codi";
import { defaultTemplate } from "../assets/codiTemplates";
import { useEffect, useState } from "react";
import * as I from "../interfaces";
import address from "../lib/api/address";

const useStyleQDetail = (styleQId: number) => {
  const [styleQDetailData, setStyleQDetailData] = useState<I.StyleQDetail>();

  useEffect(() => {
    (async () => {
      const res = await getStyleQ(styleQId);

      const styleQ = res.data.que;
      console.log(styleQ, "asd");
      const styleAns = res.data.ans.map((ans: I.StyleAns) => {
        return {
          ...ans,
          codiTemplate: makeCodiTemplate(
            [
              {
                top: address.imgAPI + ans.top,
                bottom: address.imgAPI + ans.bottom,
                id: 1,
              },
            ],
            defaultTemplate
          )[0],
        };
      });

      setStyleQDetailData({ que: styleQ, ans: styleAns });
    })();
  }, []);

  return { styleQDetailData };
};

export default useStyleQDetail;
