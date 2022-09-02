import RowFiller from "../../common/components/RowFiller";
import WeatherIcon from "./WeatherIcon";

const WeatherBox = () => {
  const date = new Date();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "98px",
        backgroundColor: "#111111",
        color: "white",
        padding: "16px 16px 20px 16px",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: "700" }}>
          {" "}
          {date.getMonth() + 1}월 {date.getDate()}일 날씨
        </div>
        <RowFiller px={10} />
        <div
          style={{
            fontSize: "14px",
            fontWeight: "400",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          <div style={{ width: "40px" }}>
            <div style={{ color: "gray" }}>최고</div>
            <div>32도</div>
          </div>
          <div style={{ width: "40px" }}>
            <div style={{ color: "gray" }}>최저</div>
            <div>22도</div>
          </div>
        </div>
      </div>
      <div>
        <WeatherIcon weather="sun" />
      </div>
    </div>
  );
};
export default WeatherBox;
