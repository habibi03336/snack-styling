import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import Header from "../../components/common/Header";
import useStyleQDetail from "../../hooks/useStyleQDetail";
import StyleQCardDetail from "../../components/styleQ/StyleQCardDetail";
import StyleAnsCard from "../../components/styleQ/StyleAnsCard";
import ListDiv from "../../components/styleComponent/ListDiv";
import { RouteComponentProps } from "react-router";
import useTabBarControl from "../../hooks/useTabBarControl";
import BottomButton from "../../components/common/BottomButton";
import Plus from "../../assets/common/plus.svg";
import RowFiller from "../../components/common/RowFiller";

type IStyleQDetail = RouteComponentProps<{ id: string }>;

const StyleQDetail = ({ match }: IStyleQDetail) => {
  const { styleQDetailData } = useStyleQDetail(Number(match.params.id));
  useTabBarControl("useUnmount");
  return (
    <IonPage>
      <IonContent>
        <Header type="back" routeTo={"/styleQ"} />
        <StyleQCardDetail styleQ={styleQDetailData?.que} />

        <ListDiv>
          {styleQDetailData?.ans.map((ans, idx) => {
            return <StyleAnsCard key={idx} styleAns={ans} />;
          })}
        </ListDiv>
        {/* <IonButton
          expand="block"
          routerLink={`/codiShowcase/${styleQDetailData?.que.mid}/${styleQDetailData?.que.qid}`}
        >
          답변하기
        </IonButton> */}
        <RowFiller px={70} />
        <BottomButton>
          <IonRouterLink
            routerLink={`/codiShowcase/${styleQDetailData?.que.mid}/${styleQDetailData?.que.qid}`}
          >
            <div style={{ color: "white" }}>
              <img
                style={{ margin: "0px 10px", position: "relative", top: "1px" }}
                src={Plus}
              />
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                스타일링 답변하기
              </span>
            </div>
          </IonRouterLink>
        </BottomButton>
      </IonContent>
    </IonPage>
  );
};

export default StyleQDetail;
