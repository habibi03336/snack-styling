import { DELETE_ANSWER, GET_STYLEQ } from "../../../lib/api/styleQ";
import { makeCodiTemplate } from "../../../lib/process/codi";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { useEffect, useState } from "react";
import * as I from "../../../lib/types/interfaces";

const useStyleQDetail = (styleQId: number) => {
  const [styleQDetailData, setStyleQDetailData] = useState<I.StyleQDetail>();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await GET_STYLEQ(styleQId);
      if (res.status === 200) {
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
                    outer: ans.codi.outer ? ans.codi.outer : null,
                    bag: ans.codi.bag ? ans.codi.bag : null,
                    id: ans.mid,
                  },
                ],
                defaultTemplate
              )[0],
            };
          }
        );

        setStyleQDetailData({ que: styleQ, ans: styleAns });
      }
      if (res.status === 404) {
        setError(true);
      }
    })();
  }, [styleQId]);

  const removeAnswer = async (answerId: number) => {
    const res = await DELETE_ANSWER(answerId);
    if (res.status !== 200) return;
    setStyleQDetailData({
      que: styleQDetailData!.que,
      ans: styleQDetailData!.ans.filter((elem) => elem.aid !== answerId),
    });
  };

  return { styleQDetailData, removeAnswer, error };
};

export default useStyleQDetail;
