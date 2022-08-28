import {
  IonButton,
  IonButtons,
  IonCard,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { SwiperSlide } from "swiper/react";

const CategoryButton = ({
  text,
  activated,
  onClick,
}: {
  text: string;
  activated: boolean;
  onClick: () => void;
}) => {
  return (
    <SwiperSlide>
      <IonCard
        onClick={onClick}
        style={{
          height: "32px",
          width: "53px",
          fontSize: "16px",
          margin: "0px 10px",
        }}
        color={activated ? "primary" : "medium"}
      >
        {text}
      </IonCard>
    </SwiperSlide>
  );
};

export default CategoryButton;
