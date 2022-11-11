import Button from "../../common/components/Button";
import Logo from "../../../assets/logo.png";
import Google from "../../../assets/auth/google.svg";
import Kakao from "../../../assets/auth/kakao.svg";
import Naver from "../../../assets/auth/naver.svg";
import Email from "../../../assets/auth/email.svg";
import { IonPage, IonRouterLink } from "@ionic/react";
import RoutingLink from "../../common/components/RoutingLink";
import BottomButton from "../../common/components/BottomButton";
import innerViewWidth from "../../../lib/constants/innerViewWidth";
import socialLoginLinks from "../lib/socialLoginURI";
import useOnMount from "../../common/hooks/useOnMount";
import userAtom from "../../common/state/user";
import { useRecoilState } from "recoil";
import { AUTH_SOCIAL_LOGIN } from "../../../lib/api/auth";
import storeToken from "../lib/storeToken";

const Login = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useOnMount(() => {
    (async () => {
      const params = new URL(window.location.href).searchParams;
      const authCode = params.get("code");
      if (authCode === null) return;

      const res = await AUTH_SOCIAL_LOGIN(authCode);
      if (res.status === 200) {
        const id = storeToken(
          res.data.tokens.accessToken,
          res.data.tokens.refreshToken
        );
        setUser({ ...user, isLogined: true, id: id });
        if (res.data.isMember === false) {
          window.location.href = "/memberDetailRegist";
          return;
        }
        window.location.href = "/home";
      }
    })();
  });

  const ButtonBoxHeight = 250;
  return (
    <IonPage>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: `${window.innerHeight - ButtonBoxHeight}px`,
          width: innerViewWidth,
          flexDirection: "column",

          backgroundSize: "cover",
          filter: "grayscale(20%)",
          marginLeft: "-20px",
        }}
      >
        <img src={Logo} />
        <div>과자 먹듯 부담없는 스타일링이 필요할 땐</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: `${ButtonBoxHeight}px`,
          backgroundColor: "white",
          padding: "10px 20px",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          color="light"
          style={{ border: "1px solid #eeeeee" }}
          onClick={() => (window.location.href = socialLoginLinks.google)}
        >
          <div style={{ position: "absolute", left: "0px" }}>
            <img src={Google} />
          </div>
          구글로 시작하기
        </Button>
        {/* <Button color="warning">
          <div style={{ position: "absolute", left: "0px" }}>
            <img src={Kakao} />
          </div>
          카카오로 시작하기
        </Button>
        <Button color="success">
          <div style={{ position: "absolute", left: "0px" }}>
            <img src={Naver} />
          </div>
          네이버로 시작하기
        </Button> */}

        <RoutingLink routerLink="/emailLogin">
          <Button color="primary">
            <div style={{ position: "absolute", left: "0px" }}>
              <img src={Email} />
            </div>
            이메일로 시작하기
          </Button>
        </RoutingLink>
      </div>
    </IonPage>
  );
};

export default Login;
