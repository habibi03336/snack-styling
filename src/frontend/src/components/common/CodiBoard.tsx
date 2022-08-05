import "./CodiBoard.css";
import * as I from "../../interfaces";

const CodiBoard = ({
  codiClothes,
  boardConfig,
  onBoardImgClick,
}: {
  codiClothes: I.CodiCloth[];
  boardConfig: I.BoardConfig;
  onBoardImgClick: (clickedCategory: string) => void;
}) => {
  const ImageElems = codiClothes.map((data, idx) => {
    return (
      <div
        key={data.image + idx}
        className="position-div"
        style={{
          left: `${
            boardConfig.width * data.positionX - boardConfig.clothWidth / 2
          }px`,
          top: `${boardConfig.height * data.positionY}px`,
        }}
      >
        <div>
          <img
            className="board-img"
            src={data.image}
            alt="cloth-img"
            style={{
              width: boardConfig.clothWidth,
              height: boardConfig.clothHeight,
            }}
            onClick={() => onBoardImgClick(data.category)}
          />
        </div>
      </div>
    );
  });
  return (
    <div
      style={{
        width: `${boardConfig.width}px`,
        height: `${boardConfig.height}px`,
      }}
    >
      {ImageElems}
    </div>
  );
};

export default CodiBoard;
