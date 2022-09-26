import Block from "../../common/components/Block";
import * as I from "../../../lib/types/interfaces";

const AlarmCard = ({
  info,
  onClickCard,
  onClickX,
}: {
  info: I.Alarm;
  onClickCard: () => void;
  onClickX: () => void;
}) => {
  return (
    <Block>
      {info.type === 0 && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={onClickCard}>
            {info.other}님이&nbsp;
            <strong>{info.tpo}</strong>&nbsp; 질문에 답변을 남겼습니다.&nbsp;
          </div>
          <div onClick={onClickX}>X</div>
        </div>
      )}
      {info.type === 1 && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={onClickCard}>
            {info.other}님의&nbsp;
            <strong>{info.tpo}</strong>&nbsp; 글의 답변이 채택되었습니다.&nbsp;
          </div>
          <div onClick={onClickX}>X</div>
        </div>
      )}
    </Block>
  );
};

export default AlarmCard;
