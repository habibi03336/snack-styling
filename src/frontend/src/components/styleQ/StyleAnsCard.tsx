import { IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import styled from "styled-components";
import * as I from "../../interfaces";
import CodiBoard from "../common/CodiBoard";
import Block from "../styleComponent/Block";

interface IStyleAnsCard {
  styleAns: I.StyleAns;
}

const StyleAnsCard = ({ styleAns }: IStyleAnsCard) => {
  return (
    <Block>
      <IonCardHeader>
        <IonCardSubtitle>{styleAns.nickname}</IonCardSubtitle>
        <IonCardTitle>{styleAns.rank}</IonCardTitle>
      </IonCardHeader>
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
        <div style={{ padding: "10px 20px" }}>{styleAns.comments}</div>
      </StyleAnsContainer>
    </Block>
  );
};

const CodiBoardDiv = styled.div`
  display: flex;
  border: 2px solid black;
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
`;

const StyleAnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default StyleAnsCard;
