import { useState } from "react";
import { Observable } from "rxjs";
import { postCodi, ICodiData } from "../lib/api/codi";
import { postStyleAns } from "../lib/api/styleQ";
import * as I from "../interfaces";
import { defaultTemplate } from "../assets/codiTemplates";
import { deepcopy } from "../lib/utils/common";
import { useRecoilState } from "recoil";
import user from "../recoil/user";
// import { assert } from "console";

const useCodiShowCase = (type: "own" | "answer", questionId?: number) => {
  const [userState] = useRecoilState(user);
  // if type is answer questionId must exist
  // assert(type === "answer" && questionId === undefined ? false : true);
  const [comment, setComment] = useState("");
  const [codiTemplate, setCodiTemplate] = useState<I.CodiTemplate>(
    deepcopy(defaultTemplate)
  );

  const boardConfig: I.BoardConfig = {
    width: window.innerWidth,
    height: window.innerWidth,
    clothWidth: window.innerWidth * 0.3,
    clothHeight: window.innerWidth * 0.3,
  };

  const putCodiCloth = (cloth: I.Cloth) => {
    const categoryIndex = codiTemplate.clothes.findIndex(
      (codiCloth) => codiCloth.category === cloth.category
    );

    codiTemplate.clothes[categoryIndex] = {
      ...codiTemplate.clothes[categoryIndex],
      image: cloth.image,
      id: cloth.id,
    };

    setCodiTemplate({ ...codiTemplate });
  };

  const categoryMap = new Map<"하의" | "상의", "top" | "bottom">([
    ["상의", "top"],
    ["하의", "bottom"],
  ]);

  const uploadCodi = new Observable((subscriber) => {
    (async () => {
      const codiData: ICodiData = {
        top: 0,
        bottom: 0,
      };

      codiTemplate.clothes.forEach((cloth) => {
        const categoryName = categoryMap.get(cloth.category);

        if (cloth.id === undefined) return;
        if (categoryName === undefined) return;

        codiData[categoryName] = cloth.id;
      });

      let res;
      if (type === "own") res = await postCodi(userState.id!, codiData);
      else if (type === "answer" && questionId !== undefined) {
        const answerData = {
          ...codiData,
          mid: userState.id!,
          qid: questionId,
          comments: "hello world",
        };
        res = await postStyleAns(answerData);
      }
      //postStyleAns({ ...codiData, qid: 3 });
      else throw "not available state: type 'answer' should have questionId";

      const data = res.data;
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

export default useCodiShowCase;
