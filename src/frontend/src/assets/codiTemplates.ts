import * as I from "../lib/types/interfaces";
import Bottom from "./codi/bottom.png";
import Cap from "./codi/cap.png";
import Footwear from "./codi/footwear.png";
import Top from "./codi/top.png";
import Outer from "./codi/outer.png";
import Bag from "./codi/bag.png";

const defaultTemplate: I.CodiTemplate = {
  clothes: [
    {
      positionX: 0.53,
      positionY: 0.29,
      image: Top,
      category: "상의",
      size: 0.9,
    },
    {
      positionX: 0.49,
      positionY: 0.65,
      image: Bottom,
      category: "하의",
      size: 1.1,
    },
    {
      positionX: 0.2,
      positionY: 0.2,
      image: Cap,
      category: "모자",
      size: 0.8,
    },
    {
      positionX: 0.2,
      positionY: 0.8,
      image: Footwear,
      category: "신발",
      size: 0.7,
    },
    {
      positionX: 0.75,
      positionY: 0.27,
      image: Outer,
      category: "아우터",
      size: 1.4,
    },
    {
      positionX: 0.2,
      positionY: 0.5,
      image: Bag,
      category: "가방",
      size: 0.8,
    },
  ],
};

export type templateType = "defaultTemplate";

export { defaultTemplate };
