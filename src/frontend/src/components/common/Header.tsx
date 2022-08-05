import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

interface IHeader {
  type?: "default" | "back";
  onHeaderClick?: () => void;
}
const Header = ({ type, onHeaderClick }: IHeader) => {
  return (
    <IonHeader>
      {["default", undefined].includes(type) ? (
        <IonToolbar>
          <IonTitle onClick={onHeaderClick}>커피 스타일링</IonTitle>
        </IonToolbar>
      ) : (
        <IonToolbar>
          <IonTitle onClick={onHeaderClick}>뒤로 가기</IonTitle>
        </IonToolbar>
      )}
    </IonHeader>
  );
};

export default Header;
