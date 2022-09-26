import styled from "styled-components";
import * as I from "../../../lib/types/interfaces";
import CodiBoard from "../../common/components/CodiBoard";
import Block from "../../common/components/Block";
import LevelIcon from "../../common/components/LevelIcon";

interface IStyleAnsCard {
  styleAns: I.StyleAns;
  owner: boolean;
  showAdopt: boolean;
  adopted: boolean;
  onClickAdopt?: () => void;
  onClickDelete?: () => void;
  onClickUpdate?: () => void;
}

const StyleAnsCard = ({
  styleAns,
  adopted,
  owner,
  onClickAdopt,
  onClickUpdate,
  onClickDelete,
  showAdopt,
}: IStyleAnsCard) => {
  const level: [0, 1, 2, 3] = [0, 1, 2, 3];
  return (
    <Block>
      <div
        style={{
          display: "flex",
          height: "40px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <LevelIcon level={level[Math.floor(Math.random() * 4)]} />
          <div
            style={{
              backgroundColor: adopted ? "powderblue" : "white",
              margin: "0px 12px",
              height: "40px",
              fontSize: "16px",
              fontWeight: "600",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>{styleAns.nickname}님의 답변</div>
            <div style={{ fontSize: "12px", color: "lightgray" }}>
              {`2021년 8월 ${Math.floor(Math.random() * 31 + 1)}일`}
            </div>
          </div>
        </div>
        {owner ? (
          <div style={{ display: "flex", flexDirection: "row", color: "gray" }}>
            <span onClick={onClickUpdate}>수정</span>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span onClick={onClickDelete}>삭제</span>
          </div>
        ) : (
          false
        )}
        {showAdopt ? (
          <div style={{ display: "flex", flexDirection: "row", color: "gray" }}>
            <span onClick={onClickAdopt}>채택하기</span>
          </div>
        ) : (
          false
        )}
      </div>
      <StyleAnsContainer>
        <CodiBoardDiv>
          <CodiBoard
            codiClothes={styleAns.codiTemplate.clothes}
            boardConfig={{
              width: window.innerWidth * 0.7,
              height: window.innerWidth * 0.7,
              clothWidth: window.innerWidth * 0.3,
              clothHeight: window.innerWidth * 0.3,
            }}
            onBoardImgClick={() => console.log("style ans codi board clicked")}
          />
        </CodiBoardDiv>
        <div style={{ padding: "10px 20px", fontSize: "16px" }}>
          {styleAns.comments}
        </div>
      </StyleAnsContainer>
    </Block>
  );
};

const CodiBoardDiv = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
`;

const StyleAnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default StyleAnsCard;
