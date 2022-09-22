import { useState } from "react";
import { Observable } from "rxjs";
import { POST_CODI, ICodiData, PATCH_CODI } from "../../../lib/api/codi";
import { POST_STYLE_ANSWER } from "../../../lib/api/styleQ";
import * as I from "../../../lib/types/interfaces";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { deepcopy } from "../../../lib/utils/common";
import useOnMount from "../../common/hooks/useOnMount";
import produce from "immer";
// import { assert } from "console";

const useCodiRegist = (
  type: "own" | "answer" | "update",
  defaultCodi?: I.CodiTemplate,
  questionId?: number
) => {
  // if type is answer questionId must exist
  // assert(type === "answer" && questionId === undefined ? false : true);
  const [comment, setComment] = useState("");
  const [codiTemplate, setCodiTemplate] = useState<I.CodiTemplate>(
    deepcopy(defaultTemplate)
  );

  useOnMount(() => {
    if (type === "update" && defaultCodi) {
      const codiTemp = defaultCodi.clothes.map((elem, idx) => {
        if (elem.image === null) return codiTemplate.clothes[idx];
        else return elem;
      });
      setCodiTemplate({ ...defaultCodi, clothes: codiTemp });
    }
  });

  const boardConfig: I.BoardConfig = {
    width: window.innerWidth - 40,
    height: window.innerWidth - 40,
    clothWidth: window.innerWidth * 0.3,
    clothHeight: window.innerWidth * 0.3,
  };

  const putCodiCloth = (cloth: I.Cloth) => {
    const categoryIndex = codiTemplate.clothes.findIndex(
      (codiCloth) => codiCloth.category === cloth.category
    );
    const newTemplate = produce(codiTemplate, (draft) => {
      draft.clothes[categoryIndex] = {
        ...draft.clothes[categoryIndex],
        image: cloth.image,
        id: cloth.id,
      };
    });

    setCodiTemplate(newTemplate);
  };

  const categoryMap = new Map<
    "하의" | "상의" | "신발" | "모자",
    "top" | "bottom" | "footwear" | "cap"
  >([
    ["상의", "top"],
    ["하의", "bottom"],
    ["신발", "footwear"],
    ["모자", "cap"],
  ]);

  const uploadCodi = new Observable((subscriber) => {
    (async () => {
      const codiData: ICodiData = {};
      codiTemplate.clothes.forEach((elem) => console.log(elem));
      codiTemplate.clothes.forEach((cloth) => {
        const categoryName = categoryMap.get(cloth.category);
        if (cloth.id === undefined) return;
        if (categoryName === undefined) return;

        codiData[categoryName] = cloth.id;
      });

      let res;
      if (type === "update" && defaultCodi?.id) {
        res = await PATCH_CODI(defaultCodi.id, codiData);
      } else if (type === "own") res = await POST_CODI(codiData);
      else if (type === "answer" && questionId !== undefined) {
        const answerData = {
          codi: {
            top: null,
            bottom: null,
            footwear: null,
            cap: null,
            ...codiData,
          },
          qid: questionId,
          comments: comment,
        };
        res = await POST_STYLE_ANSWER(answerData);
      }
      //postStyleAns({ ...codiData, qid: 3 });
      else throw "not available state: type 'answer' should have questionId";

      subscriber.complete();
    })();
  });

  return {
    codiTemplate,
    putCodiCloth,
    boardConfig,
    uploadCodi,
    comment,
    setComment,
  };
};

export default useCodiRegist;
