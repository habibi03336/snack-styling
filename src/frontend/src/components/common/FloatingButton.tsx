import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

interface IFloatingButton {
  type?: "plus";
  routeTo?: string;
}

const FloatingButton = ({ type, routeTo }: IFloatingButton) => {
  return (
    <IonFab
      vertical="bottom"
      horizontal="end"
      style={{ position: "fixed" }}
      slot="fixed"
    >
      <IonFabButton routerLink={routeTo}>
        <IonIcon
          icon={type === "plus" || type === undefined ? addOutline : ""}
          style={{ position: "absolute" }}
        />
      </IonFabButton>
    </IonFab>
  );
};

export default FloatingButton;
