import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: black;
  font-size: 30px;
  margin: 20px 0;
  text-align: center;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  gap: 20px;
`;
export const WrapperLable = styled.label`
  coler: #000;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  width: 60px;
  text-align: left;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item.ant-upload-list-item-error {
    display: none;
  }
`;
