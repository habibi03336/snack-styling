import { useState } from "react";
import { Observable } from "rxjs";
import { postCodi, ICodiData } from "../lib/api/codi";
import * as I from "../interfaces";
import { defaultTemplate } from "../asset/codiTemplates";
import { deepcopy } from "../lib/utils/common";

const useCodiShowCase = () => {
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
      const codiData: ICodiData = {};

      codiTemplate.clothes.forEach((cloth) => {
        const categoryName = categoryMap.get(cloth.category);

        if (cloth.id === undefined) return;
        if (categoryName === undefined) return;

        codiData[categoryName] = cloth.id;
      });

      const res = await postCodi(codiData);

      const data = res.data;
      subscriber.complete();
    })();
  });

  return { codiTemplate, putCodiCloth, boardConfig, uploadCodi };
};

export default useCodiShowCase;
