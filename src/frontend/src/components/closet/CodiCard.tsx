import { IonCard } from "@ionic/react";
import CodiBoard from "../common/CodiBoard";
import * as I from "../../interfaces";

interface ICodiCard {
  codi: I.CodiTemplate;
  onCodiClick: () => void;
  type?: "big" | "default";
}

const CodiCard = ({ codi, onCodiClick, type = "default" }: ICodiCard) => {
  const width =
    type === "default" ? window.innerWidth * 0.4 : window.innerWidth * 0.9;
  const height =
    type === "default" ? window.innerWidth * 0.4 : window.innerWidth * 0.9;
  return (
    <IonCard
      style={{
        margin: "10px auto",
        width: width,
        height: height,
      }}
    >
      <CodiBoard
        boardConfig={{
          width: width,
          height: height,
          clothWidth: width * 0.5,
          clothHeight: height * 0.5,
        }}
        codiClothes={codi.clothes}
        onBoardImgClick={onCodiClick}
      />
      {codi.comments}
    </IonCard>
  );
};

export default CodiCard;
