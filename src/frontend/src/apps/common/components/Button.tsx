import { IonButton } from "@ionic/react";

const Button = ({
  children,
  color,
  activated,
  onClick,
  style,
  type,
}: {
  children: React.ReactNode;
  color?: string;
  activated?: boolean;
  onClick?: () => void;
  style?: { [key: string]: string };
  type?: "button" | "submit" | "reset";
}) => {
  if (activated === undefined) activated = true;
  return (
    <IonButton
      type={type ? type : "submit"}
      onClick={onClick}
      color={activated ? color : "medium"}
      style={{
        fontSize: "16px",
        height: "50px",
        border: color === "light" ? "solid 2px black" : "",
        ...style,
      }}
      expand="block"
    >
      {children}
    </IonButton>
  );
};

export default Button;
