import * as I from "../interfaces";

const defaultTemplate: I.CodiTemplate = {
  clothes: [
    {
      positionX: 0.5,
      positionY: 0.3,
      image:
        "https://thumbs.dreamstime.com/z/pullover-black-line-icon-piece-woollen-clothing-covers-upper-part-body-arms-pictogram-web-page-mobile-179410803.jpg",
      category: "상의",
    },
    {
      positionX: 0.5,
      positionY: 0.7,
      image:
        "https://i.pinimg.com/474x/73/8b/ea/738beaee3af2646a707ffb397562cbe7--men-pants-fashion-flats.jpg",
      category: "하의",
    },
  ],
};

export type templateType = "defaultTemplate";

export { defaultTemplate };
