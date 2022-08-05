import { IonFab, IonFabButton } from "@ionic/react";

interface IFloatingButton {
  onButtonClick: () => void;
}

const FloatingButton = ({ onButtonClick }: IFloatingButton) => {
  return (
    <IonFab
      vertical="bottom"
      horizontal="end"
      style={{ position: "fixed" }}
      slot="fixed"
    >
      <IonFabButton onClick={onButtonClick}></IonFabButton>
    </IonFab>
  );
};

export default FloatingButton;
