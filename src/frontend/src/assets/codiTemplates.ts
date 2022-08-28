import * as I from "../interfaces";
import Bottom from "./codi/bottom.png";
import Cap from "./codi/cap.png";
import Footwear from "./codi/footwear.png";
import Top from "./codi/top.png";

const defaultTemplate: I.CodiTemplate = {
  clothes: [
    {
      positionX: 0.75,
      positionY: 0.25,
      image: Top,
      category: "상의",
    },
    {
      positionX: 0.77,
      positionY: 0.75,
      image: Bottom,
      category: "하의",
    },
    {
      positionX: 0.25,
      positionY: 0.3,
      image: Cap,
      category: "모자",
    },
    {
      positionX: 0.25,
      positionY: 0.8,
      image: Footwear,
      category: "신발",
    },
  ],
};

export type templateType = "defaultTemplate";

export { defaultTemplate };
