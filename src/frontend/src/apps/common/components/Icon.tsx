import { IonIcon } from "@ionic/react";

const Icon = ({
  iconName,
}: {
  iconName: "home" | "community" | "closet" | "alarm" | "mypage";
}) => {
  return (
    <IonIcon
      className={`icon-${iconName}`}
      style={{
        height: "24px",
        width: "24px",
      }}
    />
  );
};

export default Icon;
