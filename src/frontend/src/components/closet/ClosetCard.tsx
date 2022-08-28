import { IonCard } from "@ionic/react";

const ClosetCard = ({
  children,
  onCardClick,
  id,
}: {
  onCardClick?: () => void;
  id: number;
  children: React.ReactNode;
}) => {
  return (
    <IonCard
      onClick={onCardClick}
      key={id}
      style={{
        margin: "8px 0px",
        backgroundColor: "#fafafa",
        border: "1px solid #eeeeee",
      }}
    >
      {children}
    </IonCard>
  );
};

export default ClosetCard;
