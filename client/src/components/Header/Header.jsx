import React from "react";
import { Col } from "antd";
import {
  WrapperAccount,
  WrapperHeader,
  WrapperText,
  WrapperTextSmall,
} from "./styled";
import Search from "antd/es/transfer/search";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
function Header() {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperText>MABStore</WrapperText>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="input search text"
            text="Tìm kiếm"
            // onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "12px", justifyContent: "center" }}
        >
          <WrapperAccount>
            <UserOutlined style={{ fontSize: "35px" }} />
            <div>
              <WrapperTextSmall>Đăng nhập/Đăng ký</WrapperTextSmall>
              <div>
                <WrapperTextSmall>Tài khoản</WrapperTextSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperAccount>
          <div>
            <ShoppingCartOutlined style={{ fontSize: "35px", color: "#fff" }} />
            <WrapperTextSmall>Giỏ hàng</WrapperTextSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
