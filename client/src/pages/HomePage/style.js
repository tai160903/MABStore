import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  height: 50px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: white;
    background: #ff469e;
    span {
      color: white;
    }
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
