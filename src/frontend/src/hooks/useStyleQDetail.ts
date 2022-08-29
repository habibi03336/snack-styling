import { GET_STYLEQ } from "../lib/api/styleQ";
import { makeCodiTemplate } from "../lib/process/codi";
import { defaultTemplate } from "../assets/codiTemplates";
import { useEffect, useState } from "react";
import * as I from "../interfaces";
import address from "../lib/api/address";
import useOnMount from "./useOnMount";

const useStyleQDetail = (styleQId: number) => {
  const [styleQDetailData, setStyleQDetailData] = useState<I.StyleQDetail>();

  useOnMount(() => {
    (async () => {
      const res = await GET_STYLEQ(styleQId);

      const styleQ = res.data.que;
      const styleAns = res.data.ans.map((ans: I.StyleAns) => {
        return {
          ...ans,
          codiTemplate: makeCodiTemplate(
            [
              {
                top: ans.top ? address.mediaAPI + ans.top : null,
                bottom: ans.bottom ? address.mediaAPI + ans.bottom : null,
                cap: ans.cap ? address.mediaAPI + ans.cap : null,
                footwear: ans.footwear ? address.mediaAPI + ans.footwear : null,
                id: ans.id,
              },
            ],
            defaultTemplate
          )[0],
        };
      });

      setStyleQDetailData({ que: styleQ, ans: styleAns });
    })();
  });

  return { styleQDetailData };
};

export default useStyleQDetail;
