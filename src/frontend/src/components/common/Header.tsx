import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonImg,
} from "@ionic/react";

import styled from "styled-components";
import Backarrow from "../../assets/common/backarrow.png";
interface IHeader {
  type?: "default" | "back" | "title";
  routeTo?: string;
  text?: string;
  onHeaderClick?: () => void;
}
const Header = ({ text, type, routeTo, onHeaderClick }: IHeader) => {
  return (
    <IonHeader
      style={{
        height: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="ion-no-border"
    >
      <IonToolbar color="light">
        {["default", undefined].includes(type) ? (
          <IonButtons style={{ justifyContent: "center" }}>
            {" "}
            &nbsp;{" "}
            <IonImg
              style={{ height: "25px" }}
              src={require("../../assets/logo.png")}
            />
          </IonButtons>
        ) : type === "back" ? (
          <>
            <IonButtons slot="start">
              <IonButton
                onClick={onHeaderClick}
                routerLink={routeTo}
                routerDirection="back"
              >
                {" "}
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={Backarrow}
                  alt="back-arrow"
                />
              </IonButton>
            </IonButtons>
            <TextDiv>{text}</TextDiv>
          </>
        ) : type === "title" ? (
          <div
            style={{
              height: "60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextDiv style={{ margin: "0px" }}>{text}</TextDiv>
          </div>
        ) : (
          ""
        )}
      </IonToolbar>
    </IonHeader>
  );
};

const TextDiv = styled.div`
  font-family: "Pretendard";
  font-weight: bolder;
  font-style: normal;
  font-size: 20px;
  color: #111111;
  margin: 0px 0px 0px 16px;
`;

export default Header;
