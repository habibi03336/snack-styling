import { IonChip, IonLabel } from "@ionic/react";
interface ITagChip {
  onTagClick?: () => void;
  tagName: string;
  isSelected: boolean;
}

const TagChip = ({ onTagClick, tagName, isSelected }: ITagChip) => {
  return (
    <IonChip
      onClick={onTagClick}
      key={tagName}
      color={isSelected ? "primary" : "light"}
      style={{
        border: "0.5px solid #b3b3b3",
        backgroundColor: isSelected ? "black" : "",
        color: isSelected ? "white" : "#b3b3b3",
      }}
    >
      <IonLabel>{tagName}</IonLabel>
    </IonChip>
  );
};

export default TagChip;
