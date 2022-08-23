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
      color={isSelected ? "" : "primary"}
      style={{
        backgroundColor: isSelected ? "black" : "",
        color: isSelected ? "white" : "black",
      }}
    >
      <IonLabel>{tagName}</IonLabel>
    </IonChip>
  );
};

export default TagChip;
