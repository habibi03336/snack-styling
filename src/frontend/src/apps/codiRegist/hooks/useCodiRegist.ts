import { useState } from "react";
import { Observable } from "rxjs";
import {
  POST_CODI,
  ICodiData,
  PATCH_CODI,
  GET_CODI,
} from "../../../lib/api/codi";
import { POST_STYLE_ANSWER } from "../../../lib/api/styleQ";
import * as I from "../../../lib/types/interfaces";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { deepcopy } from "../../../lib/utils/common";
import useOnMount from "../../common/hooks/useOnMount";
import produce from "immer";
import { makeCodiTemplate } from "../../../lib/process/codi";
import innerViewWidth from "../../../lib/constants/innerViewWidth";

const useCodiRegist = (
  type: "own" | "answer" | "update",
  cid?: number,
  questionId?: number
) => {
  // if type is answer questionId must exist
  // assert(type === "answer" && questionId === undefined ? false : true);
  const [comment, setComment] = useState("");
  const [codiTemplate, setCodiTemplate] = useState<I.CodiTemplate>(
    deepcopy(defaultTemplate)
  );

  useOnMount(async () => {
    if (type.slice(0, 6) === "update" && cid) {
      const { data } = await GET_CODI(cid);
      const defaultCodi = makeCodiTemplate([data], defaultTemplate)[0];

      const codiTemp = defaultCodi.clothes.map((elem, idx) => {
        if (elem.image === null) return codiTemplate.clothes[idx];
        else return elem;
      });

      setCodiTemplate({ ...defaultCodi, clothes: codiTemp });
      setComment(data.comments);
    }
  });

  const boardConfig: I.BoardConfig = {
    width: innerViewWidth - 40,
    height: innerViewWidth - 40,
    clothWidth: innerViewWidth * 0.3,
    clothHeight: innerViewWidth * 0.3,
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

  const deleteCodiCloth = (category: string) => {
    const categoryIndex = codiTemplate.clothes.findIndex(
      (codiCloth) => codiCloth.category === category
    );
    const newTemplate = produce(codiTemplate, (draft) => {
      draft.clothes[categoryIndex] = deepcopy(
        defaultTemplate.clothes[categoryIndex]
      );
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
      let res;
      const codiData: ICodiData = {};
      codiTemplate.clothes.forEach((cloth) => {
        const categoryName = categoryMap.get(cloth.category);
        if (cloth.id === undefined) return;
        if (categoryName === undefined) return;

        codiData[categoryName] = cloth.id;
      });
      codiData["comments"] = comment;

      if (type === "update" && cid) {
        res = await PATCH_CODI(cid, codiData);
      }

      if (type === "own") res = await POST_CODI(codiData);

      if (questionId) {
        const answerData = {
          codi: {
            ...codiData,
          },
          qid: questionId,
          comments: comment,
        };

        if (type === "answer") {
          res = await POST_STYLE_ANSWER(answerData);
        }
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
    deleteCodiCloth,
  };
};

export default useCodiRegist;
