import Button from "./Button";

const BottomButton = ({
  children,
  onClick,
  activated,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  activated?: boolean;
  type?: string;
}) => {
  const innerWidth = window.innerWidth >= 400 ? 400 : window.innerWidth;

  return (
    <div
      style={{
        position: "fixed",
        height: "70px",
        width: `${innerWidth}px`,
        bottom: "0px",
        left: "0px",
        padding: "10px 20px",
        borderTop: "solid 1px #eeeeee",
        backgroundColor: "white",
      }}
    >
      {/* <Button
        activated={activated === undefined ? true : activated}
        onClick={onClick}
        color="primary"
      > */}
      {children}
      {/* </Button> */}
    </div>
  );
};

export default BottomButton;
