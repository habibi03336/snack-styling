import styled from "styled-components";

const Label = ({ text, type }: { text: string; type?: "big" }) => {
  if (type === "big") return <BigLabelDiv>{text}</BigLabelDiv>;
  return <LabelDiv> {text} </LabelDiv>;
};

const BigLabelDiv = styled.div`
  font-size: 16px;
  color: #111111;
  font-style: normal;
  font-weight: bolder;
`;

const LabelDiv = styled.div`
  font-size: 12px;
  color: #111111;
  font-style: normal;
  font-weight: 600;
`;

export default Label;
