import CodiBoard from "../../common/components/CodiBoard";
import * as I from "../../../lib/types/interfaces";
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
  const innerWidth = window.innerWidth >= 400 ? 400 : window.innerWidth;
  const width =
    type === "default" ? (innerWidth - 40) / 2 - 7.5 : innerWidth * 0.9;
  return (
    <ClosetCard id={codi.id!}>
      <div onClick={onCodiClick}>
        <CodiBoard
          boardConfig={{
            width: width,
            height: width,
            clothWidth: width * 0.35,
            clothHeight: width * 0.35,
          }}
          codiClothes={codi.clothes}
        />
      </div>
      {comment}
    </ClosetCard>
  );
};

export default CodiCard;
