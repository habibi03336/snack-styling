import * as I from "../../../lib/types/interfaces";
import StyleQBlock from "./StyleQBlock";

const StyleQCardDetail = ({ styleQ }: { styleQ?: I.StyleQ }) => {
  if (styleQ === undefined) return <></>;
  return (
    <>
      <StyleQBlock styleQ={styleQ} type="big" />
      {/* <IonCardHeader>
  <IonCardTitle>{styleQ.tpo}</IonCardTitle>
  <IonCardSubtitle>{styleQ.end_date}</IonCardSubtitle>
  <IonCardSubtitle>{styleQ.nickname}님의 코디요청</IonCardSubtitle>
</IonCardHeader> */}

      {/* <IonCardContent>{styleQ.comments}</IonCardContent> */}
      {/* <div style={{ position: "relative" }}>
  <QPersonDetail weight={styleQ.weight} height={styleQ.height} />
</div> */}
    </>
  );
};

export default StyleQCardDetail;
