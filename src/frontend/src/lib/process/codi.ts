import * as I from "../types/interfaces";

const categoryMap = new Map([
  ["top", "상의"],
  ["bottom", "하의"],
  ["cap", "모자"],
  ["footwear", "신발"],
]);

export const makeCodiTemplate = (codis: I.Codi[], template: I.CodiTemplate) => {
  const codiArray: I.CodiTemplate[] = [];
  codis.forEach((codi: I.Codi) => {
    const theCodi: I.CodiTemplate = { id: 0, clothes: [] };
    Object.entries(codi).forEach((elem) => {
      if (elem[0] === "id") {
        theCodi.id = elem[1];
        return;
      }

      const cate = categoryMap.get(elem[0]) as I.category;
      const categoryIdx = template.clothes.findIndex(
        (codiCloth) => codiCloth.category === cate
      );
      if (categoryIdx === -1) return;

      const clothData: I.CodiCloth = {
        ...template.clothes[categoryIdx],
        category: cate,
        image: elem[1],
      };
      theCodi.clothes.push(clothData);
    });
    codiArray.push(theCodi);
  });

  return codiArray;
};
