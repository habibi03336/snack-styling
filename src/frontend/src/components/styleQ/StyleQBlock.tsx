import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRouterLink,
} from "@ionic/react";
import Block from "../styleComponent/Block";
import * as I from "../../interfaces";
import styled from "styled-components";

interface IStyleQBlock {
  routeTo: string;
  styleQ: I.StyleQs;
}

const AnswerCountDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #040720;
  color: beige;
`;

const StyleQBlock = ({ styleQ, routeTo }: IStyleQBlock) => {
  return (
    <IonRouterLink routerLink={routeTo}>
      <Block>
        <IonCardHeader>
          <IonCardSubtitle>{styleQ.end_date}</IonCardSubtitle>
          <IonCardSubtitle>{styleQ.nickname}</IonCardSubtitle>
          <IonCardTitle>{styleQ.tpo}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>{styleQ.comments}</IonCardContent>
        <AnswerCountDiv>답변: {styleQ.ans_count}개</AnswerCountDiv>
      </Block>
    </IonRouterLink>
  );
};

export default StyleQBlock;
