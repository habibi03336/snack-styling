import { IonButton, IonContent, IonPage } from "@ionic/react";
import Header from "../../components/common/Header";
import useStyleQDetail from "../../hooks/useStyleQDetail";
import StyleQCardDetail from "../../components/styleQ/StyleQCardDetail";
import StyleAnsCard from "../../components/styleQ/StyleAnsCard";
import Title from "../../components/common/Title";
import ListDiv from "../../components/styleComponent/ListDiv";
import { RouteComponentProps } from "react-router";

type IStyleQDetail = RouteComponentProps<{ id: string }>;

const StyleQDetail = ({ match }: IStyleQDetail) => {
  const { styleQDetailData } = useStyleQDetail(Number(match.params.id));
  return (
    <IonPage>
      <IonContent>
        <Header type="back" routeTo={"/styleQ"} />
        <StyleQCardDetail styleQ={styleQDetailData?.que} />
        <IonButton
          expand="block"
          routerLink={`/codiShowcase/${styleQDetailData?.que.mid}/${styleQDetailData?.que.qid}`}
        >
          답변하기
        </IonButton>
        {Number(styleQDetailData?.ans.length) > 0 && <Title title={"답변"} />}
        <ListDiv>
          {styleQDetailData?.ans.map((ans, idx) => {
            return <StyleAnsCard key={idx} styleAns={ans} />;
          })}
        </ListDiv>
      </IonContent>
    </IonPage>
  );
};

export default StyleQDetail;
