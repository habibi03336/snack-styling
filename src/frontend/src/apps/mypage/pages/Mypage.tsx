import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
} from "@ionic/react";
import { useRecoilValue } from "recoil";
import IDCard from "../components/IDCard";
import userDetailAtom from "../state/userDetail";
import { helpCircle, chatbubbles, cube } from "ionicons/icons";
import Header from "../../common/components/Header";
import RowFiller from "../../common/components/RowFiller";
import RoutingLink from "../../common/components/RoutingLink";

const Mypage = () => {
  const userDetail = useRecoilValue(userDetailAtom);
  const onClickLogOut = () => {
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };
  return (
    <IonPage>
      <Header text="마이페이지" type="title" />
      <IonContent>
        <RowFiller px={24} />
        <IDCard nickname={userDetail.nickname} level={userDetail.rank} />
        <RowFiller px={72} />
        <div
          style={{
            fontSize: 36,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <RoutingLink routerLink={"/mypage/myquestions"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IonIcon src={helpCircle} />
              <div style={{ fontSize: 16 }}>질문내역</div>
            </div>
          </RoutingLink>
          <RoutingLink routerLink={"/mypage/myanswers"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IonIcon src={chatbubbles} />
              <div style={{ fontSize: 16 }}>답변내역</div>
            </div>
          </RoutingLink>
          <RoutingLink routerLink={"/mypage/customerLetter"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IonIcon src={cube} />
              <div style={{ fontSize: 16 }}>건의하기</div>
            </div>
          </RoutingLink>
          {/* <IonRouterLink routerLink={""}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IonIcon src={heart} />
              <div style={{ fontSize: 16 }}>관심목록</div>
            </div>
          </IonRouterLink> */}
        </div>
        <RowFiller px={50} />
        <hr />
        <IonList style={{ paddingRight: "30%", paddingLeft: "7%" }}>
          <RoutingLink routerLink={"/memberDetailRegist"}>
            <div
              style={{
                borderBottom: "solid lightgray 1px",
                paddingBottom: "5px",
                color: "gray",
              }}
            >
              📑 &nbsp; 회원정보 수정하기
            </div>
          </RoutingLink>
          <RowFiller px={10} />
          <div
            onClick={onClickLogOut}
            style={{
              borderBottom: "solid lightgray 1px",
              paddingBottom: "5px",
              color: "gray",
            }}
          >
            👋 &nbsp; 로그아웃
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Mypage;
