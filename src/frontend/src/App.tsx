import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact({ swipeBackEnabled: false });

import "./App.css";
import Icon from "./apps/common/components/Icon";

import Closet from "./apps/closet/pages/closet/Closet";
import ClothRegist from "./apps/closet/pages/ClothRegist";
import CodiShowCase from "./apps/codiRegist/pages/CodiShowCase";
import StyleQList from "./apps/styleQ/pages/StyleQList";
import StyleQDetail from "./apps/styleQ/pages/StyleQDetail";
import ApplyForm from "./apps/styleQ/pages/ApplyForm";
import EmailLogin from "./apps/login/pages/EmailLogin";
import Signin from "./apps/signin/pages/Signin";
import Home from "./apps/home/pages/Home";
import MemberDetailRegist from "./apps/mypage/pages/MemberDetail";
import Mypage from "./apps/mypage/pages/Mypage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import user from "./apps/common/state/user";
import Login from "./apps/login/pages/Login";
import MyAnswers from "./apps/mypage/pages/MyAnswers";
import MyQuestions from "./apps/mypage/pages/MyQuestions";
import Alarms from "./apps/alarms/pages/Alarms";
import CustomerLetter from "./apps/mypage/pages/CustomerLetter";
import tabbarAtom from "./apps/common/state/tabbar";
import routeContextAtom from "./apps/common/state/routeContext";
import useOnMount from "./apps/common/hooks/useOnMount";

const App: React.FC = () => {
  const userState = useRecoilValue(user);
  const tabbarState = useRecoilValue(tabbarAtom);
  const setRouteContextState = useSetRecoilState(routeContextAtom);

  useOnMount(() => {
    window.addEventListener("touchstart", (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      if (e.pageX > 50 && e.pageX < window.innerWidth - 50) return;
      // prevent swipe to navigate back gesture
      e.preventDefault();
    });

    if (
      [
        "/home",
        "/styleQList",
        "/closet/cloth",
        "/closet/codi",
        "/alarm",
        "/mypage",
      ].includes(window.location.pathname)
    ) {
      setRouteContextState(() => [window.location.pathname]);
    }

    window.addEventListener("popstate", () => {
      if (
        [
          "/home",
          "/styleQList",
          "/closet/cloth",
          "/closet/codi",
          "/alarm",
          "/mypage",
        ].includes(window.location.pathname)
      ) {
        setRouteContextState(() => [window.location.pathname]);
      }
    });
  });

  if (!userState.isLogined) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home" component={Login} />
            <Route exact path="/emailLogin" component={EmailLogin} />
            <Route exact path="/signin" component={Signin} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/styleQList" component={StyleQList} />
            <Route exact path="/styleQ/:id" component={StyleQDetail} />
            <Route exact path="/closet/:defaultTab" component={Closet} />
            <Route path="/alarm" component={Alarms} />
            <Route exact path="/mypage" component={Mypage} />
            <Route path="/clothRegist" component={ClothRegist} />
            <Route
              path="/codiShowcase/:type/:mid/:qid/:cid"
              component={CodiShowCase}
            />
            <Route path="/apply/:type/:qid" component={ApplyForm} />
            <Route path="/mypage/myanswers" component={MyAnswers} />
            <Route path="/mypage/myquestions" component={MyQuestions} />
            <Route path="/mypage/customerLetter" component={CustomerLetter} />
            <Route
              exact
              path="/memberDetailRegist"
              component={MemberDetailRegist}
            />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar
            style={{ height: "60px", display: tabbarState ? "flex" : "none" }}
            slot="bottom"
          >
            <IonTabButton
              tab="home"
              href="/home"
              onClick={() => {
                setRouteContextState(() => ["/home"]);
              }}
            >
              <Icon iconName="home" />
            </IonTabButton>
            <IonTabButton
              tab="styleQ"
              href="/styleQList"
              onClick={() => {
                setRouteContextState(() => ["/styleQList"]);
              }}
            >
              <Icon iconName="community" />
            </IonTabButton>
            <IonTabButton
              tab="closet"
              href="/closet/cloth"
              onClick={() => {
                setRouteContextState(() => ["/closet/cloth"]);
              }}
            >
              <Icon iconName="closet" />
            </IonTabButton>
            <IonTabButton
              tab="alarm"
              href="/alarm"
              onClick={() => {
                setRouteContextState(() => ["/alarm"]);
              }}
            >
              <Icon iconName="alarm" />
            </IonTabButton>
            <IonTabButton
              tab="mypage"
              href="/mypage"
              onClick={() => {
                setRouteContextState(() => ["/mypage"]);
              }}
            >
              <Icon iconName="mypage" />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
