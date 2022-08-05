import { IonCard, IonCardHeader } from "@ionic/react";
import TagChip from "../common/TagChip";
import * as I from "../../interfaces";

interface IClothCard {
  onCardClick?: () => void;
  cloth: I.Cloth;
}

const ClothCard = ({ cloth, onCardClick }: IClothCard) => {
  return (
    <IonCard onClick={onCardClick} key={cloth.id} style={{ width: "40%" }}>
      <IonCardHeader>
        <img src={cloth.image} />
        <p>{cloth.category}</p>
        {[...cloth.tags].map((tagName) => (
          <TagChip key={tagName} tagName={tagName} isSelected={true} />
        ))}
      </IonCardHeader>
    </IonCard>
  );
};

export default ClothCard;
