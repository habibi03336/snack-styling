import DownArrow from "../../../assets/common/downArrow.svg";

const DownButton = ({ onClickButton }: { onClickButton?: () => void }) => {
  return (
    <div
      onClick={onClickButton}
      style={{
        backgroundColor: "#fafafa",
        height: "32px",
        width: "32px",
        padding: "8px",
        borderRadius: "15px",
      }}
    >
      {" "}
      <img style={{ height: "16px", width: "16px" }} src={DownArrow} />{" "}
    </div>
  );
};

export default DownButton;
