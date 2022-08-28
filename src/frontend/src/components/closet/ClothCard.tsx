import * as I from "../../interfaces";
import styled from "styled-components";
import ClosetCard from "./ClosetCard";

interface IClothCard {
  onCardClick?: () => void;
  cloth: I.Cloth;
  type: "big" | "small";
}

const ClothCard = ({ cloth, onCardClick, type }: IClothCard) => {
  if (type === "small")
    return (
      <ClosetCard onCardClick={onCardClick} id={cloth.id}>
        <SmallImg src={cloth.image} />
      </ClosetCard>
    );
  else {
    return (
      <ClosetCard onCardClick={onCardClick} id={cloth.id}>
        <BigImg src={cloth.image} />
      </ClosetCard>
    );
  }
};

export default ClothCard;

const SmallImg = styled.img`
  object-fit: contain;
  width: ${(window.innerWidth - 40) / 2 - 7.5}px;
  height: ${(window.innerWidth - 40) / 2 - 7.5}px;
  padding: 25px;
  vertical-align: bottom;
`;

const BigImg = styled.img`
  width: 100%;
  height: auto;
  vertical-align: bottom;
`;
