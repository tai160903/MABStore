import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
  background: white;
  margin-right: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  height: fit-content;
`;
