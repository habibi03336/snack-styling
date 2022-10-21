import Button from "../../common/components/Button";
import Logo from "../../../assets/logo.svg";
import Google from "../../../assets/auth/google.svg";
import Kakao from "../../../assets/auth/kakao.svg";
import Naver from "../../../assets/auth/naver.svg";
import Email from "../../../assets/auth/email.svg";
import { IonPage, IonRouterLink } from "@ionic/react";
import RoutingLink from "../../common/components/RoutingLink";

const Login = () => {
  return (
    <IonPage>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: `${window.innerHeight - 100}px`,
          width: window.innerWidth > 400 ? 400 : window.innerWidth,
          flexDirection: "column",
          background:
            "url('https://www.ikea.com/kr/en/images/products/platsa-open-clothes-hanging-unit-white__0780262_pe759915_s5.jpg')",
          backgroundSize: "cover",
          filter: "grayscale(20%)",
          marginLeft: "-20px",
        }}
      >
        <img style={{ width: "236px", height: "80px" }} src={Logo} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100px",
          backgroundColor: "white",
          padding: "10px 20px",
          justifyContent: "space-evenly",
        }}
      >
        {/* <Button color="light" style={{ border: "1px solid #eeeeee" }}>
          <div style={{ position: "absolute", left: "0px" }}>
            <img src={Google} />
          </div>
          구글로 시작하기
        </Button>
        <Button color="warning">
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
