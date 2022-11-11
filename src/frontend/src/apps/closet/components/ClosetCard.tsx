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
        margin: "8px 8px",
        backgroundColor: "#fafafa",
      }}
    >
      {children}
    </IonCard>
  );
};

export default ClosetCard;
