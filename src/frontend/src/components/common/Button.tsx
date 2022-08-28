import { IonButton } from "@ionic/react";

const Button = ({
  children,
  color,
  activated,
  onClick,
  style,
}: {
  children: React.ReactNode;
  color: string;
  activated?: boolean;
  onClick?: () => void;
  style?: { [key: string]: string };
}) => {
  if (activated === undefined) activated = true;
  return (
    <IonButton
      onClick={onClick}
      color={activated ? color : "medium"}
      style={{
        fontSize: "16px",
        height: "50px",
        border: color === "light" ? "solid 2px black" : "",
        ...style,
      }}
      type="submit"
      expand="block"
    >
      {children}
    </IonButton>
  );
};

export default Button;
