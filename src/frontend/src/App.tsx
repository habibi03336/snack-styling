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

setupIonicReact();

import "./App.css";
import Icon from "./components/icon/Icon";

import Closet from "./pages/closet/Closet";
import ClothRegist from "./pages/closet/ClothRegist";
import CodiShowCase from "./pages/CodiShowCase";
import StyleQList from "./pages/styleQ/StyleQList";
import StyleQDetail from "./pages/styleQ/StyleQDetail";
import ApplyForm from "./pages/ApplyForm";
import EmailLogin from "./pages/EmailLogin";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import MemberDetailRegist from "./pages/MemberDetail";
import Mypage from "./pages/Mypage";
import { useRecoilState } from "recoil";
import user from "./recoil/user";
import Login from "./pages/Login";

const App: React.FC = () => {
  const [userState] = useRecoilState(user);

  if (!userState.isLogined) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/emailLogin" component={EmailLogin} />
            <Route exact path="/signin" component={Signin} />
            <Route
              exact
              path="/memberDetailRegist"
              component={MemberDetailRegist}
            />
            <Redirect exact from="/" to="/login" />
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
            <Route exact path="/styleQ" component={StyleQList} />
            <Route exact path="/closet/:defaultTab" component={Closet} />
            <Route path="/alarm" component={Mypage} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/styleQ/:id" component={StyleQDetail} />
            <Route path="/clothRegist" component={ClothRegist} />
            <Route path="/codiShowcase/:mid/:qid" component={CodiShowCase} />
            <Route path="/apply" component={ApplyForm} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar style={{ height: "60px" }} slot="bottom">
            <IonTabButton tab="home" href="/home">
              <Icon iconName="home" />
            </IonTabButton>
            <IonTabButton tab="styleQ" href="/styleQ">
              <Icon iconName="community" />
            </IonTabButton>
            <IonTabButton tab="closet" href="/closet/cloth">
              <Icon iconName="closet" />
            </IonTabButton>
            <IonTabButton tab="alarm" href="/alarm">
              <Icon iconName="alarm" />
            </IonTabButton>
            <IonTabButton tab="mypage" href="/mypage">
              <Icon iconName="mypage" />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
