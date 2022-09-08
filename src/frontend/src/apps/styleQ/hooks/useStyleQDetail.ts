import { GET_STYLEQ } from "../../../lib/api/styleQ";
import { makeCodiTemplate } from "../../../lib/process/codi";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { useEffect, useState } from "react";
import * as I from "../../../lib/types/interfaces";
import address from "../../../lib/api/address";
import useOnMount from "../../common/hooks/useOnMount";

const useStyleQDetail = (styleQId: number) => {
  const [styleQDetailData, setStyleQDetailData] = useState<I.StyleQDetail>();

  useOnMount(() => {
    (async () => {
      const res = await GET_STYLEQ(styleQId);
      const styleQ = res.data.question;
      const styleAns = res.data.answers.map((ans: I.StyleAns) => {
        return {
          ...ans,
          codiTemplate: makeCodiTemplate(
            [
              {
                top: ans.clothDto.top
                  ? address.mediaAPI + ans.clothDto.top
                  : null,
                bottom: ans.clothDto.bottom
                  ? address.mediaAPI + ans.clothDto.bottom
                  : null,
                cap: ans.clothDto.cap
                  ? address.mediaAPI + ans.clothDto.cap
                  : null,
                footwear: ans.clothDto.footwear
                  ? address.mediaAPI + ans.clothDto.footwear
                  : null,
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
