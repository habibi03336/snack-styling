import styled from "styled-components";

const QPersonDetail = ({
  weight,
  height,
}: {
  weight: number;
  height: number;
}) => {
  return (
    <PersonDeatilDiv>
      <p> weight: {weight} kg</p>
      <p> height: {height} cm</p>
    </PersonDeatilDiv>
  );
};

const PersonDeatilDiv = styled.div`
  padding: 10px;
  border: solid black 2px;
  width: 200px;
  border-radius: 10px;
  margin: 0 0 0 15px;
`;

export default QPersonDetail;
