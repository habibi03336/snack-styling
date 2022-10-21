import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";

const TPOButton = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const innerWidth = window.innerWidth > 400 ? 400 : window.innerWidth;
  return (
    <IonItem
      onClick={onClick}
      style={{
        width: `${(innerWidth - 40) / 2 - 5}px`,
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
