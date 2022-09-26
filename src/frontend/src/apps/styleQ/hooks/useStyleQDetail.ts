import { DELETE_ANSWER, GET_STYLEQ } from "../../../lib/api/styleQ";
import { makeCodiTemplate } from "../../../lib/process/codi";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { useState } from "react";
import * as I from "../../../lib/types/interfaces";
import useOnMount from "../../common/hooks/useOnMount";

const useStyleQDetail = (styleQId: number) => {
  const [styleQDetailData, setStyleQDetailData] = useState<I.StyleQDetail>();

  useOnMount(() => {
    (async () => {
      const res = await GET_STYLEQ(styleQId);
      const styleQ = res.data.question;
      const styleAns = res.data.answers.answerResponses.map(
        (ans: I.StyleAns) => {
          return {
            ...ans,
            codiTemplate: makeCodiTemplate(
              [
                {
                  top: ans.codi.top ? ans.codi.top : null,
                  bottom: ans.codi.bottom ? ans.codi.bottom : null,
                  cap: ans.codi.cap ? ans.codi.cap : null,
                  footwear: ans.codi.footwear ? ans.codi.footwear : null,
                  id: ans.mid,
                },
              ],
              defaultTemplate
            )[0],
          };
        }
      );

      setStyleQDetailData({ que: styleQ, ans: styleAns });
    })();
  });

  const removeAnswer = async (answerId: number) => {
    const res = await DELETE_ANSWER(answerId);
    if (res.status !== 200) return;
    setStyleQDetailData({
      que: styleQDetailData!.que,
      ans: styleQDetailData!.ans.filter((elem) => elem.aid !== answerId),
    });
  };

  return { styleQDetailData, removeAnswer };
};

export default useStyleQDetail;
