import * as I from "../../../lib/types/interfaces";
import StyleQBlock from "./StyleQBlock";

const StyleQCardDetail = ({ styleQ }: { styleQ: I.StyleQs | undefined }) => {
  if (styleQ === undefined) return <div>loading</div>;
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
