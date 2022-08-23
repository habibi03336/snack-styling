import { IonCard } from "@ionic/react";
import * as I from "../../interfaces";
import styled from "styled-components";

interface IClothCard {
  onCardClick?: () => void;
  cloth: I.Cloth;
}

const ClothCard = ({ cloth, onCardClick }: IClothCard) => {
  return (
    <IonCard onClick={onCardClick} key={cloth.id} style={{ margin: "8px" }}>
      <Img src={cloth.image} />
    </IonCard>
  );
};

export default ClothCard;

const Img = styled.img`
  width: 100%;
  height: auto;
  vertical-align: bottom;
`;
