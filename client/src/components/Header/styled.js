import styled from "styled-components";
import { Row } from "antd";
export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #ff469e;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;
export const WrapperText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  cursor: default;
`;

export const WrapperAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 15px
  gap: 10px;
`;

export const WrapperTextSmall = styled.span`
  font-size: 15px;
  color: #fff;
  white-space: nowrap;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
