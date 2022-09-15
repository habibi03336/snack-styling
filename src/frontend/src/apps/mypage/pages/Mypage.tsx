import { IonContent, IonIcon, IonPage, IonRouterLink } from "@ionic/react";
import { useRecoilState, useRecoilValue } from "recoil";
import user from "../../common/state/user";
import IDCard from "../components/IDCard";
import userDetailAtom from "../state/userDetail";
import { helpCircle, chatbubbles, heart } from "ionicons/icons";
import Header from "../../common/components/Header";
import RowFiller from "../../common/components/RowFiller";

const Mypage = () => {
  const [userState, setUserState] = useRecoilState(user);
  const userDetail = useRecoilValue(userDetailAtom);
  const onClickLogOut = () => {
    window.localStorage.removeItem("mid");
    setUserState({ ...userState, isLogined: false });
    window.location.href = "/";
  };
  return (
    <IonPage>
      <Header text="마이페이지" type="title" />
      <IonContent>
        <RowFiller px={24} />
        <IDCard nickname={userDetail.nickname} level={userDetail.level} />
        <RowFiller px={72} />
        <div
          style={{
            fontSize: 36,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <IonRouterLink routerLink={"/mypage/myquestions"}>
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
          </IonRouterLink>
          <IonRouterLink routerLink={"/mypage/myanswers"}>
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
          </IonRouterLink>
          <IonRouterLink routerLink={""}>
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
          </IonRouterLink>
        </div>

        <div style={{ position: "absolute", right: 10, bottom: 50 }}>
          <button onClick={onClickLogOut}>로그아웃</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mypage;