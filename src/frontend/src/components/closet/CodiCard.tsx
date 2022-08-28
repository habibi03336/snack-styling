import CodiBoard from "../common/CodiBoard";
import * as I from "../../interfaces";
import ClosetCard from "./ClosetCard";

interface ICodiCard {
  codi: I.CodiTemplate;
  comment: string;
  onCodiClick: () => void;
  type?: "big" | "default";
}

const CodiCard = ({
  codi,
  onCodiClick,
  comment,
  type = "default",
}: ICodiCard) => {
  const width =
    type === "default"
      ? (window.innerWidth - 40) / 2 - 7.5
      : window.innerWidth * 0.9;
  return (
    <ClosetCard id={codi.id!}>
      <CodiBoard
        boardConfig={{
          width: width,
          height: width,
          clothWidth: width * 0.35,
          clothHeight: width * 0.35,
        }}
        codiClothes={codi.clothes}
        onBoardImgClick={onCodiClick}
      />
      {comment}
    </ClosetCard>
  );
};

export default CodiCard;
