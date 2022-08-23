import styled from "styled-components";

const CardLayout = ({
  cardComponents,
}: {
  cardComponents: Array<JSX.Element | "">;
}) => {
  const count = 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: `${window.innerWidth}px`,
      }}
    >
      <Column>
        {cardComponents.map((Card, idx) => {
          if (idx % 2 === 1) return;
          return Card;
        })}
      </Column>
      <Column>
        {cardComponents.map((Card, idx) => {
          if (idx % 2 === 0) return;
          return Card;
        })}
      </Column>
    </div>
  );
};

export default CardLayout;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${window.innerWidth * 0.45}px;
`;
