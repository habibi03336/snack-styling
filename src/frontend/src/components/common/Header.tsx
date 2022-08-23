import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
  IonImg,
} from "@ionic/react";
import { returnUpBackOutline } from "ionicons/icons";

interface IHeader {
  type?: "default" | "back";
  routeTo?: string;
  onHeaderClick?: () => void;
}
const Header = ({ type, routeTo, onHeaderClick }: IHeader) => {
  return (
    <IonHeader>
      {["default", undefined].includes(type) ? (
        <IonToolbar>
          <IonButtons style={{ justifyContent: "center" }}>
            {" "}
            &nbsp;{" "}
            <IonImg
              style={{ height: "25px" }}
              src={require("../../assets/logo.png")}
            />
          </IonButtons>
        </IonToolbar>
      ) : (
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={onHeaderClick}
              routerLink={routeTo}
              routerDirection="back"
              style={{ fontSize: "x-large", padding: "0 10px" }}
            >
              {" "}
              <IonIcon icon={returnUpBackOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      )}
    </IonHeader>
  );
};

export default Header;
