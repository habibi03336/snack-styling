import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import * as I from "../../interfaces";
import Block from "../styleComponent/Block";
import QPersonDetail from "./QPersonDetail";

const StyleQCardDetail = ({ styleQ }: { styleQ: I.StyleQs | undefined }) => {
  if (styleQ === undefined) return <div>loading</div>;
  return (
    <Block>
      <IonCardHeader>
        <IonCardSubtitle>{styleQ.end_date}</IonCardSubtitle>
        <IonCardSubtitle>{styleQ.nickname}님의 코디요청</IonCardSubtitle>
        <IonCardTitle>{styleQ.tpo}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{styleQ.comments}</IonCardContent>
      <div style={{ position: "relative" }}>
        <QPersonDetail weight={styleQ.weight} height={styleQ.height} />
      </div>
    </Block>
  );
};

export default StyleQCardDetail;
