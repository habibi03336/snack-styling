import { IonCard } from "@ionic/react";
import CodiBoard from "../common/CodiBoard";
import * as I from "../../interfaces";

interface ICodiCard {
  codi: I.CodiTemplate;
  onCodiClick: () => void;
}

const CodiCard = ({ codi, onCodiClick }: ICodiCard) => {
  return (
    <IonCard
      style={{
        width: window.innerWidth * 0.4,
        height: window.innerWidth * 0.4,
      }}
    >
      <CodiBoard
        boardConfig={{
          width: window.innerWidth * 0.4,
          height: window.innerWidth * 0.4,
          clothWidth: window.innerWidth * 0.2,
          clothHeight: window.innerWidth * 0.2,
        }}
        codiClothes={codi.clothes}
        onBoardImgClick={onCodiClick}
      />
    </IonCard>
  );
};

export default CodiCard;
