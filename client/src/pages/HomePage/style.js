import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  height: 50px;
  font-size: 13px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: white;
    background: #ff469e;
    span {
      color: white;
    }
  }
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  margin-top: 25px;
  flex-wrap: wrap;
`;
