import styled from "styled-components";
import COLOR from "../styleComponent/color";
const Title = ({ title }: { title: string }) => {
  return <TitleDiv>{title}</TitleDiv>;
};

export default Title;

const TitleDiv = styled.div`
  display: block;
  font-weight: 800;
  padding: 15px 0px 6px 7px;
  background-color: ${COLOR.BACKBOARD};
`;
