import { IonRouterLink } from "@ionic/react";
import Block from "../../common/components/Block";
import * as I from "../../../lib/types/interfaces";
import RowFiller from "../../common/components/RowFiller";

interface IStyleQBlock {
  routeTo?: string;
  styleQ: I.StyleQ;
  type: "small" | "big";
  onClick?: () => void;
}

const StyleQBlock = ({
  styleQ,
  routeTo,
  onClick,
  type = "small",
}: IStyleQBlock) => {
  const [year, month, day] = styleQ.endDate
    ? styleQ.endDate.split("-")
    : [0, 0, 0];
  return (
    <IonRouterLink onClick={onClick} routerLink={routeTo}>
      <Block>
        <div>
          <div
            style={{
              fontFamily: "Pretendard",
              fontSize: "12px",
              fontStyle: "normal",
              color: "#999999",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontWeight: "bolder",
                fontSize: type === "small" ? "16px" : "24px",
                color: "black",
              }}
            >
              {styleQ.tpo}
            </div>
            <div>{`${year}년 ${month}월 ${day}일`}</div>
          </div>
          {type === "small" && (
            <div style={{ fontSize: "14px", margin: "4px 0 8px 0" }}>
              {styleQ.comments}
            </div>
          )}
        </div>
        <RowFiller px={10} />
        <div
          style={{
            verticalAlign: "middle",
            fontFamily: "Pretendard",
            fontSize: type === "small" ? "12px" : "14px",
            fontStyle: "normal",
            color: "#999999",
          }}
        >
          <div>{styleQ.nickname}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {styleQ.height}cm · {styleQ.weight}kg{" "}
            </span>
            <span>{type === "small" && `${styleQ.ansCount}개의 답변`}</span>
          </div>
        </div>

        {type === "big" && (
          <>
            <RowFiller px={16}></RowFiller>
            <div style={{ margin: "4px 0 8px 0" }}>{styleQ.comments}</div>
          </>
        )}
      </Block>
    </IonRouterLink>
  );
};

export default StyleQBlock;
