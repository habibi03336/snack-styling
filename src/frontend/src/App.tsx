import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  notificationsOutline,
  personOutline,
  reorderThreeOutline,
  searchOutline,
  shirtOutline,
} from "ionicons/icons";

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

import Closet from "./pages/closet/Closet";
import ClothRegist from "./pages/closet/ClothRegist";
import CodiShowCase from "./pages/CodiShowCase";
import StyleQList from "./pages/styleQ/StyleQList";
import StyleQDetail from "./pages/styleQ/StyleQDetail";
import ApplyForm from "./pages/ApplyForm";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import MemberDetailRegist from "./pages/MemberDetail";
import Mypage from "./pages/Mypage";
import { useRecoilState } from "recoil";
import user from "./recoil/user";

const App: React.FC = () => {
  const [userState] = useRecoilState(user);

  if (!userState.isLogined) {
    console.log("user is not logined");
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
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
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={reorderThreeOutline} />
              <IonLabel>홈</IonLabel>
            </IonTabButton>
            <IonTabButton tab="styleQ" href="/styleQ">
              <IonIcon icon={searchOutline} />
              <IonLabel>스타일Q</IonLabel>
            </IonTabButton>
            <IonTabButton tab="closet" href="/closet/cloth">
              <IonIcon icon={shirtOutline} />
              <IonLabel>옷장</IonLabel>
            </IonTabButton>
            <IonTabButton tab="alarm" href="/alarm">
              <IonIcon icon={notificationsOutline} />
              <IonLabel>알람</IonLabel>
            </IonTabButton>
            <IonTabButton tab="mypage" href="/mypage">
              <IonIcon icon={personOutline} />
              <IonLabel>마이페이지</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
