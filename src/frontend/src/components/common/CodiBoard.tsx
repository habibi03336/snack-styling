import * as I from "../../interfaces";
import styled from "styled-components";

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
      <PositionDiv
        key={data.image + idx}
        style={{
          left: `${
            boardConfig.width * data.positionX - boardConfig.clothWidth / 2
          }px`,
          top: `${boardConfig.height * data.positionY}px`,
        }}
      >
        <div>
          <BoardImage
            src={data.image}
            alt="cloth-img"
            style={{
              width: boardConfig.clothWidth,
              height: boardConfig.clothHeight,
            }}
            onClick={() => onBoardImgClick(data.category)}
          />
        </div>
      </PositionDiv>
    );
  });
  return (
    <CodiBoardDiv
      style={{
        width: `${boardConfig.width}px`,
        height: `${boardConfig.height}px`,
      }}
    >
      {ImageElems}
    </CodiBoardDiv>
  );
};

export default CodiBoard;

const CodiBoardDiv = styled.div``;

const PositionDiv = styled.div`
  position: relative;
  height: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const BoardImage = styled.img`
  width: fit-content;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
`;
