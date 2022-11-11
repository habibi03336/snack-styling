import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import innerViewWidth from "../../../lib/constants/innerViewWidth";

const TPOButton = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <IonItem
      onClick={onClick}
      style={{
        width: `${(innerViewWidth - 40) / 2 - 10}px`,
        border: "1px solid #eeeeee",
        margin: "5px 0",
      }}
    >
      <IonCheckbox
        style={{ height: "20px", width: "20px" }}
        color="primary"
        checked={selected}
      />
      <IonLabel
        style={{
          position: "relative",
          top: "1.5px",
          fontSize: "14px",
          fontFamily: "Pretendard",
          padding: "0 0 0 10px",
          fontWeight: selected ? "bold" : "500",
        }}
      >
        {text}
      </IonLabel>
    </IonItem>
  );
};

export default TPOButton;
