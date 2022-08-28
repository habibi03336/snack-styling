import SportsStar from "../../assets/level/sports_medal_3_d.png";
import First from "../../assets/level/1_st_place_medal_3_d.png";
import Second from "../../assets/level/2_nd_place_medal_3_d.png";
import Third from "../../assets/level/3_rd_place_medal_3_d.png";

const ImgMapper = {
  1: First,
  2: Second,
  3: Third,
  0: SportsStar,
};

const LevelIcon = ({ level }: { level: 0 | 1 | 2 | 3 }) => {
  return (
    <div style={{ height: "36px", width: "36px" }}>
      <img src={ImgMapper[level]} alt={`${level} 레벨`} />
    </div>
  );
};

export default LevelIcon;
