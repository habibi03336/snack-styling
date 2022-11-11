import LevelIcon from "../../common/components/LevelIcon";
import RowFiller from "../../common/components/RowFiller";

const IDCard = ({ nickname, level }: { nickname: string; level: number }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: "600",
          alignItems: "center",
        }}
      >
        {/* <LevelIcon level={3} /> */}
        <div style={{ marginLeft: 16, flexDirection: "column" }}>
          <div style={{ fontSize: 24, fontWeight: "600" }}>{nickname}님</div>
          <div style={{ fontSize: 18, fontWeight: "400" }}>
            총 {level}회 채택 받으셨습니다!
          </div>
        </div>
      </div>
      <RowFiller px={16} />
    </div>
  );
};

export default IDCard;
