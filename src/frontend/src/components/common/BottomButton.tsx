import Button from "./Button";

const BottomButton = ({
  children,
  onClick,
  activated,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  activated?: boolean;
}) => {
  return (
    <span
      style={{
        position: "fixed",
        height: "70px",
        width: `${window.innerWidth}px`,
        bottom: "0px",
        left: "0px",
        padding: "10px 20px",
        borderTop: "solid 1px #eeeeee",
        backgroundColor: "white",
      }}
    >
      <Button
        activated={activated === undefined ? true : activated}
        onClick={onClick}
        color="primary"
      >
        {children}
      </Button>
    </span>
  );
};

export default BottomButton;
