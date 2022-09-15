import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import Header from "../../common/components/Header";
import useStyleQDetail from "../hooks/useStyleQDetail";
import StyleQCardDetail from "../components/StyleQCardDetail";
import StyleAnsCard from "../components/StyleAnsCard";
import ListDiv from "../../common/components/ListDiv";
import { RouteComponentProps } from "react-router";
import useTabBarControl from "../../common/hooks/useTabBarControl";
import BottomButton from "../../common/components/BottomButton";
import Plus from "../../../assets/common/plus.svg";
import RowFiller from "../../common/components/RowFiller";

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
            routerLink={`/codiShowcase/answer/${styleQDetailData?.que.mid}/${styleQDetailData?.que.qid}`}
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
